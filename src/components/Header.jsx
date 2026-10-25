import React, { useState } from 'react';

export default function Header({ searchQuery, setSearchQuery, setIsMobileOpen, onOpenAddTask, notificationsCount = 3 }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="top-header">
      {/* Left: Mobile Toggle & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '520px' }}>
        <button
          onClick={() => setIsMobileOpen(prev => !prev)}
          className="bauhaus-btn bauhaus-btn-sm lg:hidden"
          style={{ padding: '0.4rem 0.6rem' }}
          aria-label="Toggle Navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'var(--bg-surface-lowest)',
          border: '2px solid var(--color-outline)',
          padding: '0.4rem 0.75rem',
          boxShadow: 'var(--shadow-2)'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, projects, tags..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text)'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Quick add task button */}
        <button 
          onClick={onOpenAddTask}
          className="bauhaus-btn bauhaus-btn-accent bauhaus-btn-sm"
          style={{ display: 'none' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add</span>
          <span>New Task</span>
        </button>

        {/* System Pill */}
        <div style={{
          padding: '0.25rem 0.6rem',
          backgroundColor: 'var(--bg-surface-low)',
          border: '2px solid var(--color-outline)',
          boxShadow: 'var(--shadow-2)',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-headline)',
          fontWeight: 700,
          textTransform: 'uppercase',
          display: 'none'
        }} className="md:block">
          SYSTEM // <span style={{ color: 'var(--color-tertiary)' }}>ACTIVE</span>
        </div>

        {/* Notifications Dropdown Container */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bauhaus-btn"
            style={{ 
              padding: '0.45rem', 
              boxShadow: 'var(--shadow-2)', 
              position: 'relative',
              borderRadius: '2px'
            }}
            title="Notifications"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>notifications</span>
            {notificationsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '10px',
                height: '10px',
                backgroundColor: 'var(--color-secondary)',
                border: '2px solid var(--color-outline)',
                borderRadius: '50%'
              }} />
            )}
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '120%',
              width: '300px',
              backgroundColor: 'var(--bg-surface-lowest)',
              border: '2px solid var(--color-outline)',
              boxShadow: 'var(--shadow-6)',
              zIndex: 60,
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '2px solid var(--color-outline)', paddingBottom: '0.5rem' }}>
                <span className="font-headline" style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>Notifications (3)</span>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-tertiary)' }}>MARK READ</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-surface-low)', border: '1px solid var(--color-outline)' }}>
                  <div style={{ fontWeight: 700 }}>Task #8842 updated</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Walter G. changed priority to High</div>
                </div>
                <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-surface-low)', border: '1px solid var(--color-outline)' }}>
                  <div style={{ fontWeight: 700 }}>Deadline approaching</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Kanban Drag Engine due today 17:00</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.75rem', borderLeft: '2px solid var(--color-outline-variant)' }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6bxXSWMLcgfwjU9lFn1o-_B5qF13XHjYITIBB5CmE2JLs_23W921uytUDzrNoddnCoAho4izezLuswqqeA7wNF4rFy4-5rjSFdLeTXnkGVgS_A3ubV8rXPOACf6BmB4ftaEm-gjk0r775ITEoBQpYJp5m-uIuihkFREUBa6fcHaHUCJ7hppxr13uZVijoGsW6475swH4gevUqsC32OUCQHZXPmjfvoCx4ZRP-NtCpXJJENACxz5zq"
            alt="Profile Avatar"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: '2px solid var(--color-outline)',
              objectFit: 'cover',
              boxShadow: 'var(--shadow-2)'
            }}
          />
          <div className="hidden sm:block">
            <div className="font-headline" style={{ fontSize: '0.8rem', fontWeight: 800, lineHeight: 1.1 }}>
              GROPIUS W.
            </div>
            <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
              MASTER LEAD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
