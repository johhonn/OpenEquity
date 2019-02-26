import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'
import TileCard from '../Components/TileCard'
import CurrentColor from '../Components/CurrentColor'
import CurrentRenter from '../Components/CurrentRenter';
import { Grid } from '@material-ui/core'
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

class RentedDialog extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.tile.renter)
    }
    handleClose = () => {
        this.props.onClose()
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
                            <CurrentRenter tile={this.props.tile} tiles={this.props.tiles} isUser={false} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

RentedDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    tile: PropTypes.number,
    contracts: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    tiles: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(RentedDialog)