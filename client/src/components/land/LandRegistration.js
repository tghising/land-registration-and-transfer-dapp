import React, { Component } from "react";
import FetchService from "../../services/FetchService";
import BlockchainService from "../../services/BlockchainService";

class LandRegistration extends Component {

    constructor(props) {
        super(props);
        this.init();
        this.bindEvents();
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
        if (!this.state.owner) {
            alert("Owner of the land must have a value.")
        } else if(!this.state.landId) {
            alert("Id of the land must have a value.")
        } else {
            BlockchainService.registerLand(this.state.landId, this.state.owner, this.props)
        }
        event.preventDefault();
    }

    componentDidMount() {
    }

    render() {
        const {errors} = this.state;
        return (
            <main className="container">
                <div className="header-panel">
                    <div className="row">
                        <h2>Land registration</h2>
                    </div>
                    <div className="row">
                        <form method="POST" onSubmit={this.handleSubmit} noValidate>
                            <div className="form-group">
                                <label className="control-label">Land Id:</label>
                                <input type="text" className="form-control" name="landId" id="landId" placeholder="Land Id" onChange={this.handleChange} noValidate/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Land Owner</label>
                                <input type="text" className="form-control" name="owner" id="owner" placeholder="Land owner" onChange={this.handleChange} noValidate />
                            </div>
                            <div className="clearfix">
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}
export default LandRegistration;