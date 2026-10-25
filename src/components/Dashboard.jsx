import React, { useState } from 'react';
import { VELOCITY_DATA } from '../data/initialData';

export default function Dashboard({ 
  tasks, 
  onSelectTask, 
  onOpenAddTask, 
  onToggleComplete,
  onExportTasks
}) {
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'pending' | 'completed'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Calculate live dynamic metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const todoTasks = tasks.filter(t => t.status === 'todo').length;
  const pendingTasks = todoTasks + inProgressTasks;
  const overdueTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks for the recent tasks table
  const filteredTasks = tasks.filter(task => {
    if (filterMode === 'pending') return task.status !== 'completed';
    if (filterMode === 'completed') return task.status === 'completed';
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="page-container">
      {/* Top Banner / Title Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{
                padding: '0.2rem 0.5rem',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--on-primary)',
                fontFamily: 'var(--font-headline)',
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                border: '2px solid var(--color-outline)'
              }}>
                SYSTEM // 01
              </span>
              <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
                BAUHAUS_OS v2.4
              </span>
            </div>
            <h1 className="font-headline" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Command Center
            </h1>
          </div>

          <div style={{
            padding: '0.6rem 1.25rem',
            backgroundColor: 'var(--bg-surface-low)',
            border: '2px solid var(--color-outline)',
            boxShadow: 'var(--shadow-4)',
            fontFamily: 'var(--font-headline)',
            fontWeight: 800,
            fontSize: '0.875rem'
          }}>
            ACTIVE_PROJECT: <span style={{ color: 'var(--color-tertiary)' }}>#TASK_BAUHAUS</span>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid-metrics">
        {/* Total Tasks */}
        <div className="bauhaus-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <span className="font-headline" style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
              Total Tasks
            </span>
            <span className="material-symbols-outlined" style={{
              padding: '0.5rem',
              backgroundColor: 'var(--color-primary-container)',
              border: '2px solid var(--color-outline)',
              color: 'var(--on-primary-container)',
              fontSize: '1.25rem'
            }}>
              view_agenda
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="font-headline" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>
              {String(totalTasks).padStart(2, '0')}
            </span>
            <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              100% Capacity
            </span>
          </div>
        </div>

        {/* Pending */}
        <div className="bauhaus-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <span className="font-headline" style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
              Pending
            </span>
            <span className="material-symbols-outlined" style={{
              padding: '0.5rem',
              backgroundColor: 'var(--color-secondary-container)',
              border: '2px solid var(--color-outline)',
              color: 'var(--color-secondary)',
              fontSize: '1.25rem'
            }}>
              hourglass_top
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="font-headline" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: 'var(--color-secondary)' }}>
              {String(pendingTasks).padStart(2, '0')}
            </span>
            <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-secondary)', textTransform: 'uppercase' }}>
              {inProgressTasks} In Flight
            </span>
          </div>
        </div>

        {/* Completed */}
        <div className="bauhaus-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <span className="font-headline" style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
              Completed
            </span>
            <span className="material-symbols-outlined" style={{
              padding: '0.5rem',
              backgroundColor: 'var(--color-tertiary-container)',
              border: '2px solid var(--color-outline)',
              color: 'var(--color-tertiary)',
              fontSize: '1.25rem'
            }}>
              task_alt
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="font-headline" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: 'var(--color-tertiary)' }}>
              {String(completedTasks).padStart(2, '0')}
            </span>
            <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-tertiary)', textTransform: 'uppercase' }}>
              {completionRate}% Rate
            </span>
          </div>
        </div>

        {/* High Priority / Action Required */}
        <div className="bauhaus-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <span className="font-headline" style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
              Urgent / High
            </span>
            <span className="material-symbols-outlined" style={{
              padding: '0.5rem',
              backgroundColor: 'var(--color-error-container)',
              border: '2px solid var(--color-outline)',
              color: 'var(--color-error)',
              fontSize: '1.25rem'
            }}>
              warning
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="font-headline" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: 'var(--color-error)' }}>
              {String(overdueTasks).padStart(2, '0')}
            </span>
            <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-error)', textTransform: 'uppercase' }}>
              Action Req.
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions & Velocity Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Quick Action Banner Card */}
        <div style={{
          backgroundColor: 'var(--color-primary-container)',
          border: '2px solid var(--color-outline)',
          boxShadow: 'var(--shadow-8)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            right: '-1.5rem',
            bottom: '-2rem',
            fontSize: '10rem',
            fontFamily: 'var(--font-headline)',
            fontWeight: 900,
            color: 'rgba(26, 26, 26, 0.08)',
            pointerEvents: 'none',
            userSelect: 'none'
          }}>
            ⚡
          </div>

          <div>
            <span style={{
              padding: '0.25rem 0.6rem',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--on-primary)',
              fontFamily: 'var(--font-headline)',
              fontSize: '0.7rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              border: '2px solid var(--color-outline)',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              Action Panel
            </span>
            <h2 className="font-headline" style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '0.75rem' }}>
              Execute New Task
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(26, 26, 26, 0.8)', marginBottom: '2rem', maxWidth: '380px' }}>
              Deploy new directives immediately into the pipeline. Assign priority, tags, assignees, and deadlines.
            </p>
          </div>

          <button
            onClick={onOpenAddTask}
            className="bauhaus-btn bauhaus-btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '0.9rem' }}
          >
            <span className="material-symbols-outlined">add_box</span>
            Create New Task
          </button>
        </div>

        {/* Activity Summary Velocity Chart */}
        <div className="bauhaus-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '0.75rem' }}>
              <div>
                <span className="font-headline" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                  Analytics // Output
                </span>
                <h3 className="font-headline" style={{ fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  Weekly Velocity
                </h3>
              </div>
              <span style={{
                padding: '0.25rem 0.6rem',
                backgroundColor: 'var(--bg-surface-low)',
                border: '2px solid var(--color-outline)',
                fontFamily: 'var(--font-headline)',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                MON - SUN
              </span>
            </div>

            {/* Geometric Bar Chart Visualization */}
            <div className="velocity-chart">
              {VELOCITY_DATA.map((item, idx) => (
                <div key={idx} className="velocity-bar-col">
                  <span className="velocity-value">{item.count}</span>
                  <div
                    className="velocity-bar"
                    style={{
                      height: `${item.heightPct}%`,
                      backgroundColor: item.color
                    }}
                    title={`${item.label}: ${item.count} tasks`}
                  />
                  <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-headline)', fontWeight: 800, color: 'var(--color-text-muted)' }}>
            <span>PEAK_OUTPUT: THURSDAY</span>
            <span>AVG_DAILY: 5.1 TASKS</span>
          </div>
        </div>
      </div>

      {/* Recent Tasks Live Feed */}
      <div className="bauhaus-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid var(--color-outline)', gap: '1rem' }}>
          <div>
            <span className="font-headline" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
              Registry // Live Feed
            </span>
            <h3 className="font-headline" style={{ fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
              Recent Tasks
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => setFilterMode(filterMode === 'all' ? 'pending' : filterMode === 'pending' ? 'completed' : 'all')}
              className="bauhaus-btn bauhaus-btn-sm"
            >
              Filter: {filterMode.toUpperCase()}
            </button>
            <button 
              onClick={onExportTasks}
              className="bauhaus-btn bauhaus-btn-sm"
            >
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="bauhaus-table">
            <thead>
              <tr>
                <th>Task Identifier</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div 
                      onClick={() => onSelectTask(task.id)}
                      className="font-headline" 
                      style={{ fontWeight: 800, fontSize: '1rem', cursor: 'pointer', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}
                    >
                      {task.title}
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                      Project: {task.project} • {task.id}
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
                  <td className="font-headline" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    {task.dueLabel}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => onSelectTask(task.id)}
                        className="bauhaus-btn bauhaus-btn-sm"
                        style={{ padding: '0.35rem 0.5rem' }}
                        title="View Details"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>visibility</span>
                      </button>
                      <button
                        onClick={() => onToggleComplete(task.id)}
                        className={`bauhaus-btn bauhaus-btn-sm ${task.status === 'completed' ? '' : 'bauhaus-btn-accent'}`}
                        style={{ padding: '0.35rem 0.5rem' }}
                        title={task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                          {task.status === 'completed' ? 'undo' : 'check'}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid var(--color-outline)', gap: '1rem' }}>
          <span className="font-headline" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            Showing {paginatedTasks.length} of {filteredTasks.length} entries
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="bauhaus-btn bauhaus-btn-sm"
              style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`bauhaus-btn bauhaus-btn-sm ${currentPage === i + 1 ? 'bauhaus-btn-accent' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="bauhaus-btn bauhaus-btn-sm"
              style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
