import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      cur: '',
      val: '',
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  onChange = (event) => {
    this.setState({ cur: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    //const api_key = 'dc6zaTOxFJmzC';
    //const url = `http://api.giphy.com/v1/gifs/search?q=${this.state.cur}&api_key=${api_key}`;
    const url = `https://api.coinbase.com/v2/exchange-rates?currency=BTC`;
    let currency = this.state.cur;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ val: data.data.rates[currency] }))
      .catch(e => console.log('error', e));
  }

  render() {
    return (

      
      <div className="App">
      <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">Bitcoin Conversion Rate Calculator</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="https://developers.coinbase.com/api/v2#exchange-rates">Coinbase API</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://developers.coinbase.com/">Coinbase Developer Home</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Form onSubmit={this.handleSubmit}>
          <input placeholder="Enter a currency code..." value={this.state.cur} onChange={this.onChange} />
          <Button color="danger">Get Conversion</Button>
        </Form>
        {/* <img src={`https://www.publicdomainpictures.net/pictures/270000/velka/bitcoin-investment-business-th.jpg`} height="200" alt={this.state.cur} />
        <label>One Bitcoin is worth {this.state.val} {this.state.cur}</label>
         */}
        <figure>
          <img src={`https://www.publicdomainpictures.net/pictures/270000/velka/bitcoin-investment-business-th.jpg`} height="200" alt={this.state.cur}/>
        <figcaption> One Bitcoin is worth {this.state.val} {this.state.cur} </figcaption>
        </figure>
      </div>
    );
  }
}

export default App;