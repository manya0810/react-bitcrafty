/* truffle-config.js */
//require("@nomiclabs/hardhat-waffle")

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "5777"
            //, gas: 4600000
        }
        //,
        //ropsten: {
        //    provider: function () {
       //         return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3")
       //     },
        //    network_id: 3,
        //    gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
       // }
    },
    compilers: {
        solc: {
            version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            // settings: {          // See the solidity docs for advice about optimization and evmVersion
            //  optimizer: {
            //    enabled: false,
            //    runs: 200
            //  },
            //  evmVersion: "byzantium"
            // }
        }
    },
};



