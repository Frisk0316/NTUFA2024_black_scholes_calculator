import { useState } from "react";
import axios from 'axios';
import './App.css';

const BlackScholesCalculator = () => {
  const [S, setS] = useState(65);
  const [K, setK] = useState(55);
  const [r, setR] = useState(0.1);
  const [daysToExpiry, setDaysToExpiry] = useState(250);
  const [sigma, setSigma] = useState(0.3);
  const [optionType, setOptionType] = useState('Call');

  const [callOptionPrice, setCallOptionPrice] = useState(null);
  const [putOptionPrice, setPutOptionPrice] = useState(null);

  const [delta, setDelta] = useState(null);
  const [gamma, setGamma] = useState(null);
  const [theta, setTheta] = useState(null);
  const [vega, setVega] = useState(null);
  const [rho, setRho] = useState(null);

  const calculateOptionPrice = () => {
    const T = daysToExpiry / 365;
    axios.post('http://localhost:3001/calculate', {
      S: S,
      K: K,
      r: r,
      T: T,
      sigma: sigma,
      type: optionType === 'Call' ? 'c' : 'p'
    })
    .then(response => { 
      setCallOptionPrice(response.data.call_option_price);
      setPutOptionPrice(response.data.put_option_price);

      setDelta(response.data.option_delta);
      setGamma(response.data.option_gamma);
      setTheta(response.data.option_theta);
      setVega(response.data.option_vega);
      setRho(response.data.option_rho);
    })
    .catch(error => {
      console.error('Error calculating option price:', error);
    });
  };

  return (
    <div>
      <h2>Black-Scholes Option Price Calculator</h2>
      <label>
        Option Type:
        <select value={optionType} onChange={(e) => setOptionType(e.target.value)}>
          <option value="Call">Call</option>
          <option value="Put">Put</option>
        </select>
      </label>
      <br />
      <label>
        Underlying Asset Price (S):
        <input type="number" value={S} onChange={(e) => setS(e.target.value)} />
      </label>
      <br />
      <label>
        Strike Price (K):
        <input type="number" value={K} onChange={(e) => setK(e.target.value)} />
      </label>
      <br />
      <label>
        Risk-Free Rate (r):
        <input type="number" value={r} onChange={(e) => setR(e.target.value)} />
      </label>
      <br />
      <label>
        Time to Expiry Date (in days):
        <input type="number" value={daysToExpiry} onChange={(e) => setDaysToExpiry(e.target.value)} />
      </label>
      <br />
      <label>
        Volatility (sigma):
        <input type="number" value={sigma} onChange={(e) => setSigma(e.target.value)} />
      </label>
      <br />
      <button onClick={calculateOptionPrice}>Calculate</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>Option Price</h3>
          <p>Call Price: {callOptionPrice}</p>
          <p>Put Price: {putOptionPrice}</p>

        </div>
        <div>
          <h3>Greeks</h3>
          <p>Delta: {delta}</p>
          <p>Gamma: {gamma}</p>
          <p>Theta: {theta}</p>
          <p>Vega: {vega}</p>
          <p>Rho: {rho}</p>
        </div>
        <div>
          <h3>Visualization of Greeks</h3>
          {/* <LineChart width={400} height={300} data={deltas}>
            <XAxis dataKey="S" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="delta" stroke="#8884d8" />
          </LineChart> */}
        </div>
      </div>
    </div>
  );
};

export default BlackScholesCalculator;
