import React, { useState } from 'react';

export default function TaskDetails({ 
  task, 
  onBack, 
  onUpdateTask, 
  onDeleteTask, 
  onShowToast 
}) {
  if (!task) {
    return (
      <div className="page-container">
        <button onClick={onBack} className="bauhaus-btn bauhaus-btn-sm" style={{ marginBottom: '1.5rem' }}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Kanban
        </button>
        <div className="bauhaus-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 className="font-headline" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Task Selected</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Please select a task from the dashboard or task matrix.</p>
        </div>
      </div>
    );
  }

  // Local state for the editable fields
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [description, setDescription] = useState(task.description);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(task.comments || []);
  const [attachments, setAttachments] = useState(task.attachments || []);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    onUpdateTask({
      ...task,
      title,
      dueDate,
      priority,
      status,
      description,
      comments,
      attachments
    });
    onShowToast('Task attributes updated successfully!', 'success');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: `c-${Date.now()}`,
      author: 'Gropius W.',
      time: 'Just now',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6bxXSWMLcgfwjU9lFn1o-_B5qF13XHjYITIBB5CmE2JLs_23W921uytUDzrNoddnCoAho4izezLuswqqeA7wNF4rFy4-5rjSFdLeTXnkGVgS_A3ubV8rXPOACf6BmB4ftaEm-gjk0r775ITEoBQpYJp5m-uIuihkFREUBa6fcHaHUCJ7hppxr13uZVijoGsW6475swH4gevUqsC32OUCQHZXPmjfvoCx4ZRP-NtCpXJJENACxz5zq',
      content: newComment.trim()
    };

    const updated = [...comments, commentObj];
    setComments(updated);
    setNewComment('');
    onUpdateTask({
      ...task,
      comments: updated
    });
    onShowToast('Comment posted to discussion thread!', 'info');
  };

  const handleInsertMarkdown = (syntax) => {
    if (syntax === 'bold') setDescription(prev => prev + ' **bold text**');
    else if (syntax === 'italic') setDescription(prev => prev + ' *italic text*');
    else if (syntax === 'code') setDescription(prev => prev + ' `code snippet`');
    else if (syntax === 'list') setDescription(prev => prev + '\n- Item 1\n- Item 2');
  };

  const handleAddAttachment = () => {
    const filename = prompt('Enter attachment filename:', 'spec_architecture.pdf');
    if (!filename) return;
    const newAtt = {
      id: `att-${Date.now()}`,
      name: filename,
      size: '512 KB',
      time: 'Just now',
      type: filename.endsWith('.png') || filename.endsWith('.jpg') ? 'image' : 'code'
    };
    const updated = [...attachments, newAtt];
    setAttachments(updated);
    onShowToast(`Uploaded ${filename}`, 'success');
  };

  return (
    <div className="page-container" style={{ paddingBottom: '7rem' }}>
      {/* Top Banner / Breadcrumb Area */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid var(--color-outline)',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            className="bauhaus-btn bauhaus-btn-sm"
            style={{ backgroundColor: 'var(--bg-surface)' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_back</span>
            Back to Kanban
          </button>
          <span className="font-mono" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            / TASK-ID #{task.id}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className={`bauhaus-badge badge-${priority}`}>
            {priority.toUpperCase()} PRIORITY
          </span>
          <span className={`bauhaus-badge badge-${status}`}>
            {status === 'in-progress' ? 'IN PROGRESS' : status === 'completed' ? 'COMPLETED' : 'TO DO'}
          </span>
        </div>
      </div>

      {/* Main Grid Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* LEFT SIDE: Task Editor Form */}
        <div className="bauhaus-card" style={{ padding: '2rem', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '16px',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--on-primary)',
            fontFamily: 'var(--font-headline)',
            fontWeight: 800,
            padding: '0.2rem 0.75rem',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            border: '2px solid var(--color-outline)',
            boxShadow: 'var(--shadow-2)'
          }}>
            Editor Workspace
          </div>

          <form onSubmit={handleSave} style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Title Field */}
            <div>
              <label className="font-headline" style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Task Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bauhaus-input font-headline"
                style={{ fontSize: '1.15rem', fontWeight: 800 }}
              />
            </div>

            {/* Grid for Due Date & Priority */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label className="font-headline" style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bauhaus-input font-mono"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label className="font-headline" style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Priority Level
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {['low', 'medium', 'high'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setPriority(lvl)}
                      className="bauhaus-btn bauhaus-btn-sm"
                      style={{
                        padding: '0.5rem 0.25rem',
                        backgroundColor: priority === lvl ? 'var(--color-primary-container)' : 'var(--bg-surface)',
                        color: 'var(--color-text)',
                        boxShadow: priority === lvl ? 'var(--shadow-3)' : 'var(--shadow-2)'
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Selector */}
            <div>
              <label className="font-headline" style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Status
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'todo', label: 'To Do', activeBg: 'var(--bg-surface-high)' },
                  { id: 'in-progress', label: 'In Progress', activeBg: 'var(--color-primary-container)' },
                  { id: 'completed', label: 'Completed', activeBg: 'var(--color-tertiary-container)' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStatus(st.id)}
                    className="bauhaus-btn bauhaus-btn-sm"
                    style={{
                      padding: '0.5rem 0.25rem',
                      backgroundColor: status === st.id ? st.activeBg : 'var(--bg-surface)',
                      boxShadow: status === st.id ? 'var(--shadow-3)' : 'var(--shadow-2)'
                    }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Markdown Description Textarea */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="font-headline" style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                  Description (Markdown)
                </label>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button type="button" onClick={() => handleInsertMarkdown('bold')} className="bauhaus-btn bauhaus-btn-sm" style={{ padding: '0.2rem 0.4rem', fontWeight: 800 }}>B</button>
                  <button type="button" onClick={() => handleInsertMarkdown('italic')} className="bauhaus-btn bauhaus-btn-sm" style={{ padding: '0.2rem 0.4rem', fontStyle: 'italic' }}>I</button>
                  <button type="button" onClick={() => handleInsertMarkdown('code')} className="bauhaus-btn bauhaus-btn-sm font-mono" style={{ padding: '0.2rem 0.4rem' }}>&lt;/&gt;</button>
                  <button type="button" onClick={() => handleInsertMarkdown('list')} className="bauhaus-btn bauhaus-btn-sm" style={{ padding: '0.2rem 0.4rem' }}>List</button>
                </div>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className="bauhaus-input font-mono"
                style={{ fontSize: '0.85rem', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
              <button type="submit" className="bauhaus-btn bauhaus-btn-primary">
                Update Task Attributes
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE: Metadata, Attachments, Comments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Metadata Card */}
          <div className="bauhaus-card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface-low)', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '16px',
              backgroundColor: 'var(--color-tertiary)',
              color: 'var(--on-tertiary)',
              fontFamily: 'var(--font-headline)',
              fontWeight: 800,
              fontSize: '0.7rem',
              padding: '0.15rem 0.6rem',
              textTransform: 'uppercase',
              border: '2px solid var(--color-outline)',
              boxShadow: 'var(--shadow-2)'
            }}>
              Metadata
            </div>
            <h3 className="font-headline" style={{ fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Task Properties
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-outline-variant)' }}>
                <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Created Date</span>
                <span className="font-mono" style={{ fontWeight: 700 }}>{task.createdAt || 'Oct 12, 2024'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-outline-variant)' }}>
                <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Assigned User</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                    style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--color-outline)', objectFit: 'cover' }}
                  />
                  <span style={{ fontWeight: 700 }}>{task.assignee.name}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Estimated Time</span>
                <span className="font-mono" style={{ fontWeight: 700, backgroundColor: 'var(--color-primary-container)', padding: '0.1rem 0.5rem', border: '1px solid var(--color-outline)' }}>
                  {task.estimatedHours || 14.5} Hours
                </span>
              </div>
            </div>
          </div>

          {/* Attachments Card */}
          <div className="bauhaus-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="font-headline" style={{ fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase' }}>
                Attachments ({attachments.length})
              </h3>
              <button
                type="button"
                onClick={handleAddAttachment}
                className="bauhaus-btn bauhaus-btn-sm"
              >
                + Upload
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {attachments.map(att => (
                <div
                  key={att.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-surface-low)',
                    border: '2px solid var(--color-outline)',
                    boxShadow: 'var(--shadow-2)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="material-symbols-outlined" style={{ color: att.type === 'image' ? 'var(--color-secondary)' : 'var(--color-tertiary)' }}>
                      {att.type === 'image' ? 'image' : 'description'}
                    </span>
                    <div>
                      <div className="font-headline" style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        {att.name}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                        {att.size} • {att.time}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onShowToast(`Downloading ${att.name}...`, 'info')}
                    className="bauhaus-btn bauhaus-btn-sm"
                    style={{ padding: '0.25rem 0.4rem' }}
                    title="Download"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>download</span>
                  </button>
                </div>
              ))}
              {attachments.length === 0 && (
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  No files attached.
                </div>
              )}
            </div>
          </div>

          {/* Discussion Thread */}
          <div className="bauhaus-card" style={{ padding: '1.5rem' }}>
            <h3 className="font-headline" style={{ fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Discussion Thread
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              {comments.map(c => (
                <div
                  key={c.id}
                  style={{
                    padding: '0.85rem',
                    backgroundColor: 'var(--bg-surface-low)',
                    border: '2px solid var(--color-outline)',
                    boxShadow: 'var(--shadow-2)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <img
                        src={c.avatar}
                        alt={c.author}
                        style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid var(--color-outline)', objectFit: 'cover' }}
                      />
                      <span className="font-headline" style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        {c.author}
                      </span>
                    </div>
                    <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                      {c.time}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>
                    {c.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="bauhaus-input"
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
              />
              <button type="submit" className="bauhaus-btn bauhaus-btn-primary bauhaus-btn-sm">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(245, 240, 232, 0.96)',
        backdropFilter: 'blur(10px)',
        borderTop: '2px solid var(--color-outline)',
        padding: '1rem 2rem',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 -4px 0px rgba(26, 26, 26, 0.05)'
      }}>
        <button
          onClick={() => {
            if (confirm(`Are you sure you want to delete ${task.title}?`)) {
              onDeleteTask(task.id);
            }
          }}
          className="bauhaus-btn bauhaus-btn-danger bauhaus-btn-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>delete</span>
          Delete Task
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              const newSt = status === 'completed' ? 'todo' : 'completed';
              setStatus(newSt);
              onUpdateTask({ ...task, status: newSt });
              onShowToast(`Task marked as ${newSt === 'completed' ? 'completed' : 'todo'}!`, 'success');
            }}
            className="bauhaus-btn bauhaus-btn-tertiary bauhaus-btn-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
              {status === 'completed' ? 'restart_alt' : 'check_circle'}
            </span>
            {status === 'completed' ? 'Reopen Task' : 'Mark Completed'}
          </button>

          <button
            onClick={handleSave}
            className="bauhaus-btn bauhaus-btn-accent bauhaus-btn-sm"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>save</span>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
