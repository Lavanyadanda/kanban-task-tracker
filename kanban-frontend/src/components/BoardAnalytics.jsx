import React, { useMemo } from 'react';

export default function BoardAnalytics({ board }) {
    const metrics = useMemo(() => {
        if (!board || !board.columns) return { total: 0, done: 0, critical: 0, percent: 0 };

        let total = 0;
        let doneCount = 0;
        let criticalCount = 0;

        board.columns.forEach((col) => {
            const isDoneCol = col.name.toLowerCase() === 'done';
            col.tasks.forEach((task) => {
                total++;
                if (isDoneCol) doneCount++;
                if (task.priority === 'CRITICAL' || task.priority === 'HIGH') {
                    criticalCount++;
                }
            });
        });

        const percent = total > 0 ? Math.round((doneCount / total) * 100) : 0;
        return { total, done: doneCount, critical: criticalCount, percent };
    }, [board]);

    return (
        <div style={containerStyle}>
            <div style={metricCardStyle}>
                <span style={labelStyle}>Total Tasks</span>
                <span style={valueStyle}>{metrics.total}</span>
            </div>

            <div style={metricCardStyle}>
                <span style={labelStyle}>High / Critical Priority</span>
                <span style={{ ...valueStyle, color: '#de350b' }}>{metrics.critical}</span>
            </div>

            <div style={metricCardStyle}>
                <span style={labelStyle}>Completed (Done)</span>
                <span style={{ ...valueStyle, color: '#36b37e' }}>{metrics.done}</span>
            </div>

            <div style={{ ...metricCardStyle, flex: 1.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={labelStyle}>Board Progress</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#172b4d' }}>{metrics.percent}%</span>
                </div>
                <div style={progressBarContainerStyle}>
                    <div style={{ ...progressBarStyle, width: `${metrics.percent}%` }} />
                </div>
            </div>
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

const metricCardStyle = {
    backgroundColor: '#ffffff',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '140px',
    flex: 1
};

const labelStyle = {
    fontSize: '11px',
    fontWeight: 600,
    color: '#5e6c84',
    textTransform: 'uppercase',
    marginBottom: '4px'
};

const valueStyle = {
    fontSize: '20px',
    fontWeight: 700,
    color: '#172b4d'
};

const progressBarContainerStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: '#dfe1e6',
    borderRadius: '4px',
    overflow: 'hidden'
};

const progressBarStyle = {
    height: '100%',
    backgroundColor: '#36b37e',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
};