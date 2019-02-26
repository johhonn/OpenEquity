import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import NotRentedDialog from './Sections/NotRentedDialog.jsx'
import RentedByUserDialog from './Sections/RentedByUserDialog'
import RentedDialog from './Sections/RentedDialog'

const styles = {};

class TileDialog extends React.Component {z

    handleGetTileColor = () => {
        if(this.props.tiles[this.props.tile-1].painted) {
            return  "hsl("+this.props.tiles[this.props.tile-1].hue+",100%,"+this.props.tiles[this.props.tile-1].light+"%)"
        } else {
            return ""
        }
    }

    render() {
        const { classes } = this.props;

        const paperstyles = {
            paper: {
                display: 'flex',
                flexDirection: 'column',
                margin: 48,
                position: 'relative',
                outline: 'none',
                overflowX: 'visible',
                overflowY: 'visible',
            }
        }

        if(!this.props.tiles[this.props.tile-1].rented) {
            return (
                <NotRentedDialog
                    tile={this.props.tile}
                    open={this.props.open}
                    onClose={this.props.onClose}
                    contracts={this.props.contracts}
                    accounts={this.props.accounts}
                    tiles={this.props.tiles}
                    classes={classes}
                />
            )
        } else if(this.props.tiles[this.props.tile-1].renter.toLowerCase() === this.props.accounts[0].toLowerCase()) {
            return (
                <RentedByUserDialog
                    tile={this.props.tile}
                    open={this.props.open}
                    onClose={this.props.onClose}
                    contracts={this.props.contracts}
                    accounts={this.props.accounts}
                    tiles={this.props.tiles}
                    classes={classes}
                    paperstyles={paperstyles}
                />
            )
        } else {
            return (
                <RentedDialog
                    tile={this.props.tile}
                    open={this.props.open}
                    onClose={this.props.onClose}
                    contracts={this.props.contracts}
                    accounts={this.props.accounts}
                    tiles={this.props.tiles}
                    classes={classes}
                />
            )
        }
    }
}

TileDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    tile: PropTypes.number,
    contracts: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    tiles: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(TileDialog);