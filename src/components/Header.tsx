import React from 'react';

export default function Header({ onMassReprocess }: { onMassReprocess: () => void }) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-border-color bg-surface px-6 py-3 shrink-0 z-20 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-text-main">
          <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
            <span className="material-symbols-outlined text-2xl">monitoring</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">Monitor Intralatam</h2>
        </div>
        <label className="flex flex-col min-w-64 max-w-96 hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-text-secondary text-xl group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input className="block w-full rounded-lg border-transparent bg-background-light focus:bg-surface focus:border-primary/20 focus:ring-4 focus:ring-primary/10 pl-10 pr-4 py-2 text-sm text-text-main placeholder:text-text-secondary transition-all outline-none" placeholder="Buscar por ID..." />
        </label>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onMassReprocess} className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors shadow-sm active:scale-95 transform">
          <span className="material-symbols-outlined text-lg">add</span>
          <span className="truncate">Reprocesamiento masivo</span>
        </button>
        <div className="h-8 w-[1px] bg-border-color mx-1"></div>
        <button className="relative p-1 rounded-full text-text-secondary hover:bg-background-light transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 size-2 bg-error rounded-full border border-surface"></span>
        </button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-background-light cursor-pointer" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6rBKa4btQv1x5-7EHNM6nQFWsN4EIGQFWagaNo6GaNzCrXT2lSQs0IQ_9Apnxe8UTNpTf5cOP9dXZH2_xpHogMJ08Th_xIABAUSJUBfXdDHfcgT4XYW_pyl_FjvRJU9iFx4erZ3M12gfSFGrifTGAFtR-2568uN4FHCTmJ_FYPxtQ5BOjQfKkiMuO1qFd9_y5EDaJ93ya1T9eO_JHk6BeL-BCNkN-KusNWzZeN0E9_qasmZv4MFagxOMxKmMocdGap8RNCy68rY")' }}></div>
      </div>
    </header>
  );
}
