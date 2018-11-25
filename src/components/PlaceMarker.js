import React, { Component } from 'react'
import { Marker } from 'react-google-maps'
import { PlaceInfoWindow } from './PlaceInfoWindow'

export class PlaceMarker extends Component {
  constructor(props) {
    super(props)
 
     this.state = {
      showTooltip: false
    }
  }
 
  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip })
  }
 
  closeWindow() {
    this.setState({ showTooltip: false })
  }

  render() {
    const {showTooltip} = this.state
    const {lat, lng, idVehicle, sent_at, id, last} = this.props

    return(
      <Marker
        position={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}
        onClick={this.clickTooltip.bind(this)}
        key={`marker${id}`}
        markerWithLabel={window.MarkerWithLabel}
        opacity={0}
        labelClass='map-info-container'
        labelContent={`<div class="map-info-marker"><span>${idVehicle}</span></div>`}
        >
        
        {showTooltip && (
          <PlaceInfoWindow key={`info${id}`}
                           lat={lat}
                           lng={lng}
                           idVehicle={idVehicle}
                           sent_at={sent_at}
                           id={id}
                           last={last}
                           closeWindow={this.closeWindow.bind(this)}
      />
      )}
      </Marker>
    );
  }
}
 
export default PlaceMarker