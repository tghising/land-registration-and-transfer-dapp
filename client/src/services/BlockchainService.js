import {LAND_REGISTRY_CONTRACT_ABI,LAND_REGISTRY_CONTRACT_ADDRESS} from '../Configurations'
import getWeb3 from "../getWeb3";
import FetchService from "./FetchService";

// Get network provider and web3 instance.
class BlockchainService {

    // function to instantiate the land contract
    instantiateLandContract = async () => {
        return new Promise(async resolve => {
            try {
                // Get network provider and web3 instance.
                const web3 = await getWeb3();
                window.web3 =  web3;
                // Get the contract instance.
                const contractInstance = new web3.eth.Contract(LAND_REGISTRY_CONTRACT_ABI,LAND_REGISTRY_CONTRACT_ADDRESS);
                window.contractInstance = contractInstance
                resolve(await this.getCurrentRegistrar())
                // return contractInstance

            } catch (error) {
                // Catch any errors for any of the above operations.
                alert('Failed to load web3, accounts, or contract. Check console for details.');
                console.error(error);
                throw new error
            }
        })
    };

    // method to set the registrar in current app
    getCurrentRegistrar = async () => {
        window.REGISTRAR = await window.contractInstance.methods.registrar().call()
    }

    watchEvents = async () => {
        console.log(window.contractInstance);
    };

    // method to register land

    registerLand = (landId, owner, props) => {
        return new Promise(resolve => {
            // contract function to register new land using landId and owner address
            window.contractInstance.methods.register(landId, owner).send({
                from: window.ethereum.selectedAddress
            }).on('receipt', function(receipt) {

                // new registration contract events
                window.contractInstance.events.NewRegistration({ fromBlock: 0})
                    .on('data', function (event) {
                        let landsEvents = event.returnValues;
                        console.log(landsEvents)
                        let land = {
                            landId: landsEvents.landId,
                            owner: landsEvents.owner.toUpperCase(),
                            updatedDate: new Date(landsEvents.timestamp*1000).toISOString()
                        }

                        // save the new land in mysql database
                        FetchService.saveLand(land)
                            .then(response => {
                                if (response.status >= 400) {
                                    throw new Error("Bad response from server");
                                } else if(response.status === 200) {
                                    console.log("New Land has been registered successfully!");
                                    // reloading the updated lands in land dashboard
                                    props.history.push('/lands');
                                }
                            }).catch(error => {
                            console.error("Error is: " + error);
                        });
                    }).on('error', function (error, receipt) {
                    console.log(error)
                })
            }).on('error', function (error, receipt) {
                console.log(error)
                alert(error.message)
            })
        })
    }

    // method to buy request by request id, land id, and amount
    buyRequestByRequestIdAndLandIdAndAmount = (requestId, landId, amount, props) => {
        return new Promise(resolve => {
            // contract function/method to buy request the others land using request id and land Id
            window.contractInstance.methods.buyRequest(requestId, landId).send({
                from: window.ethereum.selectedAddress,
                value: window.web3.utils.toWei(amount, "ether")
            }).on('receipt', function(receipt) {
                // contract events to records buy request
                window.contractInstance.events.BuyRequest({ fromBlock: 0})
                    .on('data', function (event) {
                        let buy = event.returnValues;
                        let buyRequest = {
                            requestId: buy.requestId,
                            landId: buy.landId,
                            owner: buy.owner.toUpperCase(),
                            buyer: buy.requester.toUpperCase(),
                            amount: buy.amount,
                            requestDate: new Date(buy.timestamp*1000).toISOString(),
                            updatedDate: new Date(buy.timestamp*1000).toISOString(),
                            buyerOk: true,
                            ownerOk: false,
                            closed: false
                        }
                        // save buy request in the database
                        FetchService.saveBuyRequest(buyRequest)
                            .then(response => {
                                if (response.status >= 400) {
                                    throw new Error("Bad response from server");
                                } else if(response.status === 200) {
                                    console.log("Land has been buy requested successfully.");
                                    props.history.push('/own');
                                }
                            }).catch(error => {
                            console.error("Error is: " + error);
                        });
                    }).on('error', function (error, receipt) {
                    console.log(error)
                })
            }).on('error', function (error, receipt) {
                console.log(error)
                alert(error.message)
            })
        })
    }

