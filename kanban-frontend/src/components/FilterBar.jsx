import React from 'react';
import './FilterBar.css';

const PRIORITIES = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

export default function FilterBar({
                                      searchQuery,
                                      onSearchChange,
                                      selectedPriority,
                                      onPriorityChange,
                                      selectedAssignee,
                                      onAssigneeChange,
                                      assignees = [],
                                      onClearFilters
                                  }) {
    const hasActiveFilters = searchQuery !== '' || selectedPriority !== 'ALL' || selectedAssignee !== 'ALL';

    return (
        <div className="filter-bar-container">
            {/* Search Input */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="🔍 Search tasks..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
                {searchQuery && (
                    <button className="clear-search-btn" onClick={() => onSearchChange('')}>
                        ✕
                    </button>
                )}
            </div>

            {/* Priority Chips */}
            <div className="priority-filters">
                <span className="filter-label">Priority:</span>
                {PRIORITIES.map((p) => (
                    <button
                        key={p}
                        type="button"
                        className={`priority-chip chip-${p} ${selectedPriority === p ? 'active' : ''}`}
                        onClick={() => onPriorityChange(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Assignee Filter */}
            <div className="assignee-filter">
                <span className="filter-label">Assignee:</span>
                <select
                    value={selectedAssignee}
                    onChange={(e) => onAssigneeChange(e.target.value)}
                    className="assignee-select"
                >
                    <option value="ALL">All Assignees</option>
                    {assignees.map((a) => (
                        <option key={a} value={a}>
                            {a}
                        </option>
                    ))}
                </select>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
                <button type="button" className="btn-reset-filters" onClick={onClearFilters}>
                    Clear Filters
                </button>
            )}
        </div>
    );
}