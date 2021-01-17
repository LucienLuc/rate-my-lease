import React, { Component, useState} from 'react';
import AddressInfo from './addressinfo';
import LeaseInfo from './LeaseInfo';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react'
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

const PseudoMap = (props) =>  {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showingAddressBar: false,
  //     showingInfoWindow: false,
  //     selectedPlace: {}
  //   };
  //   this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
  //   this.onMouseclick = this.onMouseclick.bind(this);
  // }

  onMouseoverMarker(props, marker, e) {
    // console.log(props)
    // console.log(marker)
    // console.log(e)
    this.setState({
      showingInfoWindow: true,
      selectedPlace: props,
      activeMarker: marker
    })
  }

  const onMouseclick = ({location}) =>{
    this.setState({
      selectedPlace: location,
      showingInfoWindow: false,
      showingAddressBar: true
    })
  }
  
  console.log(props.google);
  
  return (
      <div>
        <h1>
          bruh
        </h1>
        <>{console.log(props)}</>
        <Map
          google={props.google}
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
            console.log(marker.name);
            return(
              <Marker key={marker.name} position={{lat : marker.lat, lng : marker.long}} onMouseover={this.onMouseoverMarker}/>
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


//once google api is implemented, we will be able to call this a real map
export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(PseudoMap); //change the name of this later