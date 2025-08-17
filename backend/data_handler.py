import pandas as pd
from src.data_preparation import load_data, preprocess_data

def get_price_data():
    """Load and preprocess price data."""
    df = load_data("data/BrentOilPrices.csv")
    df = preprocess_data(df)
    return df[['Date', 'Price', 'log_return']].to_dict(orient='records')

def get_event_data():
    """Load event data."""
    try:
        df = pd.read_csv("events/oil_events.csv", parse_dates=['Date'])
        return df[['Date', 'Event Description']].to_dict(orient='records')
    except FileNotFoundError:
        return []

def get_model_summary():
    """Load model summary."""
    try:
        df = pd.read_csv("outputs/summary.csv")
        return df.to_dict(orient='records')
    except FileNotFoundError:
        return []
