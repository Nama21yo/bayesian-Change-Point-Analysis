import pymc as pm
import arviz as az
import numpy as np
import matplotlib.pyplot as plt

def run_change_point_model(prices, dates, output_dir):
    """Run Bayesian change point model and save results."""
    n = len(prices)
    
    with pm.Model() as model:
        # Prior for change point (tau)
        tau = pm.DiscreteUniform('tau', lower=0, upper=n-1)
        
        # Priors for means before and after change point
        mu_1 = pm.Normal('mu_1', mu=np.mean(prices), sigma=10)
        mu_2 = pm.Normal('mu_2', mu=np.mean(prices), sigma=10)
        
        # Prior for shared standard deviation
        sigma = pm.HalfNormal('sigma', sigma=10)
        
        # Switch function to select mean
        mu = pm.math.switch(tau >= np.arange(n), mu_1, mu_2)
        
        # Likelihood
        pm.Normal('prices', mu=mu, sigma=sigma, observed=prices)
        
        # Run MCMC
        trace = pm.sample(2000, tune=1000, return_inferencedata=True, random_seed=42)
    
    # Save summary
    summary = az.summary(trace)
    summary.to_csv(f"{output_dir}/summary.csv")
    
    # Plot trace for diagnostics
    az.plot_trace(trace, var_names=['tau', 'mu_1', 'mu_2'])
    plt.savefig(f"{output_dir}/trace_plots.png")
    plt.close()
    
    # Plot tau posterior
    plt.figure(figsize=(10, 5))
    tau_posterior = trace.posterior['tau'].values.flatten()
    plt.hist(tau_posterior, bins=range(n), density=True, alpha=0.7)
    plt.xticks(range(0, n, max(1, n//10)), dates[::max(1, n//10)], rotation=45)
    plt.title('Posterior Distribution of Change Point (tau)')
    plt.xlabel('Date')
    plt.ylabel('Posterior Probability')
    plt.tight_layout()
    plt.savefig(f"{output_dir}/tau_posterior.png")
    plt.close()
    
    # Plot means posterior
    az.plot_posterior(trace, var_names=['mu_1', 'mu_2'])
    plt.savefig(f"{output_dir}/means_posterior.png")
    plt.close()
    
    return trace, summary
