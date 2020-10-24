import React, { Component } from "react";
import BlockchainService from "../../services/BlockchainService";

class AllRequests extends Component {

    constructor(props) {
        super(props);
        this.init();
        this.bindEvents();
    }
    componentDidMount() {
        let landId = window.localStorage.getItem('landId')
        this.setState({landId:landId})
    }

    init(){
        this.state = {
            landId: '',
            owner: '',
            updatedDate: ''
        };
    }
    bindEvents = ( ) => {
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e){
        this.setState({ [e.target.id]: e.target.value});
        e.preventDefault();
    }

    handleSubmit = (event) => {
        if (!this.state.landId || !this.state.amount) {
            alert("Land Id and Amount must have value.")
        } else {
            var requestId = "Req-"+ this.state.landId.toString() + Date.now().toString()
            BlockchainService.buyRequestByRequestIdAndLandIdAndAmount(requestId, this.state.landId, this.state.amount, this.props);
        }
        event.preventDefault();
    }

    render() {
        const {errors} = this.state;
        return (
            <main className="container">
                <div className="header-panel">
                    <div className="row">
                        <h2>Request Buy Land</h2>
                    </div>
                    <div className="row">
                        <form method="POST" onSubmit={this.handleSubmit} noValidate>
                            <div className="form-group">
                                <label>Land Id</label>
                                <input type="text" className="form-control" value={this.state.landId} name="landId" id="landId" onChange={this.handleChange} noValidate disabled/>
                            </div>
                            <div className="form-group">
                                <label>Amount (in Ether)</label>
                                <input type="text" className="form-control" name="amount" id="amount" onChange={this.handleChange} noValidate />
                            </div>
                            <div className="clearfix">
                                <button type="submit" className="btn btn-success">Buy</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}
export default AllRequests;