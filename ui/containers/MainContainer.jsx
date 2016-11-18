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

  handleTrips (trips) {
    var mapComponent = this.refs['mapComponent'];
    mapComponent.addPickupHeatmap(trips);
    mapComponent.addDropoffHeatmap(trips);
  },

  handlePickupHeatMapClick(trips, checkbox) {
    var mapComponent = this.refs['mapComponent'];
    mapComponent.togglePickupHeatMap(trips, checkbox.checked);
  },

  handleDropoffHeatMapClick(trips, checkbox) {
    var mapComponent = this.refs['mapComponent'];
    mapComponent.toggleDropoffHeatMap(trips, checkbox.checked);
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
        onTrips={this.handleTrips}
        handlePickupHeatMapClick={this.handlePickupHeatMapClick}
        handleDropoffHeatMapClick={this.handleDropoffHeatMapClick}
      />
    </div>
  }
});

export default MainContainer;