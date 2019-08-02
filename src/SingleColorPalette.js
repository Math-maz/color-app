import React, { Component } from "react";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
export default class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.getShades(this.props.palette, this.props.colorId);
    this.state = {
      format: "hex"
    };
    this.changeFormat = this.changeFormat.bind(this);
  }
  getShades(palette, colorId) {
    let shadeOfColor = [];
    for (let color in palette.colors) {
      shadeOfColor.push(
        palette.colors[color].find(shade => colorId === shade.id)
      );
    }
    shadeOfColor.shift();
    return shadeOfColor;
  }
  changeFormat(val) {
    this.setState({ format: val });
  }
  render() {
    const { paletteName, emoji, id } = this.props.palette;
    const { format } = this.state;
    const colorBoxes = this._shades.map(shade => (
      <ColorBox
        key={shade.name}
        name={shade.name}
        background={shade[format]}
        showLink={false}
      />
    ));

    return (
      <div className="SingleColorPalette Palette">
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className="Palette-colors">
          {colorBoxes}
          <div className="go-back ColorBox">
            <Link to={`/palette/${id}`} className="back-button">
              GO BACK
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
