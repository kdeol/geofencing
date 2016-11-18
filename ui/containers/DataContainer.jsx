import React from 'react';
import PickupRowComponent from '../components/PickupRowComponent.jsx'

const DataContainer = React.createClass({

  render () {
    var elements = [];
    var topLocations = this.props.showPickups ? this.props.topPickups : this.props.topDropoffs;
    if(this.props.trips.length > 0) {
      elements.push(<div>Trip Count: {this.props.trips.length}</div>);
    }

    if(topLocations.length > 0) {
      elements.push(<table className="table table-hover">
        <thead>
        <tr>
          <th>Longitude</th>
          <th>Latitude</th>
          <th>Count</th>
        </tr>
        </thead>
        <tbody>
        {topLocations.map(function(location, i){
          return <PickupRowComponent
            key={i}
            location={location}
            id={i+1}
          />;
        })}
        </tbody>
      </table>);
    }

    return (<div id="data">
      {elements}
    </div>);
  }
});

export default DataContainer;