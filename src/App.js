import React, { Component } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Palettelist from "./Palettelist";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedColors
    };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(paletteId) {
    // let foundPalette = seedColors.filter(
    //   palette => palette.id === paletteId
    // )[0];
    // return <Palette palette={generatePalette(foundPalette)} />;
    return this.state.palettes.find(palette => {
      return palette.id === paletteId;
    });
  }
  savePalette(newPalette) {
    this.setState(st => ({ palettes: [...st.palettes, newPalette] }));
  }
  render() {
    console.log();
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Palettelist {...routeProps} palettes={this.state.palettes} />
            )}
          />
          <Route
            exact
            path="/palette/new"
            render={routeProps => (
              <NewPaletteForm
                {...routeProps}
                palettes={this.state.palettes}
                savePalette={this.savePalette}
              />
            )}
          />
          <Route
            exact
            path="/palette/:id"
            render={routeProps => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.id)
                )}
              />
            )}
          />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={routeProps => (
              <SingleColorPalette
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.paletteId)
                )}
              />
            )}
          />
        </Switch>
        {/* routeProps.match.params.id */}
        {/* <Palette palette={generatePalette(seedColors[4])} /> */}
      </div>
    );
  }
}

export default App;
