import React, { Component } from 'react';
import AddressInfo from './addressinfo';
import LeaseInfo from './LeaseInfo';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react'
import {GOOGLE_API_KEY} from '../Constants'
import Item from 'antd/lib/list/Item';
import {Button} from 'antd'
import { render } from 'react-dom';

import {GOOGLE_API_KEY} from '../Constants'


const mapStyles = {
  width: '100%',
  height: '90%'
}

// const containerStyle = {
//   //position:,  
//   width: '100%',
//   height: '90%'
// }

export class PseudoMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker : {},
      selectedPlace: {}
    };
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.onMouseclick = this.onMouseclick.bind(this);
  }

  onMouseoverMarker(props, marker, e) {
    // console.log(props)
    // console.log(marker)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }
  onMouseclick(props, marker, e) {

  }

  render() {
    return (
      <div>
        <h1>
          bruh
        </h1>
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          //containerStyle = {containerStyle}
          initialCenter={
            {
              lat: 38.5382,
              lng: -121.7617
            }
          }
        >
        {
          this.props.locations.map(marker => {
            return(
              <Marker key={marker.name} position={{lat : marker.lat, lng: marker.long}} onMouseover={this.onMouseoverMarker}/>
            )
          })
        }
        <InfoWindow
          marker={this.state.activeMarker}
          visible = {this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>  
      </div>
    )
  }
}


//once google api is implemented, we will be able to call this a real map
export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(PseudoMap); //change the name of this later