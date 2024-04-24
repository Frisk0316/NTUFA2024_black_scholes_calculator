import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ option_type, underlying_asset_price, strike_price, risk_free_rate, days_to_expiry, volatility,
                call_option_price, put_option_price, option_delta, option_gamma, option_theta, option_vega, option_rho, id, deleteCard }) => {
  const handleDelete = () => {
    deleteCard(id);
  };

  return (
    <div className="col m6 s12">
      <div className="card">
        <div className="card-content">
          <span className="card-title" data-test="option_data">
            Option Data: 
          </span>
          <div className="card-data">
            <span data-test="option_type">Option Type: {option_type} </span>
            <span data-test="underlying_asset_price">Underlying Asset Price: {underlying_asset_price} </span>
            <span data-test="strike_price">Strike Price: {strike_price} </span>
            <span data-test="risk_free_rate">Risk Free Rate: {risk_free_rate} </span>
            <span data-test="days_to_expiry">Days to Expire: {days_to_expiry} </span>
            <span data-test="volatility">Volatility: {volatility} </span>
          </div>  
          <div className="card-data">
            <span data-test="call_option_price">Call Option Price: {call_option_price} </span>
            <span data-test="put_option_price">Put Option Price: {put_option_price} </span>
          </div>
          <div className="card-data">
            <span data-test="option_delta">Delta: {option_delta} </span>
            <span data-test="option_gamma">Gamma: {option_gamma} </span>
            <span data-test="option_theta">Theta: {option_theta} </span>
            <span data-test="option_vega">Vega: {option_vega} </span>
            <span data-test="option_rho">Rho: {option_rho} </span>
          </div>
          <button className="delete-btn" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  option_type: PropTypes.string,
  S: PropTypes.number,
  K: PropTypes.number,
  r: PropTypes.number,
  days_to_expiry: PropTypes.number,
  sigma: PropTypes.number,
  call_option_price: PropTypes.number,
  put_option_price: PropTypes.number,
  delta: PropTypes.number,
  gamma: PropTypes.number,
  theta: PropTypes.number,
  vega: PropTypes.number,
  rho: PropTypes.number,
  id: PropTypes.string,
  deleteCard: PropTypes.func
};

export default Info;
