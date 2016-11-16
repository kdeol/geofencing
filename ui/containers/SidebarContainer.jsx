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
      topDropoffs: []
    }
  },

  handleDateRange (start, end) {
    this.setState({start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD')});
  },

  handleQueryClick () {
    //send this.state.bounds to backend
    var req = { start: this.state.start, end: this.state.end, coordinates: this.props.bounds };
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
      this.setState({'trips': json});
      console.log(json);
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
      console.log(json);
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
      console.log(json);
    }).catch(function(ex) {
      console.log(ex)
    });
  },

  render () {
    return <div>
      <ControlContainer
        onQueryClick={this.handleQueryClick}
        onDateRange={this.handleDateRange}
        onTopPickupsClick={this.handleTopPickupsClick}
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