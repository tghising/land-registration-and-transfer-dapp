pragma solidity ^0.5.0;

contract LandRegistry {

    // event for new re
    event NewRegistration(string landId, address owner, uint256 timestamp);
    event NewRegistrationFailed(string landId, address owner, uint256 timestamp);
    event OwnershipTransferred(string landId, address owner, address receiver, uint256 timestamp);
    event OwnershipTransferFailed(string landId, address owner, address receiver, uint256 timestamp);
    event BuyRequest(string requestId, string landId, address requester, address owner, uint256 amount, uint256 timestamp);
    event BuyRequestFailed(string requestId, string landId, address requester, address owner, uint256 amount, uint256 timestamp);
    event AcceptBuyRequest(string requestId, address acceptor, uint256 timestamp);
    event AcceptBuyRequestFailed(string requestId, address acceptor, uint256 timestamp);
    event Withdrawal(string requestId, address withdrawer, uint256 timestamp);
    event WithdrawalFailed(string requestId, address withdrawer, uint256 timestamp);
    event Transfer(string requestId, uint256 timestamp);
    event TransferFailed(string requestId, uint256 timestamp);

    // struct for buy request of land
    struct Buy {
        string landId;
        address payable buyer;
        address payable owner;
        uint requestPlacedTimestamp;
        uint256 amount;

        bool buyerOK;
        bool ownerOK;

        bool closed;
    }

    // registrar is the authorized person to transfer land
    address public registrar;

    // owner of the land
    mapping(string => address payable) owner;

    // buy order from buyer for the land
    mapping(string => Buy) buyOrder;

    // modifier to check address is null or not
    modifier notNullAddress(address someAddress) {
        require(someAddress != address(0));
        _;
    }

    // modifier to check message sender in null or nut
    modifier onlyRegistrar {
        require(msg.sender == registrar);
        _;
    }

    // constructor of the contract which initialized the registrar
    constructor(address _registrar) public notNullAddress (msg.sender) {
        registrar = _registrar;
    }

    // function to register the new land using land id and the owner address by only the authorized person registrar
    function register(string memory landId, address payable _owner) public onlyRegistrar notNullAddress(_owner) {
        if (owner[landId] != address(0)) { // new registration failed if land already exists
            emit NewRegistrationFailed(landId, _owner, now);
        } else {
            owner[landId] = _owner;
            emit NewRegistration(landId, _owner, now); // new registration event
        }
    }

    // internal function to transfer the land from old owner to new owner by the registrar of the land office
    function transfer(string memory landId, address payable oldOwner, address payable newOwner) internal notNullAddress(oldOwner) notNullAddress(newOwner) returns (bool) {
        if (owner[landId] == oldOwner) {
            emit OwnershipTransferred(landId, owner[landId], newOwner, now);
            owner[landId] = newOwner;
            return true;
        } else {
            emit OwnershipTransferFailed(landId, owner[landId], newOwner, now);
        }
        return false;
    }

    // function to place buy order of a land and deposit some amount in the contract
    function buyRequest(string memory requestId, string memory landId) public payable notNullAddress(msg.sender) {
        if (owner[landId] != address(0)) {
            buyOrder[requestId] = Buy(landId, msg.sender, owner[landId], now, msg.value, true, false, false);
            emit BuyRequest(requestId, landId, msg.sender, owner[landId], msg.value, now);
        } else {
            emit BuyRequestFailed(requestId, landId, msg.sender, owner[landId], msg.value, now);
        }
    }

    // function where land owner agrees on a land buy request
    function acceptBuyRequest(string memory requestId) public notNullAddress(msg.sender) {
        Buy storage buy = buyOrder[requestId];
        if (msg.sender == owner[buy.landId] && owner[buy.landId] == buy.owner) {
            if(!buy.closed) {
                buy.ownerOK = true;
                emit AcceptBuyRequest(requestId, msg.sender, now);
                return;
            }
        }
        emit AcceptBuyRequestFailed(requestId, msg.sender, now);
    }

    // function to withdraw the amount from the buy request of the land by the buyer
    function withdrawBuyRequest(string memory requestId) public notNullAddress(msg.sender) {
        Buy storage buy = buyOrder[requestId];
        if (msg.sender == buy.buyer && !buy.closed) {
            buy.closed = true;
            buy.buyer.transfer(buy.amount);
            emit Withdrawal(requestId, msg.sender, now);
        } else {
            emit WithdrawalFailed(requestId, msg.sender, now);
        }
    }

    // function to transfer, if both owner and buyer are ok by the registrar of the land office
    function transfer(string memory requestId) public onlyRegistrar {
        Buy storage buy = buyOrder[requestId];
        if (!buy.closed && buy.buyerOK && buy.ownerOK) {
            buy.closed = true;
            emit Transfer(requestId, now);
            if(transfer(buy.landId, buy.owner, buy.buyer)) {
                buy.owner.transfer(buy.amount);
            }
        } else {
            emit TransferFailed(requestId, now);
        }
    }

    // function to get owner of the land id
    function getOwner(string memory landId) public view returns (address) {
        return owner[landId];
    }

    // function to get details of the land buy order request
    function getBuyOrder(string memory requestId) public view returns (string memory, address, address, uint256, uint256, bool, bool, bool) {
        Buy storage buy = buyOrder[requestId];
        return (buy.landId, buy.owner, buy.buyer, buy.requestPlacedTimestamp, buy.amount, buy.buyerOK, buy.ownerOK, buy.closed);
    }
}