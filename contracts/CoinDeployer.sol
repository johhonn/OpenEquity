pragma solidity ^0.4.15;

import "./Coin.sol";



contract CoinDeployer{

mapping(uint=>address) deployedAddresses;
mapping(address=>uint[]) CoinIDs;
uint CoinID;
address TreeDeploy;
address[] _PartnerArray;
uint[] _NumParams;
constructor(address _tree){
TreeDeploy =_tree;
}
function deployCoin(
   address _authorAddress,
   

   string _tokenName,
   
   string _tokenSymbol,
   uint[] PartnerShares,
   uint[] _NumParams,
   address[] PartnerArray
  
   ){
   _PartnerArray=PartnerArray;
   _PartnerArray.push(TreeDeploy);
Coin c= new Coin(_authorAddress,_tokenName,_tokenSymbol,PartnerShares,_NumParams,_PartnerArray);


 if(!TreeDeploy.call(bytes4(sha3('deployTree(address,uint256,address)')),address(c),_NumParams[4],address(this))) revert();
deployedAddresses[CoinID]=address(c);
CoinID+=1;
CoinIDs[msg.sender].push(CoinID);

}

function getCoinLocation(uint coin) constant returns(address){
  return deployedAddresses[coin];
}






}
