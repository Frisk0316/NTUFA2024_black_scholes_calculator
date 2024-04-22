import numpy as np
from scipy.stats import norm
import logging
logger = logging.getLogger('ftpuploader')

def callPriceBlackScholes(S, K, r, T, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)* T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    try:
        price = S * norm.cdf(d1, 0, 1) - K * np.exp(-r * T) * norm.cdf(d2, 0, 1)
        return price
    except:  
        logger.error("There is an error in the callPriceBlackScholes function.")

def putPriceBlackScholes(S, K, r, T, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)* T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    try:
        price = K * np.exp(-r * T) * norm.cdf(-d2, 0, 1) - S * norm.cdf(-d1, 0, 1)
        return price
    except:  
        logger.error("There is an error in the putPriceBlackScholes function.")

def optionDelta (S, K, r, T, sigma, option_type):
    d1 = (np.log(S/K) + (r + sigma**2/2)* T)/(sigma*np.sqrt(T))
    
    try:
        if option_type == "c":
            delta = norm.cdf(d1, 0, 1)
        elif option_type == "p":
            delta = -norm.cdf(-d1, 0, 1)
        return delta
    except:
        logger.error("There is an error in the optionDelta function.")

def optionGamma (S, K, r, T, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)* T)/(sigma*np.sqrt(T))
    
    try:
        gamma = norm.pdf(d1, 0, 1)/ (S * sigma * np.sqrt(T))
        return gamma
    except:
        logger.error("There is an error in the optionGamma function.")

def optionTheta(S, K, r, T, sigma, option_type):
    d1 = (np.log(S/K) + (r + sigma**2/2)* T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    
    try:
        if option_type == "c":
            theta = - ((S * norm.pdf(d1, 0, 1) * sigma) / (2 * np.sqrt(T))) - r * K * np.exp(-r*T) * norm.cdf(d2, 0, 1)
        elif option_type == "p":
            theta = - ((S * norm.pdf(d1, 0, 1) * sigma) / (2 * np.sqrt(T))) + r * K * np.exp(-r*T) * norm.cdf(-d2, 0, 1)
        return theta/365
    except:
        logger.error("There is an error in the optionTheta function.")

def optionVega (S, K, r, T, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)* T)/(sigma*np.sqrt(T))
    
    try:
        vega = S * np.sqrt(T) * norm.pdf(d1, 0, 1) * 0.01
        return vega
    except:
        logger.error("There is an error in the optionVega function.")

def optionRho(S, K, r, T, sigma, option_type):
    d1 = (np.log(S/K) + (r + sigma**2/2)* T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    
    try:
        if option_type == "c":
            rho = 0.01 * K * T * np.exp(-r*T) * norm.cdf(d2, 0, 1)
        elif option_type == "p":
            rho = 0.01 * -K * T * np.exp(-r*T) * norm.cdf(-d2, 0, 1)
        return rho
    except:
        logger.error("There is an error in the optionRho function.")
