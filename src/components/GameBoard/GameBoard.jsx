import React, { Component } from 'react'
import * as d3 from 'd3';
import PropTypes from "prop-types";
import TileDialog from '../TileDialog/TileDialog'

const transitionDuration = 400;
const r = 30;

function buildTilePath(x = 0, y = 0) {
  return d3.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveLinearClosed)([
      { x: r + x, y },
      { x, y: r + y },
      { x: x - r, y },
      { x, y: y - r }
    ]);
}
const tilePath = buildTilePath();

class GameBoard extends Component {
  state = {
    openDialog: false,
    clickedTile: 1
  }

  showNotification(d) {
    this.setState({ openDialog: true, clickedTile: d.tileId });
  }

  componentDidMount() {
    this.tileGroup = d3.select(this.svg).append('g');
    this.tileGroup.selectAll('.tile')
      .data(this.props.tiles)
      .enter()
      .append('svg:a')
        .attr('class', 'tile')
        .attr('id', d => {
          const cx = d.tileId;
          return `${cx}`;
        })
        .on('click', d => {
          this.showNotification(d)
          d3.event.preventDefault();
          d3.event.stopPropagation();
        })
        .append('path')
          .attr('d', tilePath)
          .attr('fill', d => {
            const hue = d.hue;
            const sat = d.sat;
            const light = d.light;
            return `hsl(${hue}, ${sat}%, ${light}%)`;
          })
          .attr('stroke', 'transparent')
          .attr('stroke-width', 1)
          .attr('transform', d => {
            const cx = (d.col * r * 1.45) + r;
            const cy = (d.row * r * 1.45) + r;
            return `translate(${cx}, ${cy}) rotate(-45 00 0)`;
          })

    const svgBox = this.svg.getBoundingClientRect();
    const tileBox = this.tileGroup.node().getBBox();
    const scale = svgBox.height / tileBox.height;
    const centerX = (svgBox.width / 2) - ((tileBox.width * scale) / 2);
    this.tileGroup.attr('transform', `matrix(0, 0, 0, 0, ${centerX}, 0)`)
      .transition()
      .duration(transitionDuration)
        .attr('transform', `matrix(${scale}, 0, 0, ${scale}, ${centerX}, 0)`)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tiles !== this.props.tiles) {
      this.tileGroup
        .selectAll('.tile')
        .data(this.props.tiles)
        .select('path')
          .transition()
          .duration(transitionDuration)
          .attr('fill', d => {
            const hue = d.hue;
            const sat = d.sat;
            const light = d.light;
            return `hsl(${hue}, ${sat}%, ${light}%)`;
          });
    }
  }

  render() {
    const tileStyle = { flex: 1 };
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    };
    return (
      <div style={ containerStyle }>
        <svg ref={ svg => this.svg = svg } style={ tileStyle }/>
        <TileDialog
          tile={parseInt(this.state.clickedTile)}
          open={this.state.openDialog}
          onClose={() => this.setState({ openDialog: false })}
          contracts={this.props.contracts}
          accounts={this.props.accounts}
          tiles={this.props.tiles}
        />
      </div>
    )
  }
}

GameBoard.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  accounts: PropTypes.object.isRequired,
  contracts: PropTypes.object.isRequired
};

export default GameBoard
