import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import { AccountData } from 'drizzle-react-components'
import UserPalette from "../../components/UserPalette/UserPalette";
import store from '../../store'
import { updatePalette } from '../../actions';

import profileStyles from "../../assets/jss/texel-tiles/views/profileStyles";

class Profile extends React.Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
  }

  componentDidMount(){
    store.dispatch(updatePalette(this.props.accounts[0], this.contracts));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h1>Display profile information.</h1>
            <h3>Your Account:</h3>
            <AccountData accountIndex="0" units="ether" precision="3" />
            <br/>
            <UserPalette contracts={this.contracts} accounts={this.props.accounts} />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Profile.contextTypes = {
  drizzle: PropTypes.object
}

export default withStyles(profileStyles)(Profile);
