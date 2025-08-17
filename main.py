from src.data_preparation import load_data, preprocess_data
from src.eda import plot_eda
from src.change_point_model import run_change_point_model
from src.utils import ensure_dir

def main():
    # Paths
    data_path = "data/BrentOilPrices.csv"
    output_dir = "outputs/plots"
    ensure_dir(output_dir)
    
    # Load and preprocess data
    df = load_data(data_path)
    df = preprocess_data(df)
    
    # Perform EDA
    plot_eda(df, output_dir)
    
    # Run change point model
    prices = df['Price'].values
    dates = df['Date'].values
    trace, summary = run_change_point_model(prices, dates, output_dir)
    
    print("Analysis complete. Check outputs/ for results.")

if __name__ == "__main__":
    main()
