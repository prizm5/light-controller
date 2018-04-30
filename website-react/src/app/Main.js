import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider' 
import ButtonGroup from './ButtonGroup'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 0,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleTouchTap = (b) => {
    this.setState({
      open: true,
    });
    debugger;
    alert(b);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <AppBar
            title="Home Light Controller"
          />

          <ButtonGroup name="Bedroom"           buttonid="2" />
          <ButtonGroup name="Bedroom Chargers"  buttonid="5" />
          <ButtonGroup name="Livingromm"        buttonid="1" />
          <ButtonGroup name="Couch"             buttonid="3" />
          <ButtonGroup name="TV"                buttonid="5" />
          <ButtonGroup name="Everything"        buttonid="6" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
