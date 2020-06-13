var contractAddress = '0xef1c2d8e7c819ff2fa8eae40e27b53f9c676735c';
var contractMyAddress = '';
var abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "fundsWallet", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "unitsOneEthCanBuy", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalEthInWei", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }];
var simpleStorageContract;
var simpleStorage;
window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    // Now you can start your app & access web3 freely:
    startApp();
});

var getParameter = function (param) {
    var returnValue;
    var url = location.href;
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    for (var i = 0; i < parameters.length; i++) {
        var varName = parameters[i].split('=')[0];
        if (varName.toUpperCase() == param.toUpperCase()) {
            returnValue = parameters[i].split('=')[1];
            return decodeURIComponent(returnValue);
        }
    }
};

function setAddresss(){
    //alert(getParameter('id'));
    document.getElementById('myaddd').value = getParameter('id');
}

function startApp() {
    // Modern DApp Browsers
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            window.ethereum.enable().then(function () {
                // User has allowed account access to DApp...
            });
        } catch (e) {
            // User has denied account access to DApp...
        }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
        alert('You have to install MetaMask !');
    }
    simpleStorageContract = web3.eth.contract(abi);
    simpleStorage = simpleStorageContract.at(contractAddress);

    document.getElementById('contractAddr').innerHTML = getLink(contractAddress);
    web3.eth.getAccounts(function (e, r) {
        if (e) {
            document.getElementById('accountAddr').innerHTML = "메타마스크를 설치해주세요.";
            //alert("메타마스크를 설치해주세요")
        } else {
            document.getElementById('accountAddr').innerHTML = getLink(r[0]);
            contractMyAddress = r[0];
            getValue();
        }

    });
}


function getLink(addr) {
    return '<a target="_blank" href=https://ropsten.etherscan.io/address/' + addr + '>' + addr + '</a>';
}

function getValue() {
    console.log("contractMyAddress: " + contractMyAddress);
    simpleStorage.balanceOf(contractMyAddress, function (error, success) {
        if (error) console.log("Something went wrong: " + error);
        else {
            var tmpp = ((success.toString(10)) / 1000000000000000000);
            document.getElementById('storedSEN').innerHTML = tmpp.toString();
            console.log("Balance: " + tmpp.toString());
        }
    });

    web3.eth.getBalance(contractMyAddress, function (error, result) {
        if (error) console.log("Something went wrong: " + error);
        else {
            console.log('Ether:', web3.fromWei(result, 'ether'));
            document.getElementById("storedETH").innerHTML = web3.fromWei(result, 'ether');
        }
    });
    web3.eth.getBlockNumber(function (e, r) {
        if (r == undefined) {
            document.getElementById('lastBlock').innerHTML = "메타마스크를 설치해주세요";
        } else {
            document.getElementById('lastBlock').innerHTML = r;
        }
    });
}
function setValue() {
    alert("에너지 구매를 시도합니다.");
    web3.eth.getAccounts(function (error, result) {
        web3.eth.sendTransaction(
            {
                from: result[0],
                to: "0xef1c2d8e7c819ff2fa8eae40e27b53f9c676735c",
                value: web3.toWei(buyeth, "ether"), //200000 Wei
            }, function (err, transactionHash) {
                if (!err)
                    console.log(transactionHash);
            });
    });
    // var newValue = document.getElementById('newValue').value;
    // var txid
    // simpleStorage.set(newValue, function (e, r) {
    //     document.getElementById('result').innerHTML = 'Transaction id: ' + r + '<span id="pending" style="color:red;">(Pending)</span>';
    //     txid = r;
    // });
    // var filter = web3.eth.filter('latest');
    // filter.watch(function (e, r) {
    //     getValue();
    //     web3.eth.getTransaction(txid, function (e, r) {
    //         if (r != null && r.blockNumber > 0) {
    //             document.getElementById('pending').innerHTML = '(기록된 블록: ' + r.blockNumber + ')';
    //             document.getElementById('pending').style.cssText = 'color:green;';
    //             document.getElementById('storedData').style.cssText = 'color:green; font-size:300%;';
    //             filter.stopWatching();
    //         }
    //     });
    // });
}
