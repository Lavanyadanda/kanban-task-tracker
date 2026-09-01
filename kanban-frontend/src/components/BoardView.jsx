// import React, { useState, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import axiosClient from '../api/axiosClient';
// import TaskModal from './TaskModal';
//
// const priorityColors = {
//     LOW: '#6c757d',
//     MEDIUM: '#0d6efd',
//     HIGH: '#fd7e14',
//     CRITICAL: '#dc3545'
// };
//
// export default function BoardView() {
//     const [board, setBoard] = useState(null);
//     const [activeColumnId, setActiveColumnId] = useState(null);
//
//     useEffect(() => {
//         loadBoard();
//     }, []);
//
//     const loadBoard = async () => {
//         try {
//             const res = await axiosClient.get('/boards');
//             if (res.data && res.data.length > 0) {
//                 setBoard(res.data[0]);
//             }
//         } catch (err) {
//             console.error('Failed to load board details', err);
//         }
//     };
//
//     const handleDragEnd = async (result) => {
//         const { source, destination, draggableId } = result;
//         if (!destination) return;
//         if (source.droppableId === destination.droppableId && source.index === destination.index) return;
//
//         const sourceColIndex = board.columns.findIndex(c => c.id.toString() === source.droppableId);
//         const destColIndex = board.columns.findIndex(c => c.id.toString() === destination.droppableId);
//
//         const sourceCol = board.columns[sourceColIndex];
//         const destCol = board.columns[destColIndex];
//
//         const sourceTasks = Array.from(sourceCol.tasks);
//         const [movedTask] = sourceTasks.splice(source.index, 1);
//
//         const updatedColumns = [...board.columns];
//
//         if (source.droppableId === destination.droppableId) {
//             sourceTasks.splice(destination.index, 0, movedTask);
//             updatedColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
//         } else {
//             const destTasks = Array.from(destCol.tasks);
//             destTasks.splice(destination.index, 0, { ...movedTask, columnId: destCol.id });
//             updatedColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
//             updatedColumns[destColIndex] = { ...destCol, tasks: destTasks };
//         }
//
//         setBoard({ ...board, columns: updatedColumns });
//
//         try {
//             await axiosClient.patch(`/tasks/${draggableId}/move`, {
//                 targetColumnId: parseInt(destination.droppableId),
//                 newPosition: destination.index
//             });
//         } catch (err) {
//             console.error('Failed to sync state with backend, reloading...', err);
//             loadBoard();
//         }
//     };
//
//     if (!board) return <div style={{ padding: '24px' }}>Loading board data from API...</div>;
//
//     return (
//         <div style={{ padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
//             <h2 style={{ marginBottom: '20px' }}>{board.title}</h2>
//
//             <DragDropContext onDragEnd={handleDragEnd}>
//                 <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', overflowX: 'auto' }}>
//                     {board.columns.map((column) => (
//                         <div key={column.id} style={{
//                             backgroundColor: '#ebecf0',
//                             width: '280px',
//                             minWidth: '280px',
//                             borderRadius: '8px',
//                             padding: '12px'
//                         }}>
//                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
//                                 <strong style={{ color: '#5e6c84' }}>{column.name.toUpperCase()}</strong>
//                                 <span style={{ color: '#5e6c84' }}>{column.tasks.length}</span>
//                             </div>
//
//                             <Droppable droppableId={column.id.toString()}>
//                                 {(provided, snapshot) => (
//                                     <div
//                                         ref={provided.innerRef}
//                                         {...provided.droppableProps}
//                                         style={{
//                                             minHeight: '120px',
//                                             backgroundColor: snapshot.isDraggingOver ? '#dfe1e6' : 'transparent',
//                                             borderRadius: '4px',
//                                             transition: 'background-color 0.2s ease'
//                                         }}
//                                     >
//                                         {column.tasks.map((task, index) => (
//                                             <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
//                                                 {(provided, snapshot) => (
//                                                     <div
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         style={{
//                                                             ...provided.draggableProps.style,
//                                                             backgroundColor: '#ffffff',
//                                                             padding: '12px',
//                                                             borderRadius: '6px',
//                                                             marginBottom: '8px',
//                                                             boxShadow: snapshot.isDragging
//                                                                 ? '0 8px 16px rgba(0,0,0,0.2)'
//                                                                 : '0 1px 3px rgba(0,0,0,0.12)',
//                                                             cursor: 'grab'
//                                                         }}
//                                                     >
//                                                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
//                               <span style={{
//                                   backgroundColor: priorityColors[task.priority] || '#6c757d',
//                                   color: '#fff',
//                                   fontSize: '10px',
//                                   padding: '2px 6px',
//                                   borderRadius: '4px',
//                                   fontWeight: 'bold'
//                               }}>
//                                 {task.priority}
//                               </span>
//                                                             {task.dueDate && <span style={{ fontSize: '11px', color: '#6b778c' }}>{task.dueDate}</span>}
//                                                         </div>
//                                                         <h4 style={{ margin: '4px 0 6px 0', fontSize: '14px' }}>{task.title}</h4>
//                                                         {task.description && <p style={{ fontSize: '12px', color: '#5e6c84', margin: 0 }}>{task.description}</p>}
//                                                     </div>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//
//                             <button
//                                 onClick={() => setActiveColumnId(column.id)}
//                                 style={{
//                                     width: '100%',
//                                     padding: '8px',
//                                     marginTop: '8px',
//                                     background: 'transparent',
//                                     border: 'none',
//                                     textAlign: 'left',
//                                     color: '#5e6c84',
//                                     cursor: 'pointer',
//                                     borderRadius: '4px'
//                                 }}
//                             >
//                                 + Add Task
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </DragDropContext>
//
//             {activeColumnId && (
//                 <TaskModal
//                     columnId={activeColumnId}
//                     onClose={() => setActiveColumnId(null)}
//                     onTaskCreated={loadBoard}
//                 />
//             )}
//         </div>
//     );
// }


//
// import React, { useState, useEffect, useMemo } from 'react';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import axiosClient from '../api/axiosClient';
// import TaskModal from './TaskModal';
// import FilterBar from './FilterBar';
//
// const priorityColors = {
//     LOW: '#6c757d',
//     MEDIUM: '#0d6efd',
//     HIGH: '#fd7e14',
//     CRITICAL: '#dc3545'
// };
//
// export default function BoardView() {
//     const [board, setBoard] = useState(null);
//     const [activeColumnId, setActiveColumnId] = useState(null);
//
//     // Filter States
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedPriority, setSelectedPriority] = useState('ALL');
//     const [selectedAssignee, setSelectedAssignee] = useState('ALL');
//
//     useEffect(() => {
//         loadBoard();
//     }, []);
//
//     const loadBoard = async () => {
//         try {
//             const res = await axiosClient.get('/boards');
//             if (res.data && res.data.length > 0) {
//                 setBoard(res.data[0]);
//             }
//         } catch (err) {
//             console.error('Failed to load board details', err);
//         }
//     };
//
//     // Collect unique assignees for the dropdown
//     const uniqueAssignees = useMemo(() => {
//         if (!board) return [];
//         const set = new Set();
//         board.columns.forEach((col) => {
//             col.tasks.forEach((task) => {
//                 if (task.assigneeName) set.add(task.assigneeName);
//             });
//         });
//         return Array.from(set);
//     }, [board]);
//
//     // Compute filtered columns and tasks
//     const filteredColumns = useMemo(() => {
//         if (!board) return [];
//
//         return board.columns.map((column) => {
//             const filteredTasks = column.tasks.filter((task) => {
//                 // Keyword Search Filter
//                 const query = searchQuery.toLowerCase();
//                 const matchesQuery =
//                     !query ||
//                     task.title.toLowerCase().includes(query) ||
//                     (task.description && task.description.toLowerCase().includes(query));
//
//                 // Priority Filter
//                 const matchesPriority =
//                     selectedPriority === 'ALL' || task.priority === selectedPriority;
//
//                 // Assignee Filter
//                 const matchesAssignee =
//                     selectedAssignee === 'ALL' || task.assigneeName === selectedAssignee;
//
//                 return matchesQuery && matchesPriority && matchesAssignee;
//             });
//
//             return {
//                 ...column,
//                 tasks: filteredTasks
//             };
//         });
//     }, [board, searchQuery, selectedPriority, selectedAssignee]);
//
//     const handleClearFilters = () => {
//         setSearchQuery('');
//         setSelectedPriority('ALL');
//         setSelectedAssignee('ALL');
//     };
//
//     const handleDragEnd = async (result) => {
//         const { source, destination, draggableId } = result;
//         if (!destination) return;
//         if (source.droppableId === destination.droppableId && source.index === destination.index) return;
//
//         const sourceColIndex = board.columns.findIndex((c) => c.id.toString() === source.droppableId);
//         const destColIndex = board.columns.findIndex((c) => c.id.toString() === destination.droppableId);
//
//         const sourceCol = board.columns[sourceColIndex];
//         const destCol = board.columns[destColIndex];
//
//         const sourceTasks = Array.from(sourceCol.tasks);
//         const [movedTask] = sourceTasks.splice(source.index, 1);
//
//         const updatedColumns = [...board.columns];
//
//         if (source.droppableId === destination.droppableId) {
//             sourceTasks.splice(destination.index, 0, movedTask);
//             updatedColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
//         } else {
//             const destTasks = Array.from(destCol.tasks);
//             destTasks.splice(destination.index, 0, { ...movedTask, columnId: destCol.id });
//             updatedColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
//             updatedColumns[destColIndex] = { ...destCol, tasks: destTasks };
//         }
//
//         setBoard({ ...board, columns: updatedColumns });
//
//         try {
//             await axiosClient.patch(`/tasks/${draggableId}/move`, {
//                 targetColumnId: parseInt(destination.droppableId),
//                 newPosition: destination.index
//             });
//         } catch (err) {
//             console.error('Failed to sync state with backend, reloading...', err);
//             loadBoard();
//         }
//     };
//
//     if (!board) return <div style={{ padding: '24px' }}>Loading board data from API...</div>;
//
//     return (
//         <div style={{ padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
//             <h2 style={{ marginBottom: '16px' }}>{board.title}</h2>
//
//             {/* Filter Bar */}
//             <FilterBar
//                 searchQuery={searchQuery}
//                 onSearchChange={setSearchQuery}
//                 selectedPriority={selectedPriority}
//                 onPriorityChange={setSelectedPriority}
//                 selectedAssignee={selectedAssignee}
//                 onAssigneeChange={setSelectedAssignee}
//                 assignees={uniqueAssignees}
//                 onClearFilters={handleClearFilters}
//             />
//
//             {/* Drag and Drop Canvas */}
//             <DragDropContext onDragEnd={handleDragEnd}>
//                 <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', overflowX: 'auto' }}>
//                     {filteredColumns.map((column) => (
//                         <div
//                             key={column.id}
//                             style={{
//                                 backgroundColor: '#ebecf0',
//                                 width: '280px',
//                                 minWidth: '280px',
//                                 borderRadius: '8px',
//                                 padding: '12px'
//                             }}
//                         >
//                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
//                                 <strong style={{ color: '#5e6c84' }}>{column.name.toUpperCase()}</strong>
//                                 <span style={{ color: '#5e6c84' }}>{column.tasks.length}</span>
//                             </div>
//
//                             <Droppable droppableId={column.id.toString()}>
//                                 {(provided, snapshot) => (
//                                     <div
//                                         ref={provided.innerRef}
//                                         {...provided.droppableProps}
//                                         style={{
//                                             minHeight: '120px',
//                                             backgroundColor: snapshot.isDraggingOver ? '#dfe1e6' : 'transparent',
//                                             borderRadius: '4px',
//                                             transition: 'background-color 0.2s ease'
//                                         }}
//                                     >
//                                         {column.tasks.map((task, index) => (
//                                             <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
//                                                 {(provided, snapshot) => (
//                                                     <div
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         style={{
//                                                             ...provided.draggableProps.style,
//                                                             backgroundColor: '#ffffff',
//                                                             padding: '12px',
//                                                             borderRadius: '6px',
//                                                             marginBottom: '8px',
//                                                             boxShadow: snapshot.isDragging
//                                                                 ? '0 8px 16px rgba(0,0,0,0.2)'
//                                                                 : '0 1px 3px rgba(0,0,0,0.12)',
//                                                             cursor: 'grab'
//                                                         }}
//                                                     >
//                                                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
//                               <span
//                                   style={{
//                                       backgroundColor: priorityColors[task.priority] || '#6c757d',
//                                       color: '#fff',
//                                       fontSize: '10px',
//                                       padding: '2px 6px',
//                                       borderRadius: '4px',
//                                       fontWeight: 'bold'
//                                   }}
//                               >
//                                 {task.priority}
//                               </span>
//                                                             {task.dueDate && <span style={{ fontSize: '11px', color: '#6b778c' }}>{task.dueDate}</span>}
//                                                         </div>
//                                                         <h4 style={{ margin: '4px 0 6px 0', fontSize: '14px' }}>{task.title}</h4>
//                                                         {task.description && (
//                                                             <p style={{ fontSize: '12px', color: '#5e6c84', margin: '0 0 6px 0' }}>{task.description}</p>
//                                                         )}
//                                                         {task.assigneeName && (
//                                                             <div style={{ fontSize: '11px', color: '#0052cc', fontWeight: 600 }}>
//                                                                 👤 {task.assigneeName}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//
//                             <button
//                                 onClick={() => setActiveColumnId(column.id)}
//                                 style={{
//                                     width: '100%',
//                                     padding: '8px',
//                                     marginTop: '8px',
//                                     background: 'transparent',
//                                     border: 'none',
//                                     textAlign: 'left',
//                                     color: '#5e6c84',
//                                     cursor: 'pointer',
//                                     borderRadius: '4px'
//                                 }}
//                             >
//                                 + Add Task
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </DragDropContext>
//
//             {activeColumnId && (
//                 <TaskModal
//                     columnId={activeColumnId}
//                     onClose={() => setActiveColumnId(null)}
//                     onTaskCreated={loadBoard}
//                 />
//             )}
//         </div>
//     );
// }



// import React, { useState, useEffect, useMemo } from 'react';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import axiosClient from '../api/axiosClient';
// import TaskModal from './TaskModal';
// import EditTaskModal from './EditTaskModal';
// import FilterBar from './FilterBar';
//
// const priorityColors = {
//     LOW: '#6c757d',
//     MEDIUM: '#0d6efd',
//     HIGH: '#fd7e14',
//     CRITICAL: '#dc3545'
// };
//
// export default function BoardView() {
//     const [board, setBoard] = useState(null);
//     const [activeColumnId, setActiveColumnId] = useState(null);
//     const [editingTask, setEditingTask] = useState(null);
//
//     // Filter States
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedPriority, setSelectedPriority] = useState('ALL');
//     const [selectedAssignee, setSelectedAssignee] = useState('ALL');
//
//     useEffect(() => {
//         loadBoard();
//     }, []);
//
//     const loadBoard = async () => {
//         try {
//             const res = await axiosClient.get('/boards');
//             if (res.data && res.data.length > 0) {
//                 setBoard(res.data[0]);
//             }
//         } catch (err) {
//             console.error('Failed to load board details', err);
//         }
//     };
//
//     const uniqueAssignees = useMemo(() => {
//         if (!board) return [];
//         const set = new Set();
//         board.columns.forEach((col) => {
//             col.tasks.forEach((task) => {
//                 if (task.assigneeName) set.add(task.assigneeName);
//             });
//         });
//         return Array.from(set);
//     }, [board]);
//
//     const filteredColumns = useMemo(() => {
//         if (!board) return [];
//
//         return board.columns.map((column) => {
//             const filteredTasks = column.tasks.filter((task) => {
//                 const query = searchQuery.toLowerCase();
//                 const matchesQuery =
//                     !query ||
//                     task.title.toLowerCase().includes(query) ||
//                     (task.description && task.description.toLowerCase().includes(query));
//
//                 const matchesPriority =
//                     selectedPriority === 'ALL' || task.priority === selectedPriority;
//
//                 const matchesAssignee =
//                     selectedAssignee === 'ALL' || task.assigneeName === selectedAssignee;
//
//                 return matchesQuery && matchesPriority && matchesAssignee;
//             });
//
//             return {
//                 ...column,
//                 tasks: filteredTasks
//             };
//         });
//     }, [board, searchQuery, selectedPriority, selectedAssignee]);
//
//     const handleClearFilters = () => {
//         setSearchQuery('');
//         setSelectedPriority('ALL');
//         setSelectedAssignee('ALL');
//     };
//
//     const handleDragEnd = async (result) => {
//         const { source, destination, draggableId } = result;
//         if (!destination) return;
//         if (source.droppableId === destination.droppableId && source.index === destination.index) return;
//
//         const sourceColIndex = board.columns.findIndex((c) => c.id.toString() === source.droppableId);
//         const destColIndex = board.columns.findIndex((c) => c.id.toString() === destination.droppableId);
//
//         const sourceCol = board.columns[sourceColIndex];
//         const destCol = board.columns[destColIndex];
//
//         const sourceTasks = Array.from(sourceCol.tasks);
//         const [movedTask] = sourceTasks.splice(source.index, 1);
//
//         const updatedColumns = [...board.columns];
//
//         if (source.droppableId === destination.droppableId) {
//             sourceTasks.splice(destination.index, 0, movedTask);
//             updatedColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
//         } else {
//             const destTasks = Array.from(destCol.tasks);
//             destTasks.splice(destination.index, 0, { ...movedTask, columnId: destCol.id });
//             updatedColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
//             updatedColumns[destColIndex] = { ...destCol, tasks: destTasks };
//         }
//
//         setBoard({ ...board, columns: updatedColumns });
//
//         try {
//             await axiosClient.patch(`/tasks/${draggableId}/move`, {
//                 targetColumnId: parseInt(destination.droppableId),
//                 newPosition: destination.index
//             });
//         } catch (err) {
//             console.error('Failed to sync state with backend, reloading...', err);
//             loadBoard();
//         }
//     };
//
//     if (!board) return <div style={{ padding: '24px' }}>Loading board data from API...</div>;
//
//     return (
//         <div style={{ padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
//             <h2 style={{ marginBottom: '16px' }}>{board.title}</h2>
//
//             <FilterBar
//                 searchQuery={searchQuery}
//                 onSearchChange={setSearchQuery}
//                 selectedPriority={selectedPriority}
//                 onPriorityChange={setSelectedPriority}
//                 selectedAssignee={selectedAssignee}
//                 onAssigneeChange={setSelectedAssignee}
//                 assignees={uniqueAssignees}
//                 onClearFilters={handleClearFilters}
//             />
//
//             <DragDropContext onDragEnd={handleDragEnd}>
//                 <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', overflowX: 'auto' }}>
//                     {filteredColumns.map((column) => (
//                         <div
//                             key={column.id}
//                             style={{
//                                 backgroundColor: '#ebecf0',
//                                 width: '280px',
//                                 minWidth: '280px',
//                                 borderRadius: '8px',
//                                 padding: '12px'
//                             }}
//                         >
//                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
//                                 <strong style={{ color: '#5e6c84' }}>{column.name.toUpperCase()}</strong>
//                                 <span style={{ color: '#5e6c84' }}>{column.tasks.length}</span>
//                             </div>
//
//                             <Droppable droppableId={column.id.toString()}>
//                                 {(provided, snapshot) => (
//                                     <div
//                                         ref={provided.innerRef}
//                                         {...provided.droppableProps}
//                                         style={{
//                                             minHeight: '120px',
//                                             backgroundColor: snapshot.isDraggingOver ? '#dfe1e6' : 'transparent',
//                                             borderRadius: '4px',
//                                             transition: 'background-color 0.2s ease'
//                                         }}
//                                     >
//                                         {column.tasks.map((task, index) => (
//                                             <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
//                                                 {(provided, snapshot) => (
//                                                     <div
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         onClick={() => setEditingTask(task)}
//                                                         style={{
//                                                             ...provided.draggableProps.style,
//                                                             backgroundColor: '#ffffff',
//                                                             padding: '12px',
//                                                             borderRadius: '6px',
//                                                             marginBottom: '8px',
//                                                             boxShadow: snapshot.isDragging
//                                                                 ? '0 8px 16px rgba(0,0,0,0.2)'
//                                                                 : '0 1px 3px rgba(0,0,0,0.12)',
//                                                             cursor: 'pointer'
//                                                         }}
//                                                     >
//                                                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
//                               <span
//                                   style={{
//                                       backgroundColor: priorityColors[task.priority] || '#6c757d',
//                                       color: '#fff',
//                                       fontSize: '10px',
//                                       padding: '2px 6px',
//                                       borderRadius: '4px',
//                                       fontWeight: 'bold'
//                                   }}
//                               >
//                                 {task.priority}
//                               </span>
//                                                             {task.dueDate && <span style={{ fontSize: '11px', color: '#6b778c' }}>{task.dueDate}</span>}
//                                                         </div>
//                                                         <h4 style={{ margin: '4px 0 6px 0', fontSize: '14px' }}>{task.title}</h4>
//                                                         {task.description && (
//                                                             <p style={{ fontSize: '12px', color: '#5e6c84', margin: '0 0 6px 0' }}>{task.description}</p>
//                                                         )}
//                                                         {task.assigneeName && (
//                                                             <div style={{ fontSize: '11px', color: '#0052cc', fontWeight: 600 }}>
//                                                                 👤 {task.assigneeName}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//
//                             <button
//                                 onClick={() => setActiveColumnId(column.id)}
//                                 style={{
//                                     width: '100%',
//                                     padding: '8px',
//                                     marginTop: '8px',
//                                     background: 'transparent',
//                                     border: 'none',
//                                     textAlign: 'left',
//                                     color: '#5e6c84',
//                                     cursor: 'pointer',
//                                     borderRadius: '4px'
//                                 }}
//                             >
//                                 + Add Task
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </DragDropContext>
//
//             {/* Create Task Modal */}
//             {activeColumnId && (
//                 <TaskModal
//                     columnId={activeColumnId}
//                     onClose={() => setActiveColumnId(null)}
//                     onTaskCreated={loadBoard}
//                 />
//             )}
//
//             {/* Edit Task Modal */}
//             {editingTask && (
//                 <EditTaskModal
//                     task={editingTask}
//                     onClose={() => setEditingTask(null)}
//                     onTaskUpdated={loadBoard}
//                     onTaskDeleted={loadBoard}
//                 />
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axiosClient from '../api/axiosClient';
import TaskModal from './TaskModal';
import EditTaskModal from './EditTaskModal';
import FilterBar from './FilterBar';
import BoardAnalytics from './BoardAnalytics';
const priorityColors = {
    LOW: '#6c757d',
    MEDIUM: '#0d6efd',
    HIGH: '#fd7e14',
    CRITICAL: '#dc3545'
};

const getDueDateStatus = (dueDateStr, columnName) => {
    if (!dueDateStr) return null;
    if (columnName && columnName.toLowerCase() === 'done') {
        return { label: `Due: ${dueDateStr}`, color: '#6b778c', bg: '#f4f5f7' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDateStr);
    due.setHours(0, 0, 0, 0);

    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return { label: `⚠️ Overdue (${dueDateStr})`, color: '#de350b', bg: '#ffebe6' };
    } else if (diffDays === 0) {
        return { label: `⚡ Due Today`, color: '#ff8b00', bg: '#fffae6' };
    } else if (diffDays === 1) {
        return { label: `⏰ Due Tomorrow`, color: '#0052cc', bg: '#deebff' };
    }
    return { label: `Due: ${dueDateStr}`, color: '#6b778c', bg: '#f4f5f7' };
};

export default function BoardView() {
    const [board, setBoard] = useState(null);
    const [activeColumnId, setActiveColumnId] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('ALL');
    const [selectedAssignee, setSelectedAssignee] = useState('ALL');

    useEffect(() => {
        loadBoard();
    }, []);

    const loadBoard = async () => {
        try {
            const res = await axiosClient.get('/boards');
            if (res.data && res.data.length > 0) {
                setBoard(res.data[0]);
            }
        } catch (err) {
            console.error('Failed to load board details', err);
        }
    };

    const uniqueAssignees = useMemo(() => {
        if (!board) return [];
        const set = new Set();
        board.columns.forEach((col) => {
            col.tasks.forEach((task) => {
                if (task.assigneeName) set.add(task.assigneeName);
            });
        });
        return Array.from(set);
    }, [board]);

    const filteredColumns = useMemo(() => {
        if (!board) return [];

        return board.columns.map((column) => {
            const filteredTasks = column.tasks.filter((task) => {
                const query = searchQuery.toLowerCase();
                const matchesQuery =
                    !query ||
                    task.title.toLowerCase().includes(query) ||
                    (task.description && task.description.toLowerCase().includes(query));

                const matchesPriority =
                    selectedPriority === 'ALL' || task.priority === selectedPriority;

                const matchesAssignee =
                    selectedAssignee === 'ALL' || task.assigneeName === selectedAssignee;

                return matchesQuery && matchesPriority && matchesAssignee;
            });

            return {
                ...column,
                tasks: filteredTasks
            };
        });
    }, [board, searchQuery, selectedPriority, selectedAssignee]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedPriority('ALL');
        setSelectedAssignee('ALL');
    };

    const handleDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceColIndex = board.columns.findIndex((c) => c.id.toString() === source.droppableId);
        const destColIndex = board.columns.findIndex((c) => c.id.toString() === destination.droppableId);

        const sourceCol = board.columns[sourceColIndex];
        const destCol = board.columns[destColIndex];

        const sourceTasks = Array.from(sourceCol.tasks);
        const [movedTask] = sourceTasks.splice(source.index, 1);

        const updatedColumns = [...board.columns];

        if (source.droppableId === destination.droppableId) {
            sourceTasks.splice(destination.index, 0, movedTask);
            updatedColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
        } else {
            const destTasks = Array.from(destCol.tasks);
            destTasks.splice(destination.index, 0, { ...movedTask, columnId: destCol.id });
            updatedColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
            updatedColumns[destColIndex] = { ...destCol, tasks: destTasks };
        }

        setBoard({ ...board, columns: updatedColumns });

        try {
            await axiosClient.patch(`/tasks/${draggableId}/move`, {
                targetColumnId: parseInt(destination.droppableId),
                newPosition: destination.index
            });
        } catch (err) {
            console.error('Failed to sync state with backend, reloading...', err);
            loadBoard();
        }
    };

    if (!board) return <div style={{ padding: '24px' }}>Loading board data from API...</div>;

    return (
        <div style={{ padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <h2 style={{ marginBottom: '16px' }}>{board.title}</h2>
            <BoardAnalytics board={board} />
            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedPriority={selectedPriority}
                onPriorityChange={setSelectedPriority}
                selectedAssignee={selectedAssignee}
                onAssigneeChange={setSelectedAssignee}
                assignees={uniqueAssignees}
                onClearFilters={handleClearFilters}
            />

            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', overflowX: 'auto' }}>
                    {filteredColumns.map((column) => (
                        <div
                            key={column.id}
                            style={{
                                backgroundColor: '#ebecf0',
                                width: '280px',
                                minWidth: '280px',
                                borderRadius: '8px',
                                padding: '12px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <strong style={{ color: '#5e6c84' }}>{column.name.toUpperCase()}</strong>
                                <span style={{ color: '#5e6c84' }}>{column.tasks.length}</span>
                            </div>

                            <Droppable droppableId={column.id.toString()}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            minHeight: '120px',
                                            backgroundColor: snapshot.isDraggingOver ? '#dfe1e6' : 'transparent',
                                            borderRadius: '4px',
                                            transition: 'background-color 0.2s ease'
                                        }}
                                    >
                                        {column.tasks.map((task, index) => {
                                            const dueStatus = getDueDateStatus(task.dueDate, column.name);

                                            return (
                                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            onClick={() => setEditingTask(task)}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                backgroundColor: '#ffffff',
                                                                padding: '12px',
                                                                borderRadius: '6px',
                                                                marginBottom: '8px',
                                                                boxShadow: snapshot.isDragging
                                                                    ? '0 8px 16px rgba(0,0,0,0.2)'
                                                                    : '0 1px 3px rgba(0,0,0,0.12)',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <span
                                    style={{
                                        backgroundColor: priorityColors[task.priority] || '#6c757d',
                                        color: '#fff',
                                        fontSize: '10px',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                  {task.priority}
                                </span>

                                                                {dueStatus && (
                                                                    <span style={{
                                                                        fontSize: '10px',
                                                                        fontWeight: 600,
                                                                        color: dueStatus.color,
                                                                        backgroundColor: dueStatus.bg,
                                                                        padding: '2px 6px',
                                                                        borderRadius: '4px'
                                                                    }}>
                                    {dueStatus.label}
                                  </span>
                                                                )}
                                                            </div>

                                                            <h4 style={{ margin: '4px 0 6px 0', fontSize: '14px' }}>{task.title}</h4>
                                                            {task.description && (
                                                                <p style={{ fontSize: '12px', color: '#5e6c84', margin: '0 0 6px 0' }}>{task.description}</p>
                                                            )}
                                                            {task.assigneeName && (
                                                                <div style={{ fontSize: '11px', color: '#0052cc', fontWeight: 600 }}>
                                                                    👤 {task.assigneeName}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            <button
                                onClick={() => setActiveColumnId(column.id)}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginTop: '8px',
                                    background: 'transparent',
                                    border: 'none',
                                    textAlign: 'left',
                                    color: '#5e6c84',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                + Add Task
                            </button>
                        </div>
                    ))}
                </div>
            </DragDropContext>

            {/* Create Task Modal */}
            {activeColumnId && (
                <TaskModal
                    columnId={activeColumnId}
                    onClose={() => setActiveColumnId(null)}
                    onTaskCreated={loadBoard}
                />
            )}

            {/* Edit Task Modal */}
            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onTaskUpdated={loadBoard}
                    onTaskDeleted={loadBoard}
                />
            )}
        </div>
    );
}