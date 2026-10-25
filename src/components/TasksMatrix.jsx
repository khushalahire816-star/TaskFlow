import React, { useState } from 'react';

export default function TasksMatrix({
  tasks,
  onSelectTask,
  onOpenAddTask,
  onMoveTaskStatus,
  onBatchComplete,
  onBatchDelete
}) {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('due-date');
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  // Filtering & Sorting logic
  let filtered = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          task.project.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'priority') {
      const pMap = { high: 1, medium: 2, low: 3 };
      return (pMap[a.priority] || 4) - (pMap[b.priority] || 4);
    }
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    // Default: due date
    return (a.dueDate || '').localeCompare(b.dueDate || '');
  });

  const todoTasks = filtered.filter(t => t.status === 'todo');
  const inProgressTasks = filtered.filter(t => t.status === 'in-progress');
  const completedTasks = filtered.filter(t => t.status === 'completed');

  // Batch selection handling
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTaskIds(filtered.map(t => t.id));
    } else {
      setSelectedTaskIds([]);
    }
  };

  const handleToggleRow = (id) => {
    setSelectedTaskIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="page-container">
      {/* Cyber-Brutalist Terminal Header Grid */}
      <div className="bauhaus-card-hero" style={{
        backgroundColor: 'var(--bg-surface-low)',
        padding: '1.75rem',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              padding: '0.2rem 0.5rem',
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--on-primary-container)',
              fontFamily: 'var(--font-headline)',
              fontWeight: 800,
              fontSize: '0.7rem',
              border: '1px solid var(--color-outline)'
            }}>
              SYSTEM // 02
            </span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              ACTIVE_WORKSPACE: BAUHAUS_CORE
            </span>
          </div>
          <h1 className="font-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Task Matrix & Operations
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
            className="bauhaus-btn"
            style={{ backgroundColor: 'var(--bg-surface-lowest)' }}
          >
            <span className="material-symbols-outlined">
              {viewMode === 'kanban' ? 'view_kanban' : 'table_chart'}
            </span>
            <span>{viewMode === 'kanban' ? 'Kanban View' : 'List View'}</span>
          </button>

          <button
            onClick={onOpenAddTask}
            className="bauhaus-btn bauhaus-btn-primary"
            style={{ boxShadow: 'var(--shadow-6)' }}
          >
            <span className="material-symbols-outlined">add</span>
            Add Task
          </button>
        </div>
      </div>

      {/* Cyber Terminal Filters & Controls Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Search */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface-lowest)',
          border: '2px solid var(--color-outline)',
          boxShadow: 'var(--shadow-4)'
        }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '0.75rem', color: 'var(--color-text-muted)' }}>
            search
          </span>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="FILTER TASKS..."
            className="bauhaus-input"
            style={{ border: 'none', paddingLeft: '2.5rem', boxShadow: 'none' }}
          />
        </div>

        {/* Status Dropdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface-lowest)',
          border: '2px solid var(--color-outline)',
          boxShadow: 'var(--shadow-4)',
          paddingLeft: '0.5rem'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>
            filter_list
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bauhaus-select"
            style={{ width: '100%', border: 'none', boxShadow: 'none' }}
          >
            <option value="all">STATUS: ALL</option>
            <option value="todo">TO DO</option>
            <option value="in-progress">IN PROGRESS</option>
            <option value="completed">COMPLETED</option>
          </select>
        </div>

        {/* Priority Dropdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface-lowest)',
          border: '2px solid var(--color-outline)',
          boxShadow: 'var(--shadow-4)',
          paddingLeft: '0.5rem'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>
            flag
          </span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bauhaus-select"
            style={{ width: '100%', border: 'none', boxShadow: 'none' }}
          >
            <option value="all">PRIORITY: ALL</option>
            <option value="high">HIGH PRIORITY</option>
            <option value="medium">MEDIUM PRIORITY</option>
            <option value="low">LOW PRIORITY</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface-lowest)',
          border: '2px solid var(--color-outline)',
          boxShadow: 'var(--shadow-4)',
          paddingLeft: '0.5rem'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>
            sort
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bauhaus-select"
            style={{ width: '100%', border: 'none', boxShadow: 'none' }}
          >
            <option value="due-date">SORT: DUE DATE</option>
            <option value="priority">SORT: PRIORITY</option>
            <option value="alphabetical">SORT: A-Z</option>
          </select>
        </div>
      </div>

      {/* VIEWS CONTAINER */}
      {viewMode === 'kanban' ? (
        /* KANBAN BOARD VIEW */
        <div className="kanban-grid">
          {/* COLUMN: TO DO */}
          <div className="kanban-column">
            <div className="kanban-column-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-secondary)', display: 'inline-block', border: '2px solid var(--color-outline)' }} />
                <h3 className="font-headline" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  To Do
                </h3>
              </div>
              <span className="font-mono" style={{ padding: '0.15rem 0.5rem', backgroundColor: 'var(--bg-surface-lowest)', border: '2px solid var(--color-outline)', fontSize: '0.75rem', fontWeight: 800, boxShadow: 'var(--shadow-2)' }}>
                {String(todoTasks.length).padStart(2, '0')}
              </span>
            </div>

            <div className="kanban-cards">
              {todoTasks.map(task => (
                <KanbanCard 
                  key={task.id} 
                  task={task} 
                  onSelectTask={onSelectTask}
                  onMove={(nextStatus) => onMoveTaskStatus(task.id, nextStatus)}
                  availableMoves={[{ label: '→ In Progress', target: 'in-progress' }]}
                />
              ))}
              {todoTasks.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontStyle: 'italic', border: '2px dashed var(--color-outline-variant)' }}>
                  No tasks in queue
                </div>
              )}
            </div>
          </div>

          {/* COLUMN: IN PROGRESS */}
          <div className="kanban-column">
            <div className="kanban-column-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-primary-container)', display: 'inline-block', border: '2px solid var(--color-outline)' }} />
                <h3 className="font-headline" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  In Progress
                </h3>
              </div>
              <span className="font-mono" style={{ padding: '0.15rem 0.5rem', backgroundColor: 'var(--bg-surface-lowest)', border: '2px solid var(--color-outline)', fontSize: '0.75rem', fontWeight: 800, boxShadow: 'var(--shadow-2)' }}>
                {String(inProgressTasks.length).padStart(2, '0')}
              </span>
            </div>

            <div className="kanban-cards">
              {inProgressTasks.map(task => (
                <KanbanCard 
                  key={task.id} 
                  task={task} 
                  onSelectTask={onSelectTask}
                  onMove={(nextStatus) => onMoveTaskStatus(task.id, nextStatus)}
                  availableMoves={[
                    { label: '← To Do', target: 'todo' },
                    { label: '→ Complete', target: 'completed' }
                  ]}
                />
              ))}
              {inProgressTasks.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontStyle: 'italic', border: '2px dashed var(--color-outline-variant)' }}>
                  No tasks currently active
                </div>
              )}
            </div>
          </div>

          {/* COLUMN: COMPLETED */}
          <div className="kanban-column">
            <div className="kanban-column-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-tertiary)', display: 'inline-block', border: '2px solid var(--color-outline)' }} />
                <h3 className="font-headline" style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Completed
                </h3>
              </div>
              <span className="font-mono" style={{ padding: '0.15rem 0.5rem', backgroundColor: 'var(--bg-surface-lowest)', border: '2px solid var(--color-outline)', fontSize: '0.75rem', fontWeight: 800, boxShadow: 'var(--shadow-2)' }}>
                {String(completedTasks.length).padStart(2, '0')}
              </span>
            </div>

            <div className="kanban-cards">
              {completedTasks.map(task => (
                <KanbanCard 
                  key={task.id} 
                  task={task} 
                  onSelectTask={onSelectTask}
                  onMove={(nextStatus) => onMoveTaskStatus(task.id, nextStatus)}
                  availableMoves={[{ label: '← Reopen', target: 'in-progress' }]}
                  isCompleted={true}
                />
              ))}
              {completedTasks.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontStyle: 'italic', border: '2px dashed var(--color-outline-variant)' }}>
                  No completed tasks yet
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bauhaus-card-hero" style={{ backgroundColor: 'var(--bg-surface-lowest)', overflow: 'hidden' }}>
          {/* Batch Action Bar */}
          {selectedTaskIds.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.5rem',
              backgroundColor: 'var(--color-primary-container)',
              borderBottom: '4px solid var(--color-outline)'
            }}>
              <span className="font-headline" style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem' }}>
                {selectedTaskIds.length} SELECTED
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => onBatchComplete(selectedTaskIds)}
                  className="bauhaus-btn bauhaus-btn-sm"
                  style={{ backgroundColor: 'var(--bg-surface)' }}
                >
                  Mark Complete
                </button>
                <button
                  onClick={() => onBatchDelete(selectedTaskIds)}
                  className="bauhaus-btn bauhaus-btn-sm bauhaus-btn-danger"
                >
                  Delete Selected
                </button>
              </div>
            </div>
          )}

          <div style={{ overflowX: 'auto' }}>
            <table className="bauhaus-table">
              <thead>
                <tr>
                  <th style={{ width: '48px', textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={selectedTaskIds.length === filtered.length && filtered.length > 0}
                      onChange={handleSelectAll}
                      style={{ cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                    />
                  </th>
                  <th>Task Name</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assignee</th>
                  <th>Due Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(task => (
                  <tr key={task.id}>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedTaskIds.includes(task.id)}
                        onChange={() => handleToggleRow(task.id)}
                        style={{ cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                      />
                    </td>
                    <td>
                      <div
                        onClick={() => onSelectTask(task.id)}
                        className="font-headline"
                        style={{ fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}
                      >
                        {task.title}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                        {task.id} • {task.project}
                      </div>
                    </td>
                    <td>
                      <span className={`bauhaus-badge badge-${task.status}`}>
                        {task.status === 'in-progress' ? 'In Progress' : task.status === 'completed' ? 'Completed' : 'To Do'}
                      </span>
                    </td>
                    <td>
                      <span className={`bauhaus-badge badge-${task.priority}`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                          style={{ width: '26px', height: '26px', border: '2px solid var(--color-outline)', objectFit: 'cover' }}
                        />
                        <span className="font-mono" style={{ fontSize: '0.75rem' }}>{task.assignee.name}</span>
                      </div>
                    </td>
                    <td className="font-mono" style={{ fontSize: '0.8rem' }}>
                      {task.dueLabel}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => onSelectTask(task.id)}
                        className="bauhaus-btn bauhaus-btn-sm"
                        style={{ padding: '0.35rem 0.5rem' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent: Individual Kanban Card
function KanbanCard({ task, onSelectTask, onMove, availableMoves, isCompleted }) {
  return (
    <div className="kanban-card" style={{ opacity: isCompleted ? 0.78 : 1 }}>
      {/* Node Tag */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '12px',
        padding: '0.15rem 0.5rem',
        backgroundColor: 'var(--color-primary-container)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        fontWeight: 700,
        border: '1px solid var(--color-outline)'
      }}>
        {task.node}
      </div>

      {/* Header tags */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span className={`bauhaus-badge badge-${task.priority}`}>
          {task.priority.toUpperCase()} PRIORITY
        </span>
        <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
          {task.dueLabel}
        </span>
      </div>

      {/* Title */}
      <h4 
        onClick={() => onSelectTask(task.id)}
        className="font-headline" 
        style={{ 
          fontSize: '1.1rem', 
          fontWeight: 800, 
          lineHeight: 1.2, 
          marginBottom: '0.5rem',
          cursor: 'pointer',
          textDecoration: isCompleted ? 'line-through' : 'none'
        }}
      >
        {task.title}
      </h4>

      {/* Snippet */}
      <p style={{
        fontSize: '0.8rem',
        color: 'var(--color-text-muted)',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        marginBottom: '1rem',
        lineHeight: 1.4
      }}>
        {task.description.replace(/##|###|-|`/g, '').slice(0, 120)}...
      </p>

      {/* Footer info & Assignee */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.75rem',
        borderTop: '2px solid var(--color-outline-variant)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img
            src={task.assignee.avatar}
            alt={task.assignee.name}
            style={{
              width: '28px',
              height: '28px',
              border: '2px solid var(--color-outline)',
              boxShadow: 'var(--shadow-2)',
              objectFit: 'cover'
            }}
          />
          <span className="font-mono" style={{ fontSize: '0.68rem', backgroundColor: 'var(--bg-surface-low)', padding: '0.2rem 0.4rem', border: '1px solid var(--color-outline)' }}>
            {task.assignee.code}
          </span>
        </div>

        {/* Quick Shift actions */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {availableMoves.map((m, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                onMove(m.target);
              }}
              className="bauhaus-btn bauhaus-btn-sm"
              style={{ fontSize: '0.65rem', padding: '0.25rem 0.4rem' }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