    // method to withdraw land buy request using request id
    withdrawLandBuyRequest = (requestId, props) => {
        return new Promise(resolve => {
            // contract function/method to withdraw a buy request the others land using request id
            window.contractInstance.methods.withdrawBuyRequest(requestId).send({
                from: window.ethereum.selectedAddress
            }).on('receipt', function(receipt) {

                // contract events to withdraw the buy request
                window.contractInstance.events.Withdrawal({ fromBlock: 0})
                    .on('data', function (event) {
                        let requestEvents = event.returnValues;

                        // fetch the buy request with request id
                        FetchService.getBuyRequestByRequestId(requestEvents.requestId)
                            .then(response => {
                                if (response.status >= 400) {
                                    throw new Error("Bad response from server");
                                } else if(response.status === 200) {
                                    let data = response.data
                                    data.closed = true;
                                    data.updatedDate = requestEvents.timestamp;

                                    // update the withdraw land buy request in the database
                                    FetchService.updateBuyRequest(data)
                                        .then(response => {
                                            if (response.status >= 400) {
                                                throw new Error("Bad response from server");
                                            } else if(response.status === 200) {
                                                props.history.push('/own');
                                                console.log("Buy request for the land "+ data.landId + " has been accepted successfully.")
                                            }
                                        }).catch(error => {
                                        console.log("Error is: " + error)
                                    })
                                }
                            }).catch(error => {
                            console.error("Error is: " + error);
                        });
                    }).on('error', function (error, receipt) {
                    console.log(error)
                })
            }).on('error', function (error, receipt) {
                console.log(error)
                alert(error.message)
            })
        })
    }

    // method to accept land buy request with request id from the land owner
    acceptLandBuyRequestByRequestId = (requestId, props) => {
        return new Promise(resolve => {
            // contract function/method to accept buy request the others land using request id
            window.contractInstance.methods.acceptBuyRequest(requestId).send({
                from: window.ethereum.selectedAddress
            }).on('receipt', function(receipt) {

                // contract event to accept buy request by the owner
                window.contractInstance.events.AcceptBuyRequest({ fromBlock: 0 })
                    .on('data', function (event) {
                        let requestEvents = event.returnValues;

                        // fetch the buy request land with request id
                        FetchService.getBuyRequestByRequestId(requestEvents.requestId)
                            .then(response => {
                                if (response.status >= 400) {
                                    throw new Error("Bad response from server");
                                } else if(response.status === 200) {
                                    let data = response.data
                                    data.ownerOk = true;
                                    data.updatedDate = requestEvents.timestamp;

                                    // update the land buy request by the land owner
                                    FetchService.updateBuyRequest(data)
                                        .then(response => {
                                            if (response.status >= 400) {
                                                throw new Error("Bad response from server");
                                            } else if(response.status === 200) {
                                                props.history.push('/own');
                                                console.log("Buy request for the land "+ data.landId + "has been accepted successfully.")
                                            }
                                        }).catch(error => {
                                        console.log("Error is: " + error)
                                    })
                                }
                            }).catch(error => {
                            console.error("Error is: " + error);
                        });
                    }).on('error', function (error, receipt) {
                    console.log(error)
                })
            }).on('error', function (error, receipt) {
                console.log(error)
                alert(error.message)
            })
        })
    }

    // method to land transfer with request id by the registrar of the land office
    landTransferByRequestId = (requestId) => {
        return new Promise(resolve => {

            // contract function/method to transfer the land with request id by the registrar of the land office
            window.contractInstance.methods.transfer(requestId).send({
                from: window.ethereum.selectedAddress
            }).on('receipt', function(receipt) {

                // contract event to transfer the land  by registrar of the land office
                window.contractInstance.events.Transfer({ fromBlock: 0})
                    .on('data', function(event){
                        let request = event.returnValues

                        // fetch the land buy request by registrar
                        FetchService.getBuyRequestByRequestId(request.requestId)
                            .then(response => {
                                if (response.status >= 400) {
                                    throw new Error("Bad response from server");
                                } else if(response.status === 200) {
                                    let data = response.data
                                    data.closed = true;
                                    data.updatedDate = request.timestamp;

                                    // update the land from owner to buyer by the registrar of the office in the database
                                    FetchService.updateBuyRequest(data)
                                        .then(response => {
                                            if(response.status === 200) {
                                                FetchService.getLandById(data.landId)
                                                    .then(response => {
                                                        if (response.status === 200 ) {
                                                            let land = response.data
                                                            land.owner = data.buyer.toUpperCase()
                                                            FetchService.saveLand(land)
                                                                .then(response => {
                                                                    if (response.status === 200) {
                                                                        console.log("Land has been transferred successfully.")
                                                                    }
                                                                })
                                                        }
                                                    })
                                            }
                                        })
                                }
                            }).catch(error => {
                            console.error("Error is: " + error);
                        });
                    })
                    .on('error', function (error, receipt) {
                        console.log(error)
                    })
            }).on('error', function (error, receipt) {
                console.log(error)
                alert(error.message)
            })
        })
    }


    /*
    initializeSimpleContract = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance }, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };*/
}
export default new BlockchainService();