import React from 'react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-stack">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';
        const icon = isError ? 'error' : isInfo ? 'info' : 'check_circle';
        const toastClass = isError ? 'toast-error' : isInfo ? 'toast-info' : 'toast-success';

        return (
          <div key={toast.id} className={`toast-item ${toastClass}`}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>
              {icon}
            </span>
            <div style={{ flex: 1 }}>
              <div className="font-headline" style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                {toast.title || (isError ? 'Action Alert' : isInfo ? 'Notice' : 'Success')}
              </div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.1rem' }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.2rem'
              }}
              aria-label="Dismiss toast"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
