import React, {Component} from "react";
import "./App.scss";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import loading from "./loading.gif";

class App extends Component {
	constructor(props) {
		super();
		this.state = {
			origin_value: 1,
			origin_currency: "EUR",
			destination_value: 4600,
			destination_currency: "MGA",
			currencies: ["EUR", "MGA"],
			loading: true
		};
		this.port = process.env.PORT || 80;
		this.handle_events = this.handle_events.bind(this);
		this.list = this.list.bind(this);
		this.request = this.request.bind(this);
		this.handle_click = this.handle_click.bind(this);
	}

	//Request a currency conversion from server
	request(origin, destination) {
		this.setState({
			loading: true
		});
		fetch("http://localhost:" + this.port + "/convert", {
	        method: "POST",
	        headers: {
	       		"Content-Type": "application/json"
	        },
	       	body: JSON.stringify({
	       		amount: this.state.origin_value,
	        	origin: origin,
	        	destination: destination
	       	})
		}).then(response => {
	        return response.json();
		}).then(data => {
			this.setState({
				destination_value: data
			});
			console.log(data);
			this.setState({
				loading: false
			});
		}).catch(e => {
			console.error(e.message);
		});
	}

	//Get list of currencies and update state
	list() {
		fetch("http://localhost:" + this.port + "/list", {
	        method: "POST"
		}).then(response => {
	        return response.json();
		}).then(data => {
			if(data.errno)
				console.log(data);
			else {
				let currencies = [];
				for(let currency in data)
					currencies.push(currency);
				this.setState({
					currencies: currencies
				});
				this.request(this.state.origin_currency, this.state.destination_currency);
			}
		}).catch(e => {
			console.error(e.message);
		});
	}

	componentDidMount() {
		this.list();
	}

	//Manages events
	handle_events(e, target) {
		//Update state
		this.setState({
			[target]: e.target.value
		});
	}

	handle_click() {
		//Request conversion from server
		if(!this.state.loading)
			this.request(this.state.origin_currency, this.state.destination_currency);
	}

	render() {
		const social = [
			{
				title: "Visit my Facebook page !",
				icon: faFacebook,
				link: "https://facebook.com/manjaka13"
			},
			{
				title: "Contribute this app's repository",
				icon: faGithub,
				link: "https://github.com/Manjaka13/currency-converter"
			},
			{
				title: "Visit my LinkedIn page",
				icon: faLinkedin,
				link: "https://linkedin.com/mwlite/in/harijaona-rajaonson-9456481b5"
			}
		];
		const mapped_social = social.map((item, n) => {
			return (
				<li key={n}>
					<a className="link" href={item.link} title={item.title}>
						<Icon className="icon" icon={item.icon} />
					</a>
				</li>
			);
		});
		const mapped_currencies = this.state.currencies.map((currency, n) => {
			return (
				<option key={n} value={currency}>{currency}</option>
			);
		});
		const convert_className = this.state.loading ? "convert convert-disabled" : "convert";

		return (
			<div className="cc-app">
				<div className="window">
					
					<div className="head">
						<h1 className="title title-sm">Currency<span className="part2"> converter</span></h1>
						<ul className="social">
							{mapped_social}
						</ul>
					</div>

					<div className="body-flex">
						<div className="body">
							<div className="left">
								<div className="container">
									<div className="form">
										<input className="origin_value" type="text" placeholder="Origin value" onChange={(e) => this.handle_events(e, "origin_value")} value={this.state.origin_value} />
										<select className="origin_select" onChange={(e) => this.handle_events(e, "origin_currency")} value={this.state.origin_currency}>
											{mapped_currencies}
										</select>
									</div>
								</div>
							</div>
							<div className="middle">
								<div className="box">
									<button className={convert_className} onClick={this.handle_click}><span className="txt"><Icon icon={faCaretRight} /> Convert </span><img className="loading" src={loading} alt="..." /></button>
								</div>
							</div>
							<div className="right">
								<div className="container">
									<div className="form">
										<input className="destination_value" type="text" placeholder="Destination value" onChange={(e) => this.handle_events(e, "destination_value")} value={this.state.destination_value} />
										<select className="destination_select" onChange={(e) => this.handle_events(e, "destination_currency")} value={this.state.destination_currency}>
											{mapped_currencies}
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;