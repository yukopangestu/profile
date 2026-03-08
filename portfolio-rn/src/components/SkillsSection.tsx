import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { skills } from '../data';

function SkillBar({ level }: { level: number }) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: level,
      duration: 1000,
      delay: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.barTrack}>
      <Animated.View
        style={[
          styles.barFill,
          {
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

export default function SkillsSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Technical Skills</Text>
      <Text style={styles.subtitle}>Technologies and expertise I bring to the table</Text>

      <View style={styles.grid}>
        {skills.map(skill => (
          <View key={skill.name} style={styles.skillCard}>
            <FontAwesome5
              name={skill.icon as any}
              size={28}
              color={Colors.primaryBlue}
              style={styles.icon}
            />
            <Text style={styles.skillName}>{skill.name}</Text>
            <SkillBar level={skill.level} />
            <Text style={styles.levelText}>{skill.level}%</Text>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Technical Expertise</Text>
        <Text style={styles.summaryText}>8+ years building scalable web applications</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.darkBlue,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillCard: {
    width: '47.5%',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  skillName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 12,
  },
  barTrack: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.borderGray,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.primaryBlue,
    borderRadius: 3,
  },
  levelText: {
    fontSize: 11,
    color: Colors.gray,
    marginTop: 2,
  },
  summary: {
    marginTop: 32,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkBlue,
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.gray,
  },
});
