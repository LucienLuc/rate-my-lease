import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import Search from './components/search'
import AddressInfo from './components/addressinfo'
import Map from './components/Map'

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

  render() {
    return (
      <div>
        <header>
          <Search callback={this.changeQuery}/>
        </header>

        <div>
          <Map leases={this.state.query}/>
        </div>
      </div>
    )
  }
}

export default App 