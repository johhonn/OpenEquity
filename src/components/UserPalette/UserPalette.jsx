import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import store from '../../store'

import userPaletteStyles from '../../assets/jss/texel-tiles/components/userPaletteStyle.jsx';

class UserPalette extends React.Component {
    constructor(props) {
        super(props)

        this.handlePaintTile = this.handlePaintTile.bind(this)
        this.setUserPalette = this.setUserPalette.bind(this)
    }

    setUserPalette() {
        let userPaletteDisplay = []
        for (let i = 0; i < store.getState().palette.length; i++) {
            const paintID = store.getState().palette[i][0]
            const paint = store.getState().palette[i][1]
            const styleString = {
                background: paint.toString(),
                width: 20,
                height: 20,
                marginTop: 0,
                marginLeft: "auto",
                marginRight: "auto",
                display: "inline-block"
            }
            userPaletteDisplay.push(<div key={paint} style={styleString} onClick={() => this.handlePaintTile(paintID)}/>)
        }
        return userPaletteDisplay
    }

    handlePaintTile(color) {
        this.props.onClose()
        this.props.contracts.TexelTiles.methods.paintTile(this.props.tile, color).send({from: this.props.accounts[0]})
    }

    render() {
        if (store.getState().palette === null) {
            return(
                <div>
                    Colors Loading...
                </div>
            )
        } else {
            return(
                <div>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h3>Pick a Color:</h3>
                        {this.setUserPalette()}
                    </GridItem>
                    </GridContainer>
                </div>
            )
        }
    }
}

UserPalette.propTypes = {
    contracts: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    tile: PropTypes.number,
    onClose: PropTypes.func.isRequired,
};

export default withStyles(userPaletteStyles)(UserPalette);