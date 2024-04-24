import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App/App.css';

const initialValues = {
	option_type: '',
	S: '',
    K: '',
    r: '',
    days_to_expiry: '',
    sigma: ''
}

// Input Data Form
const Form = ({ change }) => {
	const [state, setState] = useState(initialValues);

	const handleChange = e => {
		let { value, name } = e.target;
		if (value > 99999) {
			value = 99999;
		}
		setState({
			...state,
			[name]: value,
		});
	};

	const handleSubmit = () => {
		change(state);
		setState(initialValues);
	};

	return (
		<>
			<div className="row">
				<div className="col m6 s12">
					<label htmlFor="option_type">Option Type</label>
					<select
						id="option_type"
						name="option_type"
						value={state.option_type}
						onChange={handleChange}
					>
						<option value="Call">Call</option>
						<option value="Put">Put</option>
					</select>
				</div>

				<div className="col m6 s12">
					<label htmlFor="Underlying Asset Value">Underlying Asset Value (dollar)</label>
					<input
						id="underlying_asset_value"
						name="S"
						type="number"
						min="1"
						max="99999"
						placeholder="100"
						value={state.S}
						onChange={handleChange}
					/>
				</div>

				<div className="col m6 s12">
					<label htmlFor="Strike Price">Strike Price (dollar)</label>
					<input
						id="strike_price"
						name="K"
						type="number"
						min="1"
						max="99999"
						placeholder="90"
						value={state.K}
						onChange={handleChange}
					/>
				</div>

				<div className="col m6 s12">
					<label htmlFor="risk_free_rate">Risk Free Rate </label>
					<input
						id="risk_free_rate"
						name="r"
						type="number"
                        step="0.01"
						min="0"
						max="1"
						placeholder="0.05"
						value={state.r}
						onChange={handleChange}
					/>
				</div>

				<div className="col m6 s12">
					<label htmlFor="days_to_expiry">Days to Expiry (days)</label>
					<input
						id="days_to_expiry"
						name="days_to_expiry"
						type="number"
						min="1"
						max="36500"
						placeholder="90"
						value={state.days_to_expiry}
						onChange={handleChange}
					/>
				</div>

				<div className="col m6 s12">
					<label htmlFor="volatility">Volatility </label>
					<input
						id="volatility"
						name="sigma"
						type="number"
                        step="0.01"
						min="0"
						max="100"
						placeholder="0.10"
						value={state.sigma}
						onChange={handleChange}
					/>
				</div>

			</div>
			<div className="center">
				<button
					id="bmi-btn"
					className="calculate-btn"
					type="button"
					disabled={state.option_type === '' || state.S === '' || state.K === '' || state.r === '' || state.days_to_expiry === '' || state.sigma === ''}
					onClick={handleSubmit}
				>
					Calculate Option Price
				</button>
			</div>
		</>
	);
};

Form.propTypes = {
	change: PropTypes.func.isRequired
};

export default Form;
