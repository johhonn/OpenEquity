import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Color from 'color'
import Button from '@material-ui/core/Button';
import color from '@material-ui/core/colors/indigo';

const styles = {
    button: {
        backgroundColor: '#ADD8E6',
        color: 'white',
        size: 'small'
      },
    currentrenter: {
        marginTop: -20,
        marginLeft: 27,
        marginRight: "auto",
    },
    hexcolor: {
        textDecoration: 'underline',
    },
    addressdiv: {
        marginTop: -18
    }
};

class CurrentRenter extends React.Component {
    constructor(props) {
        super(props)
    }

    handleGetRenter = () => {
       let address = this.props.tiles[this.props.tile-1].renter.toString()
       let n = address.length
       return address.substring(0,6)+"..."+address.substring(n-4,n)
    }

    render() {
        const { classes } = this.props;

        if(this.props.isUser) {
            return (
                <div className={classes.currentrenter}>
                    <h5>Current Renter</h5>
                    <div className={classes.addressdiv}>
                        <h3>{this.handleGetRenter()}</h3>
                        <Button className={classes.button}>YOU</Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={classes.currentrenter}>
                    <h5>Current Renter</h5>
                    <div className={classes.addressdiv}>
                        <h3>{this.handleGetRenter()}</h3>
                    </div>
                </div>
            );
        }
    }
}

CurrentRenter.propTypes = {
    isUser: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    tile: PropTypes.number.isRequired,
    tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(CurrentRenter);