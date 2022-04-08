const UNIQ_Application = artifacts.require("UNIQ_Application");

module.exports = function(deployer) {
    //await deployer.deploy(UNIQ_Application);
    deployer.deploy(UNIQ_Application);
};
