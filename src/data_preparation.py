import pandas as pd
import numpy as np

def load_data(file_path):
    """Load and preprocess Brent oil price data."""
    try:
        df = pd.read_csv(file_path, parse_dates=['Date'])
        df['Price'] = df['Price'].astype(float)
        df = df.sort_values('Date').reset_index(drop=True)
        return df
    except FileNotFoundError:
        raise FileNotFoundError(f"Data file not found at {file_path}")

def preprocess_data(df):
    """Handle missing values and compute log returns."""
    # Forward-fill missing values
    df = df.fillna(method='ffill')
    
    # Compute log returns
    df['log_return'] = np.log(df['Price'] / df['Price'].shift(1))
    df = df.dropna()  # Drop NaN from log returns
    return df
