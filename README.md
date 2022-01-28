# Land Registration and Transfer - dapp (Ethereum Blockchain, Spring Boot REST Back-end, MySQL, and React JS front-end)
The project is build up with MetaMask Ethereum blockchain, Spring Boot Rest Back-end, MySQL database, and React JS front-end. 

## Backend using Spring Boot and MySQL DB

## 1. Installing Metamask
Step 1. Go to the Metamask website.
Step 2. Click “Get Chrome Extension” to install Metamask.
Step 3. Click “Add to Chrome” in the upper right.
Step 4. Click “Add Extension” to complete the installation.

## After MetaMask installation in browser

Step 1. Click on the Metamask logo in the upper right hand corner of your Google chrome browser and click on Create a Wallet as shown in figure.
![image](https://user-images.githubusercontent.com/38654670/151543221-edf4a3a8-fefd-4bb8-96ab-0f3d7ed35e73.png)

Step 2. Read and agree to the terms and conditions. You may have to agree to 2 to 3 pages worth of terms.
![image](https://user-images.githubusercontent.com/38654670/151543344-c46b099b-b22b-4553-8112-5226b1571157.png)

Step 3. Enter a password and click “Create” to create your wallet.
![image](https://user-images.githubusercontent.com/38654670/151543468-db0a1776-e064-4b64-97ee-110524baeee4.png)

Step 4. You will see a set of 12 “seed words” for your vault. Click “Save Seed Words as File” and copy the “MetaMask Seed Words” file that is downloaded to a safe place. You will need it to access your vault.
Step 5. Click “I’ve Copied It Somewhere Safe” once your seed words file has been secured. You’ll be taken into your Metamask wallet!
![image](https://user-images.githubusercontent.com/38654670/151542960-feb606f4-bfd7-4747-b57e-7d0009ccb238.png)

Step 5. Then you will see the MetaMask Account as shown in below figure and you can create account. 

![image](https://user-images.githubusercontent.com/38654670/151543694-f627eec6-bce5-4a45-aebd-0c5e751d69d5.png)

Step 6. You can see the list of created accounts with ETH value. You can buy the ETH amount in the respective account wallet. 

![image](https://user-images.githubusercontent.com/38654670/151544091-883ee6e3-7504-4889-995b-72bd3ec2d637.png)

## Smart Contracts 
You will find the smart contracts in contracts folder and which contains the LandRegistry.sol smart contracts written in ethereum solidity.

## Front-end using Vue JS

## 1. Node JS setup
1. Download Node JS from [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and install it in your system. The Node Package Manager (npm) is used to install React.js
and check the version of installed npm
```
npm --version
```
## 2. React.js install
```
npm install react
```
### 3. Create React js app from command line
```
npm init react-app your_app_name
```
### 4.  then go to the your_app_name folder
```
cd your_app_name 
```
### 5. Run the React JS (your app)
```
npm start
```

### Land Registration and Transfer - dapp
### 1. Technical Instruction
1. Download project from [https://github.com/tghising/land-registration-and-transfer-dapp](https://github.com/tghising/land-registration-and-transfer-dapp) from GitHub.
2. You can see two directories i) server for Backend (Spring Boot and MySQL) and ii) client for frontend (React.js)
### Backend project (i.e. server directory)
1. Create "lands_dapp" database in MySQL for the project then
2. Go to server directory and run the Spring Boot Project and it will serve and listen on port: 9099 (config in application.properties) 

### Create Ethereum Accounts and load wallets

### Frontend project (i.e. client directory)
1. Go to client directory i.e. cd client then run following commands in command line
```
npm install 
```
2. Run the frontend app
```
npm start
```
3. then, go to [http://localhost:3000](http://localhost:3000)


## Thanks.

