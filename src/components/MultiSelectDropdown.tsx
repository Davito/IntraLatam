import React, { useState, useRef, useEffect } from 'react';

interface Props {
  options: string[];
  placeholder?: string;
  className?: string;
}

export default function MultiSelectDropdown({ options, placeholder = 'Todos', className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (opt: string) => {
    setSelected(prev =>
      prev.includes(opt) ? prev.filter(s => s !== opt) : [...prev, opt]
    );
  };

  const label = selected.length === 0
    ? placeholder
    : selected.length === 1
      ? selected[0]
      : `${selected.length} seleccionados`;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`h-8 w-full min-w-[120px] rounded-lg border bg-white text-xs pl-3 pr-7 text-left outline-none transition-colors ${
          open ? 'border-primary' : 'border-border-color text-text-secondary'
        }`}
      >
        <span className={selected.length > 0 ? 'text-text-main' : 'text-text-secondary'}>
          {label}
        </span>
      </button>
      <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-text-secondary text-sm">
          {open ? 'arrow_drop_up' : 'arrow_drop_down'}
        </span>
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[160px] bg-white border border-border-color rounded-lg shadow-lg py-1">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2.5 px-3 py-1.5 cursor-pointer hover:bg-background-light text-xs text-text-main">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="size-3.5 rounded border-gray-300 text-primary cursor-pointer"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
