import matplotlib.pyplot as plt

def plot_eda(df, output_dir):
    """Generate and save EDA plots for prices and log returns."""
    plt.figure(figsize=(12, 6))
    
    # Plot raw prices
    plt.subplot(2, 1, 1)
    plt.plot(df['Date'], df['Price'], label='Brent Oil Price')
    plt.title('Brent Oil Prices')
    plt.xlabel('Date')
    plt.ylabel('Price ($)')
    plt.legend()
    
    # Plot log returns
    plt.subplot(2, 1, 2)
    plt.plot(df['Date'], df['log_return'], label='Log Returns', color='orange')
    plt.title('Log Returns of Brent Oil Prices')
    plt.xlabel('Date')
    plt.ylabel('Log Return')
    plt.legend()
    
    plt.tight_layout()
    plt.savefig(f"{output_dir}/eda_plots.png")
    plt.close()
