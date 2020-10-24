import React, { Component } from "react";
import {BrowserRouter, NavLink, Route, Switch,} from 'react-router-dom';
import "./App.css";

import BlockchainService from './services/BlockchainService';
import Home from './components/Home';
import Contact from './components/Contact';
import Error from './components/Error';
import Footer from './components/Footer';
import Lands from './components/land/Lands';
import LandRegistration from './components/land/LandRegistration';
import OwnLands from "./components/owner/OwnLands";
import OthersLands from "./components/buy/OthersLands";
import LandBuyRequest from "./components/buy/BuyRequest";
import AllBuyLandRequest from "./components/request/AllBuyLandRequest";
import UserService from "./services/UserService";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: null,
      isRegistrar: false
    }
  }

  componentDidMount = async () => {
    await BlockchainService.instantiateLandContract();
    let user = UserService.loggedCurrentUser();
    this.setState({
      currentUser:user,
      isRegistrar: user.isRegistrar
    })
    this.setState({ contract: window.contractInstance }, this.watchEvents)
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {accounts, contract} = this.state;
    await contract.methods.set(this.state.newValue);
    const response = await contract.methods.get();
  };

  handleChange = (event) => {
    this.setState({newValue: event.target.value});
  }

  watchEvents = async () => {
    console.log(window.contractInstance);
  };

  render() {
    const { currentUser, isRegistrar } = this.state;
    if (!window.contractInstance && !currentUser) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        // Browser routing start here
        <BrowserRouter>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
            </nav>
          </div>

          <div>
            {/*Navbar placed here*/}
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                  <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <NavLink to="/" className="nav-link">Home <span className="sr-only">(current)</span></NavLink>
                    </li>

                    {currentUser && isRegistrar &&
                    <li className="nav-item">
                      <NavLink to="/lands" className="nav-link">Land</NavLink>
                    </li>
                    }
                    { currentUser && isRegistrar &&
                    <li className="nav-item">
                      <NavLink to="/request" className="nav-link">Requests</NavLink>
                    </li>
                    }

                    { currentUser && !isRegistrar &&
                    <li className="nav-item">
                      <NavLink to="/own" className="nav-link">Own</NavLink>
                    </li>
                    }

                    { currentUser && !isRegistrar &&
                    <li className="nav-item">
                      <NavLink to="/buy" className="nav-link">Buy</NavLink>
                    </li>
                    }

                    <li className="nav-item">
                      <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
                    </li>

                  </ul>
                  <ul className="navbar-nav navbar-right">
                    <p> <b>{window.ethereum.selectedAddress}</b> </p>
                  </ul>
                </div>
              </nav>
            </div>

            <Switch>
              <Route exact path='/' component={Home} />
              {currentUser && isRegistrar &&
              <Route exact path='/lands' component={Lands} /> }
              {currentUser && isRegistrar &&
              <Route exact path='/lands/registration' component={LandRegistration} /> }
              {currentUser && isRegistrar &&
              <Route exact path='/request' component={AllBuyLandRequest} />
              }
              {currentUser && !isRegistrar &&
              <Route exact path='/own' component={OwnLands} /> }
              {currentUser && !isRegistrar &&
              <Route exact path='/buy' component={OthersLands} /> }
              {currentUser && !isRegistrar &&
              <Route exact path='/buy/request' component={LandBuyRequest} /> }
              <Route exact path='/contact' component={Contact} />
              <Route component={Error}/>
            </Switch>
            {/*Footer placed here*/}
            <Footer/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
