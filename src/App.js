import React, { Component } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Palettelist from "./Palettelist";
class App extends Component {
  findPalette(paletteId) {
    // let foundPalette = seedColors.filter(
    //   palette => palette.id === paletteId
    // )[0];
    // return <Palette palette={generatePalette(foundPalette)} />;
    return seedColors.find(palette => {
      return palette.id === paletteId;
    });
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
              <Palettelist {...routeProps} palettes={seedColors} />
            )}
          />
          <Route exact path="/palette/new" render={() => <NewPaletteForm />} />
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
