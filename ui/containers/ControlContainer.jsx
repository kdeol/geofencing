import React from 'react';
import TotalTripsComponent from '../components/TotalTripsComponent.jsx'
import TopPickupsComponent from '../components/TopPickupsComponent.jsx'
import TopDropoffsComponent from '../components/TopDropoffsComponent.jsx'
import DateRangePickerComponent from '../components/DateRangePickerComponent.jsx'

const ControlContainer = React.createClass({

  getInitialState() {
    return {}
  },

  shouldComponentUpdate () {
    return false;
  },

  render () {
    return (<div id="controls">
        <DateRangePickerComponent
          onDateRange={this.props.onDateRange}
        />
        <TotalTripsComponent
          onQueryClick={this.props.onQueryClick}
        />
        <TopPickupsComponent
          onQueryClick={this.props.onTopPickupsClick}
        />
        <TopDropoffsComponent
          onQueryClick={this.props.onTopDropoffsClick}
        />
      </div>);
  }
});

export default ControlContainer;