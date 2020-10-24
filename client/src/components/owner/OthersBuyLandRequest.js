import React, {Component} from "react";
import FetchService from "../../services/FetchService";
import BlockchainService from "../../services/BlockchainService";

class OthersBuyLandRequest extends Component {
    constructor(props) {
        super(props);
        this.init();
        this.bindEvents();
    }

    componentDidMount() {
        let landId = window.localStorage.getItem('landId')
        this.getLandById(landId);
    }

    init(){
        this.state = {
            landId: '',
            owner: '',
            updatedDate: ''
        }
    }

    bindEvents(){
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = ( event ) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    getLandById = (landId) => {
        FetchService.getLandById(landId)
            .then(response => {
                let land = response.data;
                this.setState(land)
            }).catch(error => {
            console.log("Error is: " + error);
        })
    }

    buyRequest = (requestId, landId, amount) => {
        return new Promise(resolve => {
            window.contractInstance.methods.buyRequest(requestId, landId).send({
                from:window.ethereum.selectedAddress, value: window.web3.utils.toWei(amount, "ether")
            }).on('error', (err) => {
                console.log(err);
            })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        BlockchainService.buyRequestByRequestIdAndLandIdAndAmount(this.state.requestId, this.state.landId, this.state.amount, this.props);
    }

    render() {
        const {errors} = this.state;
        return (
            <main className="container">
                <div className="header-panel">
                    <div className="row">
                        <h2>Buy Land</h2>
                    </div>
                    <div className="row">
                        <form method="POST" onSubmit={this.handleSubmit} noValidate>
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.landId} name="landId" id="landId" placeholder="Land number" onChange={this.handleChange} noValidate disabled/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="requestId" id="requestId" placeholder="Request Id" onChange={this.handleChange} noValidate />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="amount" id="amount" placeholder="Amount" onChange={this.handleChange} noValidate />
                            </div>
                            <div className="clearfix">
                                <button type="submit" className="btn btn-success" >Buy</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}
export default OthersBuyLandRequest;
