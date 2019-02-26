import Profile from './Profile'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    TexelTiles: state.contracts.TexelTiles
  }
}

const ProfileContainer = drizzleConnect(Profile, mapStateToProps);

export default ProfileContainer