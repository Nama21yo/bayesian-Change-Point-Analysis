import React from 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js';

const MetricsPanel = ({ prices, summary }) => {
    const volatility = prices.length > 0
        ? Math.std(prices.map(p => p.log_return)).toFixed(4)
        : 'N/A';
    const avgPrice = prices.length > 0
        ? (prices.reduce((sum, p) => sum + p.Price, 0) / prices.length).toFixed(2)
        : 'N/A';
    const mu1 = summary.find(s => s.variable === 'mu_1')?.mean.toFixed(2) || 'N/A';
    const mu2 = summary.find(s => s.variable === 'mu_2')?.mean.toFixed(2) || 'N/A';

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Key Indicators</h2>
            <p><strong>Volatility (Log Returns):</strong> {volatility}</p>
            <p><strong>Average Price:</strong> ${avgPrice}</p>
            <p><strong>Pre-Change Mean:</strong> ${mu1}</p>
            <p><strong>Post-Change Mean:</strong> ${mu2}</p>
        </div>
    );
};

export default MetricsPanel;