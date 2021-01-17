import React, { Component} from 'react';
import AddressInfo from './Addressinfo';
import LeaseInfo from './LeaseInfo';
import { GoogleMap, InfoBox, LoadScript, Marker } from '@react-google-maps/api';
import Item from 'antd/lib/list/Item';
import {Drawer} from "antd"
import { render } from 'react-dom';
import {GOOGLE_API_KEY} from '../Constants'
import "./map.css"


const containerStyle = {
  //position:,  
  width: '100vw',
  height: '100vh'
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
    this.handleBarClose = this.handleBarClose.bind(this);
  }

  handleClick(location){
    console.log("clicked on");
    console.log(location);
    this.setState({
      currentLocation: location,
      messageVisible: false,
      barVisible: true
    })
  }

  handleHover(location){
    console.log("hovering over");
    console.log(location);
    this.setState({
      currentLocation : location,
      messageVisible: true 
    })
  }

  handleBarClose(){
    console.log("closed the side bar");
    this.setState({
      messageVisible: true,
      barVisible: false
    })
  }

  render() {
    return (
      <div id = "map">
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
          <InfoBox position = {{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.long }} 
          visible = {this.state.messageVisible} 
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <div className = "infobox">
              <h1>
                {this.state.currentLocation.address} Rating:  
                {this.state.currentLocation.avg_rating}/5
              </h1>
            </div>
          </InfoBox>
        </GoogleMap>
        <Drawer
            title="Address"
            placement="right"
            closable={false}
            onClose={this.handleBarClose}
            visible={this.state.barVisible}
            width={720}>
                <h>DOOT</h>
            </Drawer>
      </div>
    )
  }
}


//once google api is implemented, we will be able to call this a real map
export default PseudoMap
