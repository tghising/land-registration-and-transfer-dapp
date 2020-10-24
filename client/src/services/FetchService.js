import axios from 'axios';
import {SERVER_BASE_URL} from "../Configurations";

class FetchService {

    // post method to save the new land
    saveLand = (data) => {
        return axios.post(SERVER_BASE_URL + 'lands', data);
    }

    // get method to pull all the lands
    getAllLand = () => {
        return axios.get(SERVER_BASE_URL + 'lands');
    }

    // get method all the lands except the owner
    getOthersAllLand = (owner) => {
        return axios.get(SERVER_BASE_URL + 'lands/others/' + owner);
    }

    // get method to fetch land by id
    getLandById = (id) => {
        return axios.get(SERVER_BASE_URL + 'lands/' + id);
    }

    // get method to get land by the owner
    getLandByOwner = (owner) => {
        return axios.get(SERVER_BASE_URL + 'lands/user/' + owner);
    }

    deleteLandById = (id) => {
        return axios.delete(SERVER_BASE_URL + 'lands/' + id);
    }

    updateLand = (data) => {
        return axios.put(SERVER_BASE_URL + 'lands', data);
    }


    // for BuyRequest
    saveBuyRequest = (data) => {
        return axios.post(SERVER_BASE_URL + 'buy', data);
    }

    updateBuyRequest = (data) => {
        return axios.put(SERVER_BASE_URL + 'buy', data);
    }

    getAllBuyRequest = () => {
        return axios.get(SERVER_BASE_URL + 'buy');
    }

    getAllBuyerRequest = (buyerAddress) => {
        return axios.get(SERVER_BASE_URL + 'buy/buyer/'+ buyerAddress);
    }

    getBuyRequestByRequestId = (id) => {
        return axios.get(SERVER_BASE_URL + 'buy' + '/' + id);
    }

    getAllOwnerRequest = (ownerAddress) => {
        return axios.get(SERVER_BASE_URL + 'buy/owner/'+ ownerAddress);
    }
}
export default new FetchService();