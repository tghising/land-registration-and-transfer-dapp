import {Role} from "../Role";

class UserService {

    // rolebased security fully not implemented
    loggedCurrentUser = () => {
        let currentUser = {
            name:"User",
            role: Role.USER,
            isRegistrar: false
        }

        if (window.REGISTRAR.toUpperCase() === window.ethereum.selectedAddress.toUpperCase()) {
            currentUser = {
                name: "Registrar",
                role: Role.REGISTRAR,
                isRegistrar: true
            }
        }
        return currentUser;
    }
}
export default new UserService();