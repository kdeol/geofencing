import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'
import MapComponent from '../components/GoogleMapsComponent.jsx'
import SidebarContainer from './SidebarContainer.jsx'

/**
 * Main react container, responsible for passing changes between the sidebar and the map
 */
const MainContainer = React.createClass({

  getInitialState() {
    return {
      bounds: []
    }
  },

  handleShapeChange (bounds) {
    this.setState({bounds: bounds});
  },

  /**
   * Places markers for top pickups or dropoffs on map
   * @param locations
   */
  handleTopLocations (locations) {
    var mapComponent = this.refs["mapComponent"];
    mapComponent.removeMarkers(locations);
    mapComponent.addMarkers(locations);
  },

  /**
   * Handles heatmap toggles and places heatmaps on map
   * @param trips
   * @param checkbox
   */
  handlePickupHeatMapClick(trips, checkbox) {
    var mapComponent = this.refs['mapComponent'];
    mapComponent.togglePickupHeatMap(trips, checkbox.checked);
  },

  handleDropoffHeatMapClick(trips, checkbox) {
    var mapComponent = this.refs['mapComponent'];
    mapComponent.toggleDropoffHeatMap(trips, checkbox.checked);
  },

  /**
   * These handle the mouse events on rows of the top Pickup/Dropoff table to animate the markers
   * @param id
   */
  handleRowHover (id) {
    var mapComponent = this.refs['mapComponent'];
    mapComponent.toggleMarkerOn(id);
  },

  handleRowMouseOut (id) {
    var mapComponent = this.refs['mapComponent'];
    mapComponent.toggleMarkerOff(id);
  },

  /**
   *
   * @returns Map and Sidebar components
   */
  render () {
    return <div>
      <MapComponent
        ref="mapComponent"
        onShapeChange={this.handleShapeChange}
      />
      <SidebarContainer
        bounds = {this.state.bounds}
        onTopLocations={this.handleTopLocations}
        handlePickupHeatMapClick={this.handlePickupHeatMapClick}
        handleDropoffHeatMapClick={this.handleDropoffHeatMapClick}
        onRowHover={this.handleRowHover}
        onRowMouseOut={this.handleRowMouseOut}
      />
    </div>
  }
});

export default MainContainer;