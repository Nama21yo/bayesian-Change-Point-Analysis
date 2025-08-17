import React from 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'https://cdn.jsdelivr.net/npm/recharts@2.12.7/umd/Recharts.min.js';

const PriceChart = ({ prices, events, selectedEvent, summary }) => {
    const tau = summary.find(s => s.variable === 'tau')?.mean;
    const changeDate = prices[Math.round(tau)]?.Date;

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Price Trends and Events</h2>
            <LineChart width={600} height={300} data={prices} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} labelFormatter={(label) => new Date(label).toLocaleDateString()} />
                <Legend />
                <Line type="monotone" dataKey="Price" stroke="#8884d8" name="Price" />
                {selectedEvent && events
                    .filter(e => e['Event Description'] === selectedEvent)
                    .map(e => (
                        <ReferenceLine
                            key={e.Date}
                            x={e.Date}
                            stroke="red"
                            label={{ value: e['Event Description'], position: 'top', fill: 'red' }}
                        />
                    ))}
                {changeDate && (
                    <ReferenceLine
                        x={changeDate}
                        stroke="green"
                        label={{ value: 'Change Point', position: 'top', fill: 'green' }}
                    />
                )}
            </LineChart>
        </div>
    );
};

export default PriceChart;