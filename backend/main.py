import numpy as np
import matplotlib.pyplot as plt
import streamlit as st
import uvicorn

from pydantic import BaseModel
from scipy.stats import norm
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from option_calculator import callPriceBlackScholes, putPriceBlackScholes, optionDelta, optionGamma, optionTheta, optionVega, optionRho

class OptionParams(BaseModel):
    S: float
    K: float
    r: float
    T: float
    sigma: float
    type: str

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/calculate')
async def calculate_option_price(option_params: OptionParams):
    S = option_params.S
    K = option_params.K
    r = option_params.r
    T = option_params.T
    sigma = option_params.sigma
    option_type = option_params.type

    # call price and put price(Rounded to four decimal places)
    call_option_price = round(callPriceBlackScholes(S, K, r, T, sigma), 4)
    put_option_price  = round(putPriceBlackScholes(S, K, r, T, sigma), 4)

    # option greeks(Rounded to four decimal places)
    option_delta = round(optionDelta(S, K, r, T, sigma, option_type), 4)
    option_gamma = round(optionGamma(S, K, r, T, sigma), 4)
    option_theta = round(optionTheta(S, K, r, T, sigma, option_type), 4)
    option_vega  = round(optionVega(S, K, r, T, sigma), 4)
    option_rho   = round(optionRho(S, K, r, T, sigma, option_type), 4)

    if call_option_price is not None:
        return {
            'call_option_price': call_option_price,
            'put_option_price': put_option_price,
            'option_delta': option_delta,
            'option_gamma': option_gamma,
            'option_theta': option_theta,
            'option_vega': option_vega,
            'option_rho': option_rho
        }
    else:
        raise HTTPException(status_code=500, detail='Error calculating option price')

if __name__ == '__main__':
    uvicorn.run(app, host="localhost", port=3001)