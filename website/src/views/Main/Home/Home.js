import React, { PropTypes as T } from 'react'
import { Button, ButtonGroup, Nav, Navbar, NavItem } from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'
import { ToggleButtonGroup } from '../../../Components/ToggleButtonGroup'

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    this.token = {
      token: props.auth.getToken()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile })
    })
  }

  logout() {
    this.props.auth.logout()
    this.context.router.push('/login');
  }


  render() {
    const { profile } = this.state
    const { token } = this.token
    return (
      <div className={styles.root}>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">RF Outlets</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.logout.bind(this)}> Welcome {profile.name}! | Logout</NavItem>
          </Nav>
        </Navbar>
        <div className="container">
          <ToggleButtonGroup name="Bedroom Light" id="1" token={token} />
          <ToggleButtonGroup name="Livingroom Light" id="2" token={token} />
          <ToggleButtonGroup name="Balcony Lights" id="3" token={token} />
          <ToggleButtonGroup name="TV" id="4" token={token} />
          <ToggleButtonGroup name="Bedroom Chargers" id="5" token={token} />
          <ToggleButtonGroup name="All" id="6" token={token} />
        </div>
      </div>
    )
  }
}

export default Home;
