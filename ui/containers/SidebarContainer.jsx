import React from 'react';
import 'whatwg-fetch'
import ControlContainer from './ControlContainer.jsx'
import DataContainer from './DataContainer.jsx'
import _ from 'lodash'

const SidebarContainer = React.createClass({

  getInitialState() {
    return {
      trips: [],
      start: '',
      end: '',
      topPickups: [],
      topDropoffs: [],
      heatmapEnabled: false
    }
  },

  handleDateRange (start, end) {
    this.setState({start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD')});
  },

  handleQueryClick () {
    //send this.state.bounds to backend
    var req = { start: this.state.start, end: this.state.end, coordinates: this.props.bounds };
    if(req.coordinates.length <= 0) {
      return;
    }
    fetch('/query?' + $.param(req))
      .then(function(response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      }).then((json) => {
      this.setState({'trips': json, 'heatmapEnabled': true, 'pickupHeatmapOn': true, 'dropoffHeatmapOn': true});
      this.props.onTrips(this.state.trips);
    }).catch(function(ex) {
      console.log(ex)
    });
  },

  handleTopPickupsClick () {
    var req = { start: this.state.start, end: this.state.end, coordinates: this.props.bounds };
    fetch('/query/toppickups?' + $.param(req))
      .then(function(response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      }).then((json) => {
      this.setState({'topPickups': json, "showPickups": true});
      this.props.onTopLocations(this.state.topPickups);
    }).catch(function(ex) {
      console.log(ex)
    });
  },

  handleTopDropoffsClick () {
    var req = { start: this.state.start, end: this.state.end, coordinates: this.props.bounds };
    fetch('/query/topdropoffs?' + $.param(req))
      .then(function(response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      }).then((json) => {
      this.setState({'topDropoffs': json, "showPickups": false});
      this.props.onTopLocations(this.state.topDropoffs);
    }).catch(function(ex) {
      console.log(ex)
    });
  },

  handlePickupHeatMapClick (checkbox) {
    this.props.handlePickupHeatMapClick(this.state.trips, checkbox);
    this.setState({'pickupHeatmapOn': checkbox.checked});
  },

  handleDropoffHeatMapClick (checkbox) {
    this.props.handleDropoffHeatMapClick(this.state.trips, checkbox);
    this.setState({'dropoffHeatmapOn': checkbox.checked});
  },

  render () {
    return <div>
      <ControlContainer
        onQueryClick={this.handleQueryClick}
        onDateRange={this.handleDateRange}
        onTopPickupsClick={this.handleTopPickupsClick}
        heatmapEnabled={this.state.heatmapEnabled}
        pickupHeatmapOn={this.state.pickupHeatmapOn}
        dropoffHeatmapOn={this.state.dropoffHeatmapOn}
        onPickupHeatMapClick={this.handlePickupHeatMapClick}
        onDropoffHeatMapClick={this.handleDropoffHeatMapClick}
        onTopDropoffsClick={this.handleTopDropoffsClick}
      />
      <DataContainer
        trips={this.state.trips}
        topPickups={this.state.topPickups}
        topDropoffs={this.state.topDropoffs}
        showPickups={this.state.showPickups}
      />
    </div>
  }
});

export default SidebarContainer;