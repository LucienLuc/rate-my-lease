import React, { Component, useState} from 'react';
import AddressInfo from './addressinfo';
import LeaseInfo from './LeaseInfo';
import {Map, Marker, GoogleApiWrapper, InfoWindow, GoogleMap, withScriptjs, withGoogleMap} from 'google-maps-react'
import Item from 'antd/lib/list/Item';
import {Button} from 'antd'
import { render } from 'react-dom';
import { GOOGLE_API_KEY , GOOGLE_MAP_URL} from '../Constants'
import { convertLegacyProps } from 'antd/lib/button/button';


const mapStyles = {
  width: '100%',
  height: '90%'
}

const initialCenter = {
  lat: 38.5382,
  lng: -121.7617
}
// const containerStyle = {
//   //position:,  
//   width: '100%',
//   height: '90%'
// }


export class PseudoMapContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentLocation: null, 
      sideBarVisible: false, 
      messageVisible: false
    }
  }

  handleMouseOver(){

  }

  handleClick(){

  }
  render() {
    return (
      <Map
        google = {this.props.google}
        zoom = {12}
        initialCenter = {initialCenter}
        mapStyles = {mapStyles}
      >
        {this.props.locations.map(loc => {
          console.log("rnu")
          return(
            <>
              <Marker key = {loc.name} position = {{lat: loc.lat, lng: loc.long}}  onMouseover = {this.handleMouseOver} onClick = {this.handleClick} />
            </>
          )
        })}
      </Map>


    )
  }
    
  
}


//once google api is implemented, we will be able to call this a real map
export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(PseudoMapContainer); //change the name of this later