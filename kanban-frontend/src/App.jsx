import React from 'react';
import BoardView from './components/BoardView';

export default function App() {
  return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f4f5f7' }}>
        <header style={{
          backgroundColor: '#0052cc',
          padding: '14px 24px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '18px', margin: 0 }}>Task Tracker — Kanban Board</h1>
        </header>

        <main>
          <BoardView />
        </main>
      </div>
  );
}