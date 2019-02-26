import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button'
import TileCard from '../Components/TileCard'

import { withStyles } from '@material-ui/core/styles';

const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        margin: 48,
        position: 'relative',
        outline: 'none',
        overflowX: 'visible',
        overflowY: 'visible',
        width: 400
    }
}

class NotRentedDialog extends React.Component {
    handleClose = () => {
        this.props.onClose()
    }

    handleRentTile = () => {
        this.props.onClose()
        this.props.contracts.TexelTiles.methods.rentTile(this.props.tile).send({from: this.props.accounts[0], value: 1000000000000000})
    }

    render() {
        const { classes, onClose, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} classes={{paper: classes.paper}}>
                <TileCard tile={this.props.tile} tiles={this.props.tiles} />
                <br/>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This is tile #{this.props.tile}. This tile is currently available to rent for .01ETH.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRentTile} color="primary">
                        Rent
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

NotRentedDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    tile: PropTypes.number,
    contracts: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    tiles: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(NotRentedDialog)