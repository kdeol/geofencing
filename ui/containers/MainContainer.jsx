import React from 'react';
import MapComponent from '../components/GoogleMapsComponent.jsx'

const MainContainer = React.createClass({

  getInitialState() {
    return {
      coordinates: {
        lat: 40.7388652,
        lon: -73.9917875
      }
    }
  },

  render () {
    //Center on NYC since all of our data is form there
    return <MapComponent
        lat={this.state.coordinates.lat}
        lon={this.state.coordinates.lon}
      />
  }
});

export default MainContainer;