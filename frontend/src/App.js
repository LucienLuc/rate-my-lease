import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import Search from './components/search'
import AddressInfo from './components/addressinfo'
import { LoadScript } from '@react-google-maps/api';
import Map from './components/Map'

import {GOOGLE_API_KEY} from './Constants'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query : {}
    }
  }

  changeQuery = (newQuery) => {
    this.setState({query : newQuery.data})
    console.log(this.state.query)
  }

  query = [{
    address: "24991 Pam",
    lat: 38.5382,
    long: -121.7617,
    reviews: [{
        rating: 1,
        date: Date(),
        body: "body"
    }],
    avg_rating: 2,
    leases: [{
      name: "poosh",
      date: Date(),
      price: 2,
      bed: 1,
      bath: 1,
      contact: {
          phone: 123123,
          email: "PushSubscription.gmail",
      },
      body: "body"}]},
      {
        address: "JAJAJA",
        lat: 38.52,
        long: -121.7617,
        reviews: [{
            rating: 1,
            date: Date(),
            body: "body"
        }],
        avg_rating: 2,
        leases: [{
          name: "Jiu",
          date: Date(),
          price: 2,
          bed: 1,
          bath: 1,
          contact: {
              phone: 123123,
              email: "PushSubscription.gmail",
          },
          body: "body"}]
}]

  render() {
    return (
      <LoadScript
      googleMapsApiKey= {GOOGLE_API_KEY}
      libraries = {['places']}
      >
      <div>
        <header>
          <Search callback={this.changeQuery}/>
        </header>

        <div>
          <Map locations={ /*this.state.*/ this.query} google = {this.google}/>
        </div>


      </div>
      </LoadScript>
    )
  }
}

export default App 