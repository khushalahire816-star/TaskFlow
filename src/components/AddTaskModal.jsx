import React, { useState } from 'react';

export default function AddTaskModal({ isOpen, onClose, onAddTask }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [project, setProject] = useState('#CORE');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      priority,
      dueDate,
      project: project.startsWith('#') ? project : `#${project}`,
      description: description.trim() || 'No description provided.'
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setPriority('medium');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Header Tag */}
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '20px',
          backgroundColor: 'var(--color-primary-container)',
          color: 'var(--on-primary-container)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          fontSize: '0.75rem',
          padding: '0.2rem 0.6rem',
          border: '2px solid var(--color-outline)'
        }}>
          MODAL_TERM // 01
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="bauhaus-btn bauhaus-btn-sm"
          style={{ position: 'absolute', top: '16px', right: '16px', padding: '0.35rem' }}
          aria-label="Close Modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
          <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
            OPERATION // CREATE
          </span>
          <h2 className="font-headline" style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase' }}>
            Add New Task
          </h2>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="font-headline" style={{ display: 'block', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Task Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.G. REDESIGN LANDING PAGE HEADER..."
              className="bauhaus-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="font-headline" style={{ display: 'block', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bauhaus-select"
                style={{ width: '100%' }}
              >
                <option value="low">LOW PRIORITY</option>
                <option value="medium">MEDIUM PRIORITY</option>
                <option value="high">HIGH PRIORITY</option>
              </select>
            </div>

            <div>
              <label className="font-headline" style={{ display: 'block', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Due Date
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bauhaus-input font-mono"
              />
            </div>

            <div>
              <label className="font-headline" style={{ display: 'block', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Project Tag
              </label>
              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="#PROJECT"
                className="bauhaus-input font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-headline" style={{ display: 'block', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Rich Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ENTER DETAILED TASK PARAMETERS..."
              className="bauhaus-input font-mono"
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="bauhaus-btn bauhaus-btn-sm"
              style={{ backgroundColor: 'var(--bg-surface-high)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bauhaus-btn bauhaus-btn-sm bauhaus-btn-accent"
              style={{ padding: '0.6rem 1.25rem' }}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
