import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});
class NewPaletteForm extends Component {
  static defaultProps = {
    maxNumColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentColor: "teal",
      colors: this.props.palettes[0].colors,
      newName: ""
    };
    this.addNewColor = this.addNewColor.bind(this);
    this.findAndDeleteColor = this.findAndDeleteColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      if (
        this.state.colors.find(
          color => color.name.toLowerCase() === value.toLowerCase()
        )
      ) {
        return false;
      } else {
        return true;
      }
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      if (
        this.state.colors.find(color => color.color === this.state.currentColor)
      ) {
        return false;
      } else {
        return true;
      }
    });
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  addNewColor() {
    let newColor = {
      color: this.state.currentColor,
      name: this.state.newName
    };
    this.setState({ colors: [...this.state.colors, newColor], newName: "" });
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  savePalette = newPaletteName => {
    const newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  };
  findAndDeleteColor(colorName) {
    const newColorArray = this.state.colors.filter(
      color => color.name !== colorName
    );
    this.setState({ colors: newColorArray });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };
  clearPalette() {
    this.setState({ colors: [] });
  }
  addRandomColor() {
    const allColors = this.props.palettes.map(palette => palette.colors).flat();
    const rndIdx = Math.floor(Math.random() * allColors.length);
    const newColor = allColors[rndIdx];
    this.setState({ colors: [...this.state.colors, newColor] });
  }
  render() {
    const { classes, theme, maxNumColors } = this.props;
    const { open, currentColor, colors } = this.state;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          handleSubmit={this.savePalette}
          open={open}
          palettes={this.props.palettes}
          classes={classes}
          handleChange={this.savePalette}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design your Palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearPalette}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addRandomColor}
              disabled={colors.length >= maxNumColors}
            >
              Random Color
            </Button>
          </div>
          <div style={{ margin: "0 auto" }}>
            <ChromePicker
              color={currentColor}
              onChangeComplete={newColor =>
                this.setState({ currentColor: newColor.hex })
              }
            />
          </div>
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={this.state.newName}
              onChange={this.handleChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "Field must not be Empty",
                "Color Name must be unique",
                "Color name already taken"
              ]}
              name="newName"
            />
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: currentColor }}
              color="primary"
              disabled={colors.length >= maxNumColors}
            >
              {colors.length >= maxNumColors ? "Palette Full" : "Add Color"}
            </Button>
          </ValidatorForm>

          <Divider />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            handleClick={this.findAndDeleteColor}
            colors={this.state.colors}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
