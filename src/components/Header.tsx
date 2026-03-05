import React from 'react';
import type { SavedView } from '../App';

type UserRole = 'viewer' | 'support';

export default function Header({ onMassReprocess, userRole, onRoleToggle, isOpen, onToggle, savedViews, activeViewId, onViewClick }: {
  onMassReprocess: () => void;
  userRole: UserRole;
  onRoleToggle: () => void;
  isOpen: boolean;
  onToggle: () => void;
  savedViews: SavedView[];
  activeViewId: string | null;
  onViewClick: (view: SavedView) => void;
}) {
  return (
    <aside
      style={{ width: isOpen ? '220px' : '60px' }}
      className="flex flex-col bg-surface border-r border-border-color shrink-0 z-20 transition-all duration-300 overflow-hidden"
    >
      {/* Brand */}
      <div className="flex items-center h-14 px-3.5 border-b border-border-color gap-3 shrink-0">
        <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary shrink-0">
          <span className="material-symbols-outlined text-xl">monitoring</span>
        </div>
        {isOpen && (
          <span className="text-sm font-bold leading-tight tracking-tight truncate whitespace-nowrap">
            Monitor Intralatam
          </span>
        )}
      </div>

      {/* Search */}
      <div className={`border-b border-border-color shrink-0 ${isOpen ? 'px-3 py-3' : 'flex justify-center py-3'}`}>
        {isOpen ? (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary text-lg">search</span>
            </div>
            <input
              className="block w-full rounded-lg border-transparent bg-background-light focus:bg-white focus:border-primary/30 pl-9 pr-3 py-2 text-sm text-text-main placeholder:text-text-secondary transition-all outline-none"
              placeholder="Buscar por ID..."
            />
          </div>
        ) : (
          <button className="p-2 rounded-lg text-text-secondary hover:bg-background-light transition-colors">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        <button className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary transition-colors ${!isOpen ? 'justify-center' : ''}`}>
          <span className="material-symbols-outlined text-xl shrink-0">dashboard</span>
          {isOpen && <span className="truncate">Dashboard</span>}
        </button>

        {/* Saved views — sub-items under Dashboard */}
        {isOpen && savedViews.map(view => (
          <button
            key={view.id}
            onClick={() => onViewClick(view)}
            className={`w-full flex items-center gap-2 pl-7 pr-2 py-1.5 rounded-lg text-xs transition-colors ${
              activeViewId === view.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-text-secondary hover:bg-background-light'
            }`}
          >
            <span className="material-symbols-outlined text-sm shrink-0">bookmark</span>
            <span className="truncate">{view.name}</span>
          </button>
        ))}

        <button className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background-light transition-colors ${!isOpen ? 'justify-center' : ''}`}>
          <div className="relative shrink-0">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute -top-0.5 -right-0.5 size-2 bg-error rounded-full border-2 border-surface" />
          </div>
          {isOpen && <span className="truncate">Notificaciones</span>}
        </button>

      </nav>

      {/* Bottom */}
      <div className="border-t border-border-color p-2 flex flex-col gap-1 shrink-0">

        {/* Role toggle */}
        <button
          onClick={onRoleToggle}
          title={isOpen ? undefined : (userRole === 'support' ? 'Soporte' : 'Viewer')}
          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium border transition-colors ${!isOpen ? 'justify-center' : ''} ${
            userRole === 'support'
              ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
              : 'bg-background-light text-text-secondary border-border-color hover:bg-surface'
          }`}
        >
          <span className="material-symbols-outlined text-sm shrink-0">
            {userRole === 'support' ? 'admin_panel_settings' : 'person'}
          </span>
          {isOpen && <span className="truncate">{userRole === 'support' ? 'Soporte' : 'Viewer'}</span>}
        </button>

        {/* Mass reprocess — solo soporte */}
        {userRole === 'support' && (
          <button
            onClick={onMassReprocess}
            title={isOpen ? undefined : 'Reprocesamiento masivo'}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold bg-primary hover:bg-primary-dark text-white transition-colors active:scale-95 ${!isOpen ? 'justify-center' : ''}`}
          >
            <span className="material-symbols-outlined text-sm shrink-0">replay</span>
            {isOpen && <span className="truncate">Reprocesamiento masivo</span>}
          </button>
        )}

        {/* User */}
        <div className={`flex items-center gap-2.5 px-2 py-1.5 ${!isOpen ? 'justify-center' : ''}`}>
          <div
            className="size-7 rounded-full bg-cover bg-center shrink-0 ring-2 ring-background-light cursor-pointer"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6rBKa4btQv1x5-7EHNM6nQFWsN4EIGQFWagaNo6GaNzCrXT2lSQs0IQ_9Apnxe8UTNpTf5cOP9dXZH2_xpHogMJ08Th_xIABAUSJUBfXdDHfcgT4XYW_pyl_FjvRJU9iFx4erZ3M12gfSFGrifTGAFtR-2568uN4FHCTmJ_FYPxtQ5BOjQfKkiMuO1qFd9_y5EDaJ93ya1T9eO_JHk6BeL-BCNkN-KusNWzZeN0E9_qasmZv4MFagxOMxKmMocdGap8RNCy68rY")' }}
          />
          {isOpen && <span className="text-xs text-text-secondary truncate">David Pinto</span>}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-text-secondary hover:bg-background-light transition-colors ${!isOpen ? 'justify-center' : ''}`}
        >
          <span className="material-symbols-outlined text-lg shrink-0">
            {isOpen ? 'chevron_left' : 'chevron_right'}
          </span>
          {isOpen && <span>Colapsar</span>}
        </button>
      </div>
    </aside>
  );
}
