import React, { Component} from 'react';
import AddressInfo from './addressinfo';
import LeaseInfo from './LeaseInfo';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Item from 'antd/lib/list/Item';
import {Button} from 'antd'
import { render } from 'react-dom';
import {GOOGLE_API_KEY} from '../Constants'



const containerStyle = {
  //position:,  
  width: '400px',
  height: '400px'
}

class PseudoMap extends Component {
  render() {
    return (
      <LoadScript 
        googleMapsApiKey= {GOOGLE_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: 38.5382,lng: -121.7617}}
          zoom={14}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}


//once google api is implemented, we will be able to call this a real map
export default PseudoMap
