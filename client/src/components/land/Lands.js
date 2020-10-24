import React, { Component } from "react";
import FetchService from "../../services/FetchService";

class Lands extends Component {
    constructor(props) {
        super();
        this.init();
        this.bindEvents();
    }

    componentDidMount = async () => {
        this.getAllLands();
    };

    init() {
        this.state = {
            lands : []
        }
    }

    bindEvents(){
        this.handleChange = this.handleChange.bind(this);
    }

    getAllLands = () => {
        FetchService.getAllLand()
            .then(response => {
                this.setState({lands:response.data});
            }).catch(errr => {
            console.log('Error: '+ errr);
        })
    }

    deleteLand = (id) => {
        FetchService.deleteLandById(id)
            .then(response => {
                console.log("Land deleted: " + id);
                this.getAllLands();
            }).catch(err => {
            console.log('Error is: ' + err);
        })
    }

    editLand = (id) => {
        window.localStorage.setItem('id', id);
        this.props.history.push('/lands/edit');
    }

    handleChange = ( event ) => {
        this.setState({
            [event.target.id]: event.target.value
        });
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
                        <div className="col-lg-10">
                            <header>
                                <h1>Land dashboard</h1>
                            </header>
                        </div>
                        <div className="col-lg-2">
                            <div className="btn-group">
                                <a href="/lands/registration" className="btn btn-success">Land Registration</a>
                            </div>
                        </div>
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

export default Lands;