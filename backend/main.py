import numpy as np
import matplotlib.pyplot as plt
import streamlit as st

from pydantic import BaseModel
from scipy.stats import norm
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from option_calculator import callPriceBlackScholes, putPriceBlackScholes, optionDelta, optionGamma, optionTheta, optionVega, optionRho

# TODO:
# 1. 確保環境有被打包
# 2. 界面調整
# 3. 調整前端 r 跟 vol 的刻度
# 4. 例外訊息調整

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

    # call price and put price
    call_option_price = callPriceBlackScholes(S, K, r, T, sigma)
    put_option_price = putPriceBlackScholes(S, K, r, T, sigma)

    # option greeks
    option_delta = optionDelta(S, K, r, T, sigma, option_type)
    option_gamma = optionGamma(S, K, r, T, sigma)
    option_theta = optionTheta(S, K, r, T, sigma, option_type)
    option_vega  = optionVega(S, K, r, T, sigma)
    option_rho   = optionRho(S, K, r, T, sigma, option_type)

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
    import uvicorn
    uvicorn.run(app, host="localhost", port=3001)