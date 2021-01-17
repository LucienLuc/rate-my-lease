import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'

import Search from './components/Search'
import AddressInfo from './components/AddressInfo'
import Map from './components/Map'
import PostReview from './components/PostReview'
import PostLease from './components/PostLease'

import { LoadScript } from '@react-google-maps/api';
import {BASE_URL} from './Constants'
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
    console.log(this.state.query);
  }

  componentDidMount() {
    axios
      .get(BASE_URL + '/api/location-all')
      .then(response => {
          this.setState({query: response.data})
          console.log(this.state.query);
      })
  }

  

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
          <Map locations={this.state.query} google = {this.google}/>
        </div>

        <div>
          <PostReview/>
        </div>
        <div>
          <PostLease/>
        </div>
      </div>
      </LoadScript>
    )
  }
}

export default App 