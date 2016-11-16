import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'
import MapComponent from '../components/GoogleMapsComponent.jsx'
import SidebarContainer from './SidebarContainer.jsx'

const MainContainer = React.createClass({

  getInitialState() {
    return {
      bounds: []
    }
  },

  handleShapeChange (bounds) {
    this.setState({bounds: bounds});
  },

  handleTopLocations (locations) {
    var mapComponent = this.refs["mapComponent"];
    mapComponent.removeMarkers(locations);
    mapComponent.addMarkers(locations);
  },

  render () {
    return <div>
      <MapComponent
        ref="mapComponent"
        onShapeChange={this.handleShapeChange}
        onMap
      />
      <SidebarContainer
        bounds = {this.state.bounds}
        onTopLocations={this.handleTopLocations}
      />
    </div>
  }
});

export default MainContainer;