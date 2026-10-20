import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  label: string; // accessible name
}

/** A small custom dropdown (keyboard: arrows, Enter, Escape) used instead of the browser's native select. */
export default function Select({ value, options, onChange, label }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => root.current && !root.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);

  const openMenu = () => { setActive(Math.max(0, options.findIndex((o) => o.value === value))); setOpen(true); };
  const pick = (v: string) => { onChange(v); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openMenu(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(options.length - 1, i + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(options[active].value); }
  };

  return (
    <div className="dd" ref={root} onKeyDown={onKey}>
      <button type="button" className="dd-btn" aria-haspopup="listbox" aria-expanded={open} aria-label={label} onClick={() => (open ? setOpen(false) : openMenu())}>
        <span>{current?.label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <ul className="dd-menu" role="listbox" aria-label={label}>
          {options.map((o, i) => (
            <li key={o.value} role="option" aria-selected={o.value === value} className={(i === active ? 'hover ' : '') + (o.value === value ? 'sel' : '')} onMouseEnter={() => setActive(i)} onClick={() => pick(o.value)}>{o.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
