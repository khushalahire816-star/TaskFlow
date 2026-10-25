import React, { useState, useEffect } from 'react';
import { INITIAL_TASKS } from './data/initialData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TasksMatrix from './components/TasksMatrix';
import TaskDetails from './components/TaskDetails';
import AddTaskModal from './components/AddTaskModal';
import Toast from './components/Toast';

export default function App() {
  // Load tasks from localStorage or use initial data
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskbauhaus_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'tasks' | 'task-details'
  const [selectedTaskId, setSelectedTaskId] = useState('TASK-8842');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [toasts, setToasts] = useState([
    {
      id: 'init-1',
      title: 'Workspace Loaded',
      message: 'TaskBauhaus Command Center synchronized.',
      type: 'info'
    }
  ]);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('taskbauhaus_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [tasks]);

  // Toast Helper
  const showToast = (message, type = 'success', title = '') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast = { id, message, type, title };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Task selection
  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId);
    setActiveView('task-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Task
  const handleAddTask = (taskData) => {
    const newId = `TASK-${Math.floor(1000 + Math.random() * 9000)}`;
    const nodeIndex = tasks.length + 1;
    const node = `NODE_${String(nodeIndex).padStart(2, '0')}`;

    const newTask = {
      id: newId,
      node,
      title: taskData.title,
      project: taskData.project || '#CORE',
      status: 'todo',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate,
      dueLabel: taskData.dueDate ? taskData.dueDate.slice(5) : 'PENDING',
      estimatedHours: 6.0,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      assignee: {
        name: 'Gropius W.',
        code: 'DEV-01',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6bxXSWMLcgfwjU9lFn1o-_B5qF13XHjYITIBB5CmE2JLs_23W921uytUDzrNoddnCoAho4izezLuswqqeA7wNF4rFy4-5rjSFdLeTXnkGVgS_A3ubV8rXPOACf6BmB4ftaEm-gjk0r775ITEoBQpYJp5m-uIuihkFREUBa6fcHaHUCJ7hppxr13uZVijoGsW6475swH4gevUqsC32OUCQHZXPmjfvoCx4ZRP-NtCpXJJENACxz5zq'
      },
      description: taskData.description,
      attachments: [],
      comments: [],
      activity: [
        { id: `act-${Date.now()}`, text: `Task created (${newId})`, meta: 'Just now by Gropius W.', color: 'primary' }
      ]
    };

    setTasks(prev => [newTask, ...prev]);
    showToast(`Task ${newId} created successfully!`, 'success');
  };

  // Update Task
  const handleUpdateTask = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  // Delete Task
  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast(`Task ${taskId} removed.`, 'error');
    if (selectedTaskId === taskId) {
      setActiveView('tasks');
    }
  };

  // Toggle complete
  const handleToggleComplete = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'completed' ? 'todo' : 'completed';
        showToast(`Task ${t.id} marked ${nextStatus}!`, 'success');
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Move task status column (Kanban)
  const handleMoveTaskStatus = (taskId, nextStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        showToast(`Task ${t.id} shifted to ${nextStatus.toUpperCase()}`, 'info');
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Batch actions
  const handleBatchComplete = (taskIds) => {
    setTasks(prev => prev.map(t => taskIds.includes(t.id) ? { ...t, status: 'completed' } : t));
    showToast(`${taskIds.length} tasks marked as completed!`, 'success');
  };

  const handleBatchDelete = (taskIds) => {
    if (confirm(`Delete ${taskIds.length} selected tasks?`)) {
      setTasks(prev => prev.filter(t => !taskIds.includes(t.id)));
      showToast(`${taskIds.length} tasks deleted.`, 'error');
    }
  };

  // Export tasks as JSON
  const handleExportTasks = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `taskbauhaus_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Task registry exported successfully!', 'success');
  };

  // Filter tasks globally if searchQuery exists in Header
  const displayedTasks = tasks.filter(t => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return t.title.toLowerCase().includes(query) ||
           t.id.toLowerCase().includes(query) ||
           t.project.toLowerCase().includes(query);
  });

  const selectedTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        taskCount={tasks.length}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsMobileOpen={setIsMobileOpen}
          onOpenAddTask={() => setIsAddModalOpen(true)}
          notificationsCount={3}
        />

        <main style={{ minHeight: 'calc(100vh - 64px)' }}>
          {activeView === 'dashboard' && (
            <Dashboard
              tasks={displayedTasks}
              onSelectTask={handleSelectTask}
              onOpenAddTask={() => setIsAddModalOpen(true)}
              onToggleComplete={handleToggleComplete}
              onExportTasks={handleExportTasks}
            />
          )}

          {activeView === 'tasks' && (
            <TasksMatrix
              tasks={displayedTasks}
              onSelectTask={handleSelectTask}
              onOpenAddTask={() => setIsAddModalOpen(true)}
              onMoveTaskStatus={handleMoveTaskStatus}
              onBatchComplete={handleBatchComplete}
              onBatchDelete={handleBatchDelete}
            />
          )}

          {activeView === 'task-details' && (
            <TaskDetails
              task={selectedTask}
              onBack={() => setActiveView('tasks')}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={handleAddTask}
      />

      {/* Toast Notification Stack */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
