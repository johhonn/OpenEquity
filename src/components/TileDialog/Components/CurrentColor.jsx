import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Color from 'color'

const styles = {
    currentcolor: {
        marginTop: -20,
        marginLeft: 27,
        marginRight: "auto",
    },
    hexcolor: {
        textDecoration: 'underline',
    },
    hexdiv: {
        marginTop: -18
    }
};

class CurrentColor extends React.Component {
    constructor(props) {
        super(props)
    }

    handleGetTileColor = () => {
        if(this.props.tiles[this.props.tile-1].painted) {
            let hslColor =  Color("hsl("+this.props.tiles[this.props.tile-1].hue+",100%,"+this.props.tiles[this.props.tile-1].light+"%)")
            return ""+hslColor.hex()

        } else {
            return "NOT PAINTED"
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.currentcolor}>
                <h5>Current Color</h5>
                <div className={classes.hexdiv}>
                    <h3 className={classes.hexcolor} style={{color: this.handleGetTileColor()}}>{this.handleGetTileColor()}</h3>
                </div>
            </div>
        );
    }
}

CurrentColor.propTypes = {
    classes: PropTypes.object.isRequired,
    tile: PropTypes.number.isRequired,
    tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(CurrentColor);