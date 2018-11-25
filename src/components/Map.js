import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps' 
import { PlaceMarker } from './PlaceMarker'

const PlacesMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChanged}
    onDragEnd={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded}

    defaultCenter={props.center}
    defaultZoom={props.zoom}>
    
    {
      props.places.length > 0 && props.places.map(place => (
        <PlaceMarker  key={`place${place.id}`}
                      id={place.id}
                      lat={place.latitude}
                      lng={place.longitude}
                      sent_at={place.sent_at}
                      idVehicle={place.vehicle_identifier} />
      ))
    }
    </GoogleMap>

));
 
export class Map extends Component {
  constructor(props) {
    super(props)

    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false
    this.zoom = 7
 
    this.state = {
      places: [],
      lat: -33.407094,
      lng: -70.57201
    };

  }

  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }

  handleMapMounted(map) {
    this.map = map
  }

  handleMapFullyLoaded() {
    if (this.mapFullyLoaded) {
      return
    }else{
      this.mapFullyLoaded = true
      
      this.handleMapChanged()
    }

  }

  setMapCenterPoint() {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

  fetchPlacesFromApi() {
    this.setState({ places: [] })
 
    fetch(`/api/places?min_lng=${this.xMapBounds.min}&max_lng=${this.xMapBounds.max}&min_lat=${this.yMapBounds.min}&max_lat=${this.yMapBounds.max}`,
      { method: 'GET' })
      .then((response) => response.json())
      .then((response) => this.setState({places: response }))

  }


  getMapBounds() {
    var mapBounds = this.map.getBounds()
    var xMapBounds = mapBounds.getSouthWest()
    var yMapBounds = mapBounds.getNorthEast()

    this.xMapBounds.min = xMapBounds.lng()
    this.xMapBounds.max = xMapBounds.lat()
    this.yMapBounds.min = yMapBounds.lng()
    this.yMapBounds.max = yMapBounds.lat()
  }

  render() {
    const {lat, lng, places} = this.state
    return(
      <div style={{width: `750px`, height: `750px`}}>

        <PlacesMap
          onMapMounted={this.handleMapMounted.bind(this)}
          handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}
          handleMapChanged={this.handleMapChanged.bind(this)}
          
          center={{
            lat: lat,
            lng: lng
          }}
          zoom={this.zoom}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          places={places}

        />
      </div>
    );
  }
}

export default Map