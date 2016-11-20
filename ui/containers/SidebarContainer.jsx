import React from 'react';
import 'whatwg-fetch'
import ControlContainer from './ControlContainer.jsx'
import DataContainer from './DataContainer.jsx'
import LoadingComponent from '../components/LoadingComponent.jsx'
import _ from 'lodash'

var sidebarStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  bottom: '0',
  width: '460px',
  height: "100%",
  display: 'flex',
  'flexDirection': 'column'
};

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
    this.setState({isLoading: true, 'trips': [], 'topPickups': [], 'topDropoffs': []});
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
      this.setState({isLoading: false, 'trips': json, 'heatmapEnabled': true, 'pickupHeatmapOn': false, 'dropoffHeatmapOn': false});
      this.props.onTrips(this.state.trips);
    }).catch(function(ex) {
      console.log(ex)
    });
  },

  handleTopPickupsClick () {
    this.setState({isLoading: true});
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
      this.setState({isLoading: false, 'topPickups': json, "showPickups": true});
      this.props.onTopLocations(this.state.topPickups);
    }).catch(function(ex) {
      console.log(ex)
    });
  },

  handleTopDropoffsClick () {
    this.setState({isLoading: true});
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
      this.setState({isLoading: false, 'topDropoffs': json, "showPickups": false});
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
    return <div style={sidebarStyle}>
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
        isLoading={this.state.isLoading}
      />
      <LoadingComponent isLoading={this.state.isLoading}/>
      <DataContainer
        trips={this.state.trips}
        topPickups={this.state.topPickups}
        topDropoffs={this.state.topDropoffs}
        showPickups={this.state.showPickups}
        onRowHover={this.props.onRowHover}
        onRowMouseOut={this.props.onRowMouseOut}
      />
    </div>
  }
});

export default SidebarContainer;