import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'
 
export class PlaceInfoWindow extends Component {
  render() {
    const {lat, lng, idVehicle, sent_at, id, last} = this.props
 
    return(
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <h1>{idVehicle}</h1>
          <p>sent_at: {sent_at}</p>
          <p>longitude: {lng}</p>
          <p>latitude: {lat}</p>
        </div>
      </InfoWindow>
    );
  }
}
 
export default PlaceInfoWindow