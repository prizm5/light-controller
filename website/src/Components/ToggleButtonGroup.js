import React, { PropTypes as T } from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import {toggleButtonOff, toggleButtonOn} from '../utils/LightService'

function toggleON(id, token){
  toggleButtonOn(id, token) 
}

function toggleOFF(id, token) {
  toggleButtonOff(id, token) 
}



export function ToggleButtonGroup(props) {
  const id = props.id;
  const token = props.token;
  const name = props.name;
  return (   
      <div>
        <label>{name}</label> 
        <ButtonGroup className="btn-group-justified" role="group">
        <ButtonGroup role="group">
          <Button onClick={() => toggleON(id, token)}>On</Button>
          </ButtonGroup>
        <ButtonGroup role="group">
          <Button onClick={() => toggleOFF(id, token)}>Off</Button>
          </ButtonGroup>
        </ButtonGroup>
      </div> )
}
