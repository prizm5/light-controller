import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider' 

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 0,
  },
  botton: {
      margin: 20
  }
};
class ButtonGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.props = props;

    this.state = {
      open: false,
    };
  }

  handleOnTouchTap = () => {
    this.setState({
      open: true,
    });
    console.log('button on', this.props.buttonId);
  }
  handleOffTouchTap = () => {
    this.setState({
      open: true,
    });
    console.log('button off', this.props.buttonId);
  }

  render() {
    return(<div style={styles.container}>
        <h2>{this.props.name}</h2>
        <RaisedButton
            label="On"
            primary={true}
            onTouchTap={this.handleOnTouchTap}
            style={styles.button}

            />
        <RaisedButton
            label="Off"
            secondary={true}
            onTouchTap={this.handleOffTouchTap}
            style={styles.button}
            />
        <Divider />
    </div>
     )}
}
export default ButtonGroup;