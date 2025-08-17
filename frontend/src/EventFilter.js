import React, { useState } from 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js';

const EventFilter = ({ events, onDateRangeChange, onEventChange }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onDateRangeChange(startDate, endDate);
    };

    const handleEventSelect = (e) => {
        setSelectedEvent(e.target.value);
        onEventChange(e.target.value);
    };

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-2">Filter Data</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select Event</label>
                <select
                    className="w-full p-2 border rounded"
                    value={selectedEvent}
                    onChange={handleEventSelect}
                >
                    <option value="">All Events</option>
                    {events.map(e => (
                        <option key={e.Date} value={e['Event Description']}>
                            {e['Event Description']}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleSubmit}
            >
                Apply Filters
            </button>
        </div>
    );
};

export default EventFilter;