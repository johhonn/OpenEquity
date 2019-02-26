import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        marginTop: -15,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 90,
    },
    number: {
        textAlign: 'center',
        marginTop: 2
    },
    numberdiv: {
        maxHeight: 10
    }

};

class TileCard extends React.Component {
    constructor(props) {
        super(props)
    }

    handleGetTileColor = () => {
        if(this.props.tiles[this.props.tile-1].painted) {
            return  "hsl("+this.props.tiles[this.props.tile-1].hue+",100%,"+this.props.tiles[this.props.tile-1].light+"%)"
        } else {
            return "hsl(0,0%,85%)"
        }
    }

    handleDisplayTileNumber = () => {
        let tile = this.props.tile

        if(tile<10) {return "000"+tile}
        else if(tile<100) {return "00"+tile}
        else if(tile<1000) {return "0"+tile}
        else {return ""+tile}
    }

    render() {
        const { classes } = this.props;

        const tileStyle = {
            background: this.handleGetTileColor(),
            width: 100,
            height: 75,
            marginTop: 0,
            marginLeft: "auto",
            marginRight: "auto",
        }

        return (
            <Link to={"/tiles/"+this.props.tile} style={{ textDecorationLine: 'none' }}>
                <Card raised className={classes.card}>
                    <div style={tileStyle} />
                    <div className={classes.numberdiv}>
                        <h2 className={classes.number}>
                            {this.handleDisplayTileNumber()}
                        </h2>
                    </div>
                </Card>
            </Link>
        );
    }
}

TileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  tile: PropTypes.number.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(TileCard);