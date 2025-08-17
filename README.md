# Brent Oil Price Analysis and Dashboard

## Overview

This project implements a Bayesian change point detection model to analyze Brent oil prices (`data/BrentOilPrices.csv`) and an interactive dashboard to visualize results. The analysis identifies structural breaks in the price series and associates them with historical events (`events/oil_events.csv`). The dashboard, built with Flask (backend) and React (frontend), displays price trends, event correlations, and key metrics, with interactive filters for date ranges and events.

## Folder Structure

```
brent_oil_analysis/
├── data/
│   └── BrentOilPrices.csv         # Input CSV with Date and Price
├── src/
│   ├── __init__.py               # Python package
│   ├── data_preparation.py       # Data loading and preprocessing
│   ├── eda.py                    # Exploratory data analysis
│   ├── change_point_model.py     # Bayesian change point modeling
│   └── utils.py                  # Utility functions
├── backend/
│   ├── __init__.py               # Backend package
│   ├── api.py                    # Flask API routes
│   └── data_handler.py           # Data processing for API
├── frontend/
│   ├── public/
│   │   └── index.html            # React entry point
│   ├── src/
│   │   ├── App.js                # Main React component
│   │   ├── components/
│   │   │   ├── PriceChart.js     # Price trend visualization
│   │   │   ├── EventFilter.js    # Event and date filtering
│   │   │   └── MetricsPanel.js   # Key indicators
│   │   └── styles/
│   │       └── tailwind.css      # Tailwind CSS
│   ├── package.json              # Frontend dependencies
│   └── tailwind.config.js        # Tailwind configuration
├── outputs/
│   └── summary.csv               # Model summary statistics
├── events/
│   └── oil_events.csv            # Historical event dataset
├── main.py                       # Runs analysis
├── run_dashboard.py              # Runs Flask app
├── requirements.txt              # Backend dependencies
└── README.md                     # This file
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- Dependencies: `requirements.txt` (backend), `package.json` (frontend)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd brent_oil_analysis
   ```
2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Build Tailwind CSS:
   ```bash
   npm run build:css
   ```
5. Ensure `data/BrentOilPrices.csv` exists with 'Date' (YYYY-MM-DD) and 'Price' columns.

## Usage

1. Run the analysis to generate outputs:
   ```bash
   python main.py
   ```
2. Run the dashboard:
   ```bash
   python run_dashboard.py
   ```
3. Access the dashboard at `http://localhost:5000`.
4. Check results in `outputs/`:
   - `plots/`: EDA and model plots.
   - `summary.csv`: Posterior statistics.
5. Compare change points (from `summary.csv` or `tau_posterior.png`) with `events/oil_events.csv`.

## Dashboard Features

- **Price Trends**: Recharts line chart showing price history, with event highlights (red lines) and change points (green line).
- **Filters**: Select date ranges and events to focus on specific periods or incidents.
- **Metrics**: Displays volatility, average price, and model means (mu_1, mu_2).
- **Responsive**: Tailwind CSS ensures usability on desktop, tablet, and mobile.

## Modules

- **Analysis**:
  - `data_preparation.py`: Loads and preprocesses data.
  - `eda.py`: Generates EDA plots.
  - `change_point_model.py`: Runs Bayesian model, saves `summary.csv`.
  - `utils.py`: Handles directory creation.
- **Backend**:
  - `api.py`: Flask API routes (`/api/prices`, `/api/events`, `/api/summary`).
  - `data_handler.py`: Processes data for API.
- **Frontend**:
  - `App.js`: Main React component.
  - `PriceChart.js`: Visualizes price trends and events.
  - `EventFilter.js`: Handles date and event filtering.
  - `MetricsPanel.js`: Shows key indicators.

## Outputs

- **Plots**: `eda_plots.png`, `trace_plots.png`, `tau_posterior.png`, `means_posterior.png`.
- **Summary**: `summary.csv` with posterior statistics (tau, mu_1, mu_2, sigma).
- **Events**: `oil_events.csv` for event associations.
- **Dashboard**: Interactive interface at `http://localhost:5000`.

## Notes

- Requires PyMC and Node.js; install via `pip install pymc arviz` and `npm install`.
- Assumes sufficient data in `BrentOilPrices.csv` for change point detection.
- Event correlations are not causal; manual comparison required.

## License

MIT License
