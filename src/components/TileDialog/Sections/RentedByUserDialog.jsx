import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button'
import TileCard from '../Components/TileCard'
import CurrentColor from '../Components/CurrentColor'
import { Grid } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles';
import CurrentRenter from '../Components/CurrentRenter';
import UserPalette from '../../UserPalette/UserPalette';

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

class RentedByUserDialog extends React.Component {
    handleClose = () => {
        this.props.onClose()
    }

    handlePaintTile = () => {
        this.props.onClose()
        this.props.contracts.TexelTiles.methods.paintTile(this.props.tile, 3).send({from: this.props.accounts[0]})
    }

    handleMixTile = () => {
        this.props.onClose()
        this.props.contracts.TexelTiles.methods.mixTile(this.props.tile).send({from: this.props.accounts[0]})
    }

    render() {
        const { classes, onClose, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} classes={{paper: classes.paper}}>
                <TileCard tile={this.props.tile} tiles={this.props.tiles} />
                <br/>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <CurrentColor tile={this.props.tile} tiles={this.props.tiles} />
                        </Grid>
                        <Grid item xs={6}>
                            <CurrentRenter tile={this.props.tile} tiles={this.props.tiles} isUser={true} />
                        </Grid>
                    </Grid>
                    <Button onClick={this.handleMixTile} color="primary">
                        MIX
                    </Button>
                    <UserPalette contracts={this.props.contracts} accounts={this.props.accounts} tile={this.props.tile} onClose={this.props.onClose} />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={this.handlePaintTile} color="primary">
                        Paint
                    </Button>
                    <Button onClick={this.getTileHistory} color="primary">
                        test
                    </Button>
                </DialogActions> */}
            </Dialog>
        )
    }
}

RentedByUserDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    tile: PropTypes.number,
    contracts: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    tiles: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(RentedByUserDialog)