import React, { Component } from "react";
import FetchService from "../../services/FetchService";
import BlockchainService from "../../services/BlockchainService";

class AllBuyLandRequest extends Component {
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
        this.LandTransfer = this.LandTransfer.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getAllLands = () => {
        FetchService.getAllBuyRequest()
            .then(response => {
                this.setState({lands:response.data});
            }).catch(errr => {
            console.log('Error: '+ errr);
        })
    }

    handleChange = ( event ) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    LandTransfer = (requestId) => {
        BlockchainService.landTransferByRequestId(requestId)
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
                        <div className="col-lg-12">
                            <header>
                                <h1>Land buy/sell dashboard</h1>
                            </header>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>Request Id</th>
                                        <th>Land Id</th>
                                        <th>Owner</th>
                                        <th>Owner Ok</th>
                                        <th>Buyer</th>
                                        <th>Buyer Ok</th>
                                        <th>Amount (Ether)</th>
                                        <th>Request date</th>
                                        <th>Closed</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.lands.map((land, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{land.requestId}</td>
                                                    <td>{land.landId}</td>
                                                    <td>{land.owner}</td>
                                                    <td>{land.ownerOk?"Yes":"No"}</td>
                                                    <td>{land.buyer}</td>
                                                    <td>{land.buyerOk?"Yes":"No"}</td>
                                                    <td>{window.web3.utils.fromWei(land.amount.toString(), "ether")}</td>
                                                    <td>{land.requestDate}</td>
                                                    <td>{land.closed?"Yes":"No"}</td>
                                                    <td>
                                                        {land.ownerOk && land.buyerOk && !land.closed? <button className='btn btn-primary' onClick={ () => this.LandTransfer(land.requestId)}>Transfer</button>: ""}
                                                        {/*<button className='btn btn-primary' onClick={ () => this.LandTransfer(land.requestId)}>Transfer</button>*/}
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

export default AllBuyLandRequest;