import React from 'react';

export default function Sidebar({ activeView, setActiveView, isMobileOpen, setIsMobileOpen, taskCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', badge: null },
    { id: 'tasks', label: 'Tasks (Kanban)', icon: 'view_kanban', badge: taskCount },
    { id: 'task-details', label: 'Task Details', icon: 'description', badge: null },
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div style={{ padding: '1.5rem', borderBottom: '2px solid var(--color-outline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              backgroundColor: 'var(--color-primary-container)',
              border: '2px solid var(--color-outline)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-2)',
              fontWeight: 800,
              fontFamily: 'var(--font-headline)',
              fontSize: '1.1rem'
            }}>
              ▲
            </div>
            <div>
              <span className="font-headline" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', display: 'block', lineHeight: 1.1 }}>
                TaskBauhaus
              </span>
              <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                BAUHAUS_OS v2.4
              </span>
            </div>
          </div>
          {/* Mobile close */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Navigation links */}
        <nav style={{ flex: 1, padding: '1.25rem 1rem' }}>
          <div className="font-headline" style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', paddingLeft: '0.5rem', marginBottom: '0.75rem' }}>
            Primary Modules
          </div>
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span 
                    className="font-mono" 
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.4rem',
                      backgroundColor: isActive ? 'var(--color-primary)' : 'var(--bg-surface-high)',
                      color: isActive ? 'var(--on-primary)' : 'var(--color-text)',
                      border: '1px solid var(--color-outline)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Workspace Info Card */}
        <div style={{ padding: '1rem', borderTop: '2px solid var(--color-outline)', backgroundColor: 'var(--bg-surface-low)' }}>
          <div style={{ 
            backgroundColor: 'var(--bg-surface-lowest)', 
            border: '2px solid var(--color-outline)', 
            padding: '0.85rem', 
            boxShadow: 'var(--shadow-3)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span className="font-headline" style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                WORKSPACE
              </span>
              <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-tertiary)', fontWeight: 700 }}>
                #LIVE_CORE
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-headline)', marginBottom: '0.5rem' }}>
              Form Follows Function
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-surface-high)', border: '1px solid var(--color-outline)', overflow: 'hidden' }}>
              <div style={{ width: '74%', height: '100%', backgroundColor: 'var(--color-primary-container)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>
              <span>SPRINT 44</span>
              <span>74% LOAD</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
