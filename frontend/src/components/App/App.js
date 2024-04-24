import { useState } from "react";
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './App.css';
import Form from "../Form/Form";
import Info from "../Info/Info";
import { getData, storeData } from '../helpers/localStorage.js';

const BlackScholesCalculator = () => {

  const initialState = () => getData('data') || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  useEffect(() => {
    storeData('data', state);

    const S = state.map(obj => obj.underlying_asset_price);
    const K = state.map(obj => obj.strike_price);
    const r = state.map(obj => obj.risk_free_rate);
    const sigma = state.map(obj => obj.volatility);
    const T = state.map(obj => obj.days_to_expiry);
    const optionType = state.map(obj => obj.option_type);

    const callOptionPrice = state.map(obj => obj.call_option_price);
    const putOptionPrice = state.map(obj => obj.put_option_price);
    
    const optionDelta = state.map(obj => obj.option_delta);
    const optionGamma = state.map(obj => obj.option_gamma);
    const optionTheta = state.map(obj => obj.option_theta);
    const optionVega = state.map(obj => obj.option_vega);
    const optionRho = state.map(obj => obj.option_rho);

    let newData = { S, K, r, sigma, T, optionType, callOptionPrice, putOptionPrice, optionDelta, optionGamma, optionTheta, optionVega, optionRho};
    setData(newData);
  }, [state]);

  const handleChange = val => {
    let S = val.S;
    let K = val.K;
    let r = val.r;
    let T = val.days_to_expiry / 365;
    let sigma = val.sigma;
    let optionType = val.option_type;

    axios.post('http://localhost:3001/calculate', {
        S: S,
        K: K,
        r: r,
        T: T,
        sigma: sigma,
        type: optionType === 'Call' ? 'c' : 'p'
    })
    .then(response => { 
      setState(prevState => {
            val.option_type = optionType;
            val.underlying_asset_price = S;
            val.strike_price = K;
            val.risk_free_rate = r;
            //val.days_to_expiry = val.days_to_expiry;
            val.volatility = sigma;

            val.call_option_price = response.data.call_option_price;
            val.put_option_price = response.data.put_option_price;

            val.option_delta = response.data.option_delta;
            val.option_gamma = response.data.option_gamma;
            val.option_theta = response.data.option_theta;
            val.option_vega = response.data.option_vega;
            val.option_rho = response.data.option_rho;

            val.id = uuidv4();
            let newVal = [...prevState, val];
            return newVal;
        });
    })
    .catch(error => {
        console.error('Error calculating option price:', error);
    });
};

  const handleDelete = id => {
    storeData('lastState', state);
    let newState = state.filter(i => {
      return i.id !== id;
    });
    setState(newState);
  };

  return (
    <div className='container'>
      <div className='row center'>
        <h1 className='white-text'> Black-Scholes Option Pricing Calculator </h1>
      </div>
      <div className='row'>
        <div className='col m12 s12'>
          <Form change={handleChange} />
          <div>
            <div className='row center'>
              <h4 className='white-text'>Results</h4>
            </div>
            <div className='data-container row'>
              {state.length > 0 ? (
                <>
                  {state.map(info => (
                    <Info
                      key={info.id}
                      id={info.id}

                      // input data
                      option_type={info.option_type}
                      underlying_asset_price={info.underlying_asset_price}
                      strike_price={info.strike_price}
                      risk_free_rate={info.risk_free_rate}
                      days_to_expiry={info.days_to_expiry}
                      volatility={info.volatility}

                      // price
                      call_option_price={info.call_option_price}
                      put_option_price={info.put_option_price}

                      // greeks
                      option_delta={info.option_delta}
                      option_gamma={info.option_gamma}
                      option_theta={info.option_theta}
                      option_vega={info.option_vega}
                      option_rho={info.option_rho}                      
                      deleteCard={handleDelete}
                    />
                  ))}
                </>
              ) : (
                  <div className='center white-text'>No log found</div>
                )}
            </div>
          </div>
      </div>
    </div>
  </div>
  );
};

export default BlackScholesCalculator;
