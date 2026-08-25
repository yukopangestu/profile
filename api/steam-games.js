const curation = require('./_steam-curation.json');

const STEAM_API_BASE = 'https://api.steampowered.com';

function toHours(minutes) {
  return Math.round(((minutes || 0) / 60) * 10) / 10;
}

function withCuration(game) {
  const c = curation[String(game.appid)] || {};
  return {
    appid: game.appid,
    name: game.name,
    hoursTotal: game.hoursTotal,
    lastPlayedAt: game.lastPlayedAt,
    headerUrl: game.headerUrl,
    status: c.status || 'played',
    tags: c.tags || [],
  };
}

async function getAchievementPercent(apiKey, steamId, appid) {
  try {
    const schemaRes = await fetch(
      `${STEAM_API_BASE}/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appid}`
    );
    if (!schemaRes.ok) return null;
    const schema = await schemaRes.json();
    const total = schema.game?.availableGameStats?.achievements?.length ?? 0;
    if (total === 0) return null;

    const achRes = await fetch(
      `${STEAM_API_BASE}/ISteamUserStats/GetPlayerAchievements/v1/?key=${apiKey}&steamid=${steamId}&appid=${appid}`
    );
    if (!achRes.ok) return null;
    const achData = await achRes.json();
    const achievements = achData.playerstats?.achievements ?? [];
    if (achievements.length === 0) return null;

    const unlocked = achievements.filter(a => a.achieved === 1).length;
    return Math.round((unlocked / total) * 100);
  } catch {
    return null;
  }
}

module.exports = async function handler(req, res) {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    res.status(500).json({ error: 'Steam credentials not configured' });
    return;
  }

  try {
    const ownedRes = await fetch(
      `${STEAM_API_BASE}/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1`
    );
    if (!ownedRes.ok) {
      throw new Error(`GetOwnedGames failed: ${ownedRes.status}`);
    }
    const ownedData = await ownedRes.json();
    const rawGames = ownedData.response?.games ?? [];

    if (rawGames.length === 0) {
      res.status(502).json({
        error: 'Steam returned no games — check that Game Details is set to Public',
      });
      return;
    }

    const games = rawGames.map(g => ({
      appid: g.appid,
      name: g.name,
      hoursTotal: toHours(g.playtime_forever),
      hours2Weeks: toHours(g.playtime_2weeks),
      lastPlayedAt: g.rtime_last_played || 0,
      headerUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
    }));

    const totalGames = games.length;
    const totalHours = Math.round(games.reduce((sum, g) => sum + g.hoursTotal, 0));
    const yearsEquivalent = Math.round((totalHours / 24 / 365) * 100) / 100;
    const neverPlayedCount = games.filter(g => g.hoursTotal === 0).length;

    const byRecent = [...games].sort((a, b) => b.lastPlayedAt - a.lastPlayedAt);
    const recent = byRecent.slice(0, 8).map(withCuration);

    const byTwoWeeks = [...games].sort((a, b) => b.hours2Weeks - a.hours2Weeks);
    const nowPlayingSource = byTwoWeeks[0]?.hours2Weeks > 0 ? byTwoWeeks[0] : byRecent[0];

    let nowPlaying = null;
    if (nowPlayingSource) {
      const achievementPercent = await getAchievementPercent(
        apiKey,
        steamId,
        nowPlayingSource.appid
      );
      const c = curation[String(nowPlayingSource.appid)] || {};
      nowPlaying = {
        ...withCuration(nowPlayingSource),
        hours2Weeks: nowPlayingSource.hours2Weeks,
        hasTwoWeekActivity: nowPlayingSource.hours2Weeks > 0,
        achievementPercent,
        note: c.note || null,
      };
    }

    const topByHours = [...games]
      .sort((a, b) => b.hoursTotal - a.hoursTotal)
      .slice(0, 5)
      .map(g => ({ appid: g.appid, name: g.name, hoursTotal: g.hoursTotal }));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({
      generatedAt: Date.now(),
      stats: { totalGames, totalHours, yearsEquivalent, neverPlayedCount },
      nowPlaying,
      recent,
      topByHours,
    });
  } catch (err) {
    console.error('[steam-games]', err);
    res.status(502).json({ error: 'Failed to fetch Steam data' });
  }
};
