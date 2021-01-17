import React, { Component} from 'react';
import AddressInfo from './AddressInfo';
import { GoogleMap, InfoBox, LoadScript, Marker } from '@react-google-maps/api';
import {Drawer} from "antd"
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
      messageVisible : false,
      centerLat: 38.5382,
      centerLng: -121.7617
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleBarClose = this.handleBarClose.bind(this);
    this.handleHoverExit = this.handleHoverExit.bind(this);
  }

  handleClick(location){
    console.log("clicked on");
    console.log(location);
    this.setState({
      currentLocation: location,
      messageVisible: false,
      barVisible: true,
      centerLat: location.lat,
      centerLng: location.lng
    })
  }

  handleHover(location){
    this.setState({
      currentLocation : location,
      messageVisible: true,
      centerLat: location.lat,
      centerLng: location.lng
    })
  }

  handleBarClose(){
    console.log("closed the side bar");
    this.setState({
      messageVisible: true,
      barVisible: false
    })
  }

  handleHoverExit(){
    console.log('stopped hovering over');
    this.setState({
      messageVisible: false
    })
  }

  render() {
    return (
      <div id = "map">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: this.state.centerLat, lng: this.state.centerLng}}
          zoom={14}
        >
          { /* Child components, such as markers, info windows, etc. */ 
            this.props.locations.map(marker => {
              return (
                <Marker id = {marker.address} 
                key ={marker.address} 
                position = {{lat: marker.lat, lng: marker.long}} 
                onClick = {() => this.handleClick(marker) } 
                onMouseOver = {() => this.handleHover(marker)} 
                onMouseOut = {this.handleHoverExit}
                />
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
            title = ""//{this.state.currentLocation.address}
            placement="right"
            closable={false}
            onClose={this.handleBarClose}
            visible={this.state.barVisible}
            width={1000}>
                <AddressInfo location = {this.state.currentLocation}/>
            </Drawer>
      </div>
    )
  }
}


//once google api is implemented, we will be able to call this a real map
export default PseudoMap
