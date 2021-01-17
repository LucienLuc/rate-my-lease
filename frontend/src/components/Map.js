import React, { Component} from 'react';
import AddressInfo from './addressinfo';
import LeaseInfo from './LeaseInfo';
import { GoogleMap, InfoBox, LoadScript, Marker } from '@react-google-maps/api';
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

  constructor(props){
    super(props)
    this.state = {
      currentLocation : {},
      barVisible : false,
      messageVisible : false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  handleClick(location){
    console.log("clicked on");
    console.log(location);
  }

  handleHover(location){
    console.log("hovering over");
    console.log(location);
    this.setState({
      currentLocation : location,
      messageVisible: true 
    })
  }

  render() {
    return (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: 38.5382,lng: -121.7617}}
          zoom={14}
        >
          { /* Child components, such as markers, info windows, etc. */ 
            this.props.locations.map(marker => {
              return (
                <Marker id = {marker.address} key ={marker.address} position = {{lat: marker.lat, lng: marker.long}} onClick = {() => this.handleClick(marker) } onMouseOver = {() => this.handleHover(marker) }/>
              )}
            )
          
          }
          <InfoBox position = {{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.long }} visible = {true} >
            <div>
              <h1>
                {this.state.currentLocation.address}
              </h1>
            </div>
          </InfoBox>
        </GoogleMap>
    )
  }
}


//once google api is implemented, we will be able to call this a real map
export default PseudoMap