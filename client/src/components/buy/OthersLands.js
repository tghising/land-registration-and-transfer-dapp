import React, { Component } from "react";
import FetchService from "../../services/FetchService";

class OthersLands extends Component {
    constructor(props) {
        super();
        this.init();
        this.bindEvents();
    }

    componentDidMount = async () => {
        let owner = new String(window.ethereum.selectedAddress).toUpperCase();
        this.getOthersAllLand(owner);
    };

    init() {
        this.state = {
            lands : []
        }
    }

    bindEvents(){
        this.buyLand = this.buyLand.bind(this);
    }

    getOthersAllLand = (owner) => {
        FetchService.getOthersAllLand(owner)
            .then(response => {
                this.setState({lands:response.data});
            }).catch(errr => {
            console.log('Error: '+ errr);
        })
    }


    buyLand = (landId) => {
        window.localStorage.setItem('landId', landId);
        this.props.history.push('/buy/request');
    }

    render() {
        if (!window.contractInstance) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            // Main Container start here
            <main role="main" className="container">
                <div className="header-panel">
                    <div className="row">
                        <h3>All lands</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>Land Id</th>
                                        <th>Owner</th>
                                        <th>Date Created</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.lands.map((land, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{land.landId}</td>
                                                        <td>{land.owner}</td>
                                                        <td>{land.updatedDate}</td>
                                                        <td>
                                                            <button className='btn btn-primary' onClick={ () => this.buyLand(land.landId)}>Buy</button>
                                                        </td>
                                                    </tr>
                                                );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            // Main Container end here
        );
    }
}

export default OthersLands;