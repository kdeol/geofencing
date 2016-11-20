import React from 'react';
import PickupRowComponent from '../components/PickupRowComponent.jsx'
import HourlyHistogramComponent from '../components/HourlyHistogramComponent.jsx'
import moment from 'moment'

var dataDivStyle = {
  'height': "100%",
  'overflow': 'hidden'
};

var tripCountLabelStyle = {
  "display": "inline"
};

var tripCountDivStyle = {
  "marginTop": "24px",
  "marginBottom": "24px"
};

const DataContainer = React.createClass({

  render () {
    var elements = [];
    var topLocations = this.props.showPickups ? this.props.topPickups : this.props.topDropoffs;
    var title = this.props.showPickups ? "Pickups" : "Dropoffs";
    if(this.props.trips.length > 0) {
      elements.push(<div style={tripCountDivStyle}><h4 style={tripCountLabelStyle}>Total Trip Count: </h4><span>{this.props.trips.length}</span></div>);
      elements.push(<HourlyHistogramComponent trips={this.props.trips} />);
    }

    if(topLocations.length > 0) {
      elements.push(<h3>Top {title}</h3>);
      elements.push(<table className="table table-hover">
        <thead>
        <tr>
          <th>#</th>
          <th>Longitude</th>
          <th>Latitude</th>
          <th># of {title}</th>
        </tr>
        </thead>
        <tbody>
        {topLocations.map( (location, i) => {
          return <PickupRowComponent
            key={i}
            location={location}
            id={i+1}
            onRowHover={this.props.onRowHover}
            onRowMouseOut={this.props.onRowMouseOut}
          />;
        })}
        </tbody>
      </table>);
    }

    return (<div id="data" style={dataDivStyle}>
      {elements}
    </div>);
  }
});

export default DataContainer;