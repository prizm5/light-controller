
import React, { PropTypes as T } from 'react'


  function callApi(state, id, token) {
    fetch( `/api/protected/toggle`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify( { id: id, state: state } )
    });
  }

export function toggleButtonOff(id, token) {
  console.log("OFF",id)
  callApi('off',id, token)
}
export function toggleButtonOn(id, token){
  console.log("ON",id)
  callApi('on',id, token)
}