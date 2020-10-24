import React, {Component} from "react";

import FetchService from "../../services/FetchService";
import BlockchainService from "../../services/BlockchainService";
class OwnLands extends Component {

    constructor(props) {
        super(props);
        this.init();
        this.bindEvents();
    }

    componentDidMount() {
        let owner = new String(window.ethereum.selectedAddress).toUpperCase();
        this.getAllLandByOwner(owner);
        this.getAllBuyerRequest(owner);
        this.getAllOwnerRequest(owner);
    }

    getAllLandByOwner = (owner) => {
        FetchService.getLandByOwner(owner)
            .then(response => {
                this.setState({
                    ownLandList:response.data
                })
            }).catch(errr => {
            console.log('Error: '+ errr);
        })
    }

    getAllBuyerRequest = (owner) => {
        FetchService.getAllBuyerRequest(owner)
            .then(response => {
                this.setState({buyRequestLandList:response.data})
            }).catch(errr => {
            console.log('Error: '+ errr);
        });
    }

    getAllOwnerRequest = (owner) => {
        FetchService.getAllOwnerRequest(owner)
            .then(response => {
                this.setState({sellRequestLandList:response.data})
            }).catch(errr => {
            console.log('Error: ' + errr);
        });
    }

    buyLand = (landId) => {
        window.localStorage.setItem('landId', landId);
        this.props.history.push('/buy/add');
    }

    init(){
        this.state= {
            ownLandList:[],
            buyRequestLandList:[],
            sellRequestLandList:[]
        }
    }

    bindEvents(){
        this.handleChange = this.handleChange.bind(this);
        this.acceptBuyRequest = this.acceptBuyRequest.bind(this);
        this.withdrawBuyRequest = this.withdrawBuyRequest.bind(this);
    }

    handleChange = ( event ) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    acceptBuyRequest(requestId) {
        BlockchainService.acceptLandBuyRequestByRequestId(requestId, this.props)
    }

    withdrawBuyRequest = (requestId) => {
        BlockchainService.withdrawLandBuyRequest(requestId, this.props)
    }

    render() {
        if (!window.contractInstance) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            // Main Container end here
            // Main Container start here
            <main role="main" className="container">
                <div className="row">
                    <h3>Own land list</h3>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th>Land Id</th>
                                <th>Last updated</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.ownLandList.map((land, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{land.landId}</td>
                                            <td>{land.updatedDate}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="clearfix"></div>
                <div className="row">
                    <h3>Buy land requests</h3>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th>Request Id</th>
                                <th>Land Id</th>
                                <th>Owner</th>
                                <th>Amount (Ether)</th>
                                <th>Request date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.buyRequestLandList.map((land, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{land.requestId}</td>
                                            <td>{land.landId}</td>
                                            <td>{land.owner}</td>
                                            <td>{window.web3.utils.fromWei(land.amount.toString(), "ether")}</td>
                                            <td>{land.requestDate}</td>
                                            <td>
                                                {!land.ownerOk && land.buyerOk && !land.closed? <button className='btn btn-primary' onClick={ () => this.withdrawBuyRequest(land.requestId)}>Withdraw</button>: ""}
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <h3>Sell land requests</h3>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th>Request Id</th>
                                <th>Land Id</th>
                                <th>Buyer</th>
                                <th>Amount (Ether)</th>
                                <th>Request date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.sellRequestLandList.map((land, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{land.requestId}</td>
                                            <td>{land.landId}</td>
                                            <td>{land.buyer}</td>
                                            <td>{window.web3.utils.fromWei(land.amount.toString(), "ether")}</td>
                                            <td>{land.requestDate}</td>
                                            <td>
                                                {!land.ownerOk && land.buyerOk && !land.closed ? <button className='btn btn-primary' onClick={ () => this.acceptBuyRequest(land.requestId)}>Agree</button>:""}
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        );
    }
}
export default OwnLands;