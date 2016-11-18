import React from 'react';
import TotalTripsComponent from '../components/TotalTripsComponent.jsx'
import TopPickupsComponent from '../components/TopPickupsComponent.jsx'
import PickupHeatMapComponent from '../components/PickupHeatMapComponent.jsx'
import DropoffHeatMapComponent from '../components/DropoffHeatMapComponent.jsx'
import TopDropoffsComponent from '../components/TopDropoffsComponent.jsx'
import DateRangePickerComponent from '../components/DateRangePickerComponent.jsx'

var controlContainerStyle = {
  "marginTop": "24px",
  "marginBottom": "24px"
};

const ControlContainer = React.createClass({

  getInitialState() {
    return {}
  },

  render () {
    return (<div id="controls" style={controlContainerStyle}>
        <DateRangePickerComponent
          onDateRange={this.props.onDateRange}
        />
        <TotalTripsComponent
          onQueryClick={this.props.onQueryClick}
          isLoading={this.props.isLoading}
        />
        <PickupHeatMapComponent
          onChecked={this.props.onPickupHeatMapClick}
          heatmapEnabled={this.props.heatmapEnabled}
          heatmapOn={this.props.pickupHeatmapOn}
        />
        <DropoffHeatMapComponent
          onChecked={this.props.onDropoffHeatMapClick}
          heatmapEnabled={this.props.heatmapEnabled}
          heatmapOn={this.props.dropoffHeatmapOn}
        />
        <TopPickupsComponent
          onQueryClick={this.props.onTopPickupsClick}
          isLoading={this.props.isLoading}
        />
        <TopDropoffsComponent
          onQueryClick={this.props.onTopDropoffsClick}
          isLoading={this.props.isLoading}
        />

      </div>);
  }
});

export default ControlContainer;