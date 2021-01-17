import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'

import Search from './components/Search'
import Map from './components/Map'

import { LoadScript } from '@react-google-maps/api';
import {BASE_URL} from './Constants'
import {GOOGLE_API_KEY} from './Constants'

const libraries = ['places']

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query : {},
      isLoaded: false
    }
  }

  componentDidMount() {
    axios
      .get(BASE_URL + '/api/location-all')
      .then(response => {
          this.setState({query: response.data, isLoaded: true})
      })
  }

  changeQuery = (newQuery) => {
    // console.log(newQuery.data)
    this.setState({query : newQuery.data})
    // console.log(this.state.query);
  }

  render() {
    if(!this.state.isLoaded){
      return null
    }
    return (
      <LoadScript
      googleMapsApiKey= {GOOGLE_API_KEY}
      libraries = {libraries}
      >
      <div>
        <header>
          <Search callback={this.changeQuery}/>
        </header>

        <div>
        {console.log("Apppppppppppppppppppp.js"),
                console.log(this.state.query)}
          <Map locations={this.state.query}/>
        </div>
      </div>
      </LoadScript>
    )
  }
}

export default App 