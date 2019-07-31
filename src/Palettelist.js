import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Minipalette from './Minipalette';
class Palettelist extends Component {
  render() {
    const { palettes } = this.props;
    return (
      <div>
        <h1>React Colors</h1>
        <Minipalette />
        {palettes.map(palette => (
          <p>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
          </p>
        ))}
      </div>
    );
  }
}
export default Palettelist;
