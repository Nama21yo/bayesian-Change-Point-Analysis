import React, { useState, useEffect } from 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js';
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/dist/axios.min.js';
import PriceChart from './components/PriceChart.js';
import EventFilter from './components/EventFilter.js';
import MetricsPanel from './components/MetricsPanel.js';

const App = () => {
    const [prices, setPrices] = useState([]);
    const [events, setEvents] = useState([]);
    const [summary, setSummary] = useState([]);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [selectedEvent, setSelectedEvent] = useState('');

    useEffect(() => {
        // Fetch data from Flask API
        axios.get('http://localhost:5000/api/prices')
            .then(response => setPrices(response.data))
            .catch(error => console.error('Error fetching prices:', error));
        axios.get('http://localhost:5000/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
        axios.get('http://localhost:5000/api/summary')
            .then(response => setSummary(response.data))
            .catch(error => console.error('Error fetching summary:', error));
    }, []);

    const handleDateRangeChange = (start, end) => {
        setDateRange({ start, end });
    };

    const handleEventChange = (event) => {
        setSelectedEvent(event);
    };

    const filteredPrices = dateRange.start && dateRange.end
        ? prices.filter(p => {
            const date = new Date(p.Date);
            return date >= new Date(dateRange.start) && date <= new Date(dateRange.end);
        })
        : prices;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Brent Oil Price Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <PriceChart prices={filteredPrices} events={events} selectedEvent={selectedEvent} summary={summary} />
                </div>
                <div>
                    <EventFilter
                        events={events}
                        onDateRangeChange={handleDateRangeChange}
                        onEventChange={handleEventChange}
                    />
                    <MetricsPanel prices={filteredPrices} summary={summary} />
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);