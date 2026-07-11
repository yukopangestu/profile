interface TerminalChromeProps {
  title: string;
  size?: 'sm' | 'md';
}

export default function TerminalChrome({ title, size = 'md' }: TerminalChromeProps) {
  const pad = size === 'sm' ? 'px-3.5 py-2.5' : 'px-3.5 py-2.5';
  const fontSize = size === 'sm' ? 'text-[10.5px]' : 'text-[11px]';

  return (
    <div
      className={`flex gap-1.5 items-center ${pad} border-b border-term-dim`}
    >
      <span className="term-dot" />
      <span className="term-dot" />
      <span className="term-dot active" />
      <span className={`ml-2 font-mono ${fontSize} text-terminal-faint`}>{title}</span>
    </div>
  );
}
