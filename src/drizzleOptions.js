
import Coin from '../build/contracts/Coin.json'
import CoinDeployer from '../build/contracts/CoinDeployer.json'
const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [CoinDeployer,Coin],
  events: {
  
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions