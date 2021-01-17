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

const initialCenter = {
  lat: 38.5449,
  long: -121.7405
}

class PseudoMap extends Component {

  constructor(props){
    super(props)
    

    this.state = {
      currentLocation : {},
      barVisible : false,
      messageVisible : false,
      centerLat: initialCenter.lat,
      centerLng: initialCenter.long,
      test:  false
    }
    
    this.setState({
      centerLat: 32.8801,
      centerLng: -117.2340,
      test: true
    })
  
    console.log("initial default center: " +this.state.centerLat+" : "+this.state.centerLng + this.state.test)
    
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleBarClose = this.handleBarClose.bind(this);
    this.handleHoverExit = this.handleHoverExit.bind(this);

  }


  handleClick(location){
    console.log("clicked on");
    console.log(location);
    this.setState({
      centerLat: location.lat,
      centerLng: location.long
    })

    setTimeout(() => {
    this.setState({
      currentLocation: location,
      messageVisible: false,
      barVisible: true,
      
    })
  }, 100);

    console.log("expected location: " +location.lat +" : " + location.long);
    console.log("actual location: " +this.state.centerLat +" : " + this.state.centerLng);

  }

  handleHover(location){
    console.log("hovering over");
    console.log(location);
    //console.log(document.getElementById('google-map'));
    this.setState({
      currentLocation : location,
      messageVisible: true,
    })
    console.log("actual location: " +this.state.centerLat +" : " + this.state.centerLng);
  }

  handleBarClose(){
    console.log("closed the side bar");
    this.setState({
      messageVisible: true,
      barVisible: false,
      centerLat: undefined,
      centerLng: undefined
    })
  }

  handleHoverExit(){
    console.log('stopped hovering over');
    this.setState({
      messageVisible: false
    })
  }

  render() {
    //console.log(this.props);
    return (
      <div id = "map">
        <GoogleMap
          mapContainerStyle={containerStyle}
          defaultCenter={{lat: initialCenter.lat, lng: initialCenter.long}}
          center = {{lat: this.state.centerLat, lng: this.state.centerLng}}
          zoom={14}
        >
          { /* Child components, such as markers, info windows, etc. */ 
            this.props.locations.map(marker => {
              return (
                <Marker id = {marker.address} 
                key ={marker.address} 
                position = {{lat: marker.lat, lng: marker.long}} //fix here possibly htrowing LatLng error
                onClick = {() => this.handleClick(marker) } 
                onMouseOver = {() => this.handleHover(marker)} 
                onMouseOut = {this.handleHoverExit}
                />
              )}
            )
          
          }
          <InfoBox position = {{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.long }} //fix here possibly htrowing LatLng error
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
