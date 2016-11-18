import React from 'react';
import TotalTripsComponent from '../components/TotalTripsComponent.jsx'
import TopPickupsComponent from '../components/TopPickupsComponent.jsx'
import PickupHeatMapComponent from '../components/PickupHeatMapComponent.jsx'
import DropoffHeatMapComponent from '../components/DropoffHeatMapComponent.jsx'
import TopDropoffsComponent from '../components/TopDropoffsComponent.jsx'
import DateRangePickerComponent from '../components/DateRangePickerComponent.jsx'

const ControlContainer = React.createClass({

  getInitialState() {
    return {}
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
        <PickupHeatMapComponent
          onChecked={this.props.onPickupHeatMapClick}
          heatmapEnabled={this.props.heatmapEnabled}
          heatmapOn={this.props.pickupHeatmapOn}
        />
        <TopDropoffsComponent
          onQueryClick={this.props.onTopDropoffsClick}
        />
        <DropoffHeatMapComponent
          onChecked={this.props.onDropoffHeatMapClick}
          heatmapEnabled={this.props.heatmapEnabled}
          heatmapOn={this.props.dropoffHeatmapOn}
        />
      </div>);
  }
});

export default ControlContainer;