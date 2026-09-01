import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function TaskModal({ columnId, onClose, onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/tasks', {
                title,
                description,
                priority,
                dueDate: dueDate || null,
                columnId
            });
            onTaskCreated();
            onClose();
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', width: '380px' }}>
                <h3 style={{ marginTop: 0 }}>Add New Task Card</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                    />
                    <textarea
                        placeholder="Description (Optional)"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                    >
                        <option value="LOW">Low Priority</option>
                        <option value="MEDIUM">Medium Priority</option>
                        <option value="HIGH">High Priority</option>
                        <option value="CRITICAL">Critical Priority</option>
                    </select>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        style={{ width: '100%', padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ backgroundColor: '#ebecf0', color: '#172b4d', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{ backgroundColor: '#0052cc', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}