import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export default function EditTaskModal({ task, onClose, onTaskUpdated, onTaskDeleted }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [dueDate, setDueDate] = useState('');
    const [assigneeName, setAssigneeName] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setPriority(task.priority || 'MEDIUM');
            setDueDate(task.dueDate || '');
            setAssigneeName(task.assigneeName || '');
        }
    }, [task]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.put(`/tasks/${task.id}`, {
                title,
                description,
                priority,
                dueDate: dueDate || null,
                assigneeName: assigneeName.trim() || null
            });
            onTaskUpdated();
            onClose();
        } catch (err) {
            console.error('Failed to update task', err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete "${task.title}"?`)) return;
        setIsDeleting(true);
        try {
            await axiosClient.delete(`/tasks/${task.id}`);
            onTaskDeleted();
            onClose();
        } catch (err) {
            console.error('Failed to delete task', err);
            setIsDeleting(false);
        }
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, color: '#172b4d' }}>Edit Task Card</h3>
                    <button type="button" onClick={onClose} style={closeBtnStyle}>✕</button>
                </div>

                <form onSubmit={handleUpdate}>
                    <label style={labelStyle}>Task Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Description</label>
                    <textarea
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Priority</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle}>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="CRITICAL">Critical</option>
                    </select>

                    <label style={labelStyle}>Assignee Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Alex, Sarah"
                        value={assigneeName}
                        onChange={(e) => setAssigneeName(e.target.value)}
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        style={inputStyle}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px' }}>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            style={btnDeleteStyle}
                        >
                            {isDeleting ? 'Deleting...' : '🗑️ Delete Card'}
                        </button>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button type="button" onClick={onClose} style={btnSecondaryStyle}>
                                Cancel
                            </button>
                            <button type="submit" style={btnPrimaryStyle}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(9, 30, 66, 0.54)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

const modalContentStyle = {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    width: '420px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#5e6c84',
    marginTop: '8px',
    marginBottom: '4px'
};

const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    marginBottom: '6px',
    borderRadius: '4px',
    border: '1px solid #dfe1e6',
    fontSize: '13px',
    boxSizing: 'border-box',
    outline: 'none'
};

const closeBtnStyle = {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#6b778c',
    cursor: 'pointer'
};

const btnPrimaryStyle = {
    backgroundColor: '#0052cc',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '13px'
};

const btnSecondaryStyle = {
    backgroundColor: '#ebecf0',
    color: '#172b4d',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '13px'
};

const btnDeleteStyle = {
    backgroundColor: '#ffebe6',
    color: '#de350b',
    border: '1px solid #ffbdad',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '12px'
};