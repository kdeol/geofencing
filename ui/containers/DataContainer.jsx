import React from 'react';
import PickupRowComponent from '../components/PickupRowComponent.jsx'

const DataContainer = React.createClass({

  renderByHour() {
    var hourArr = new Array(24);

    this.props.trips.forEach()
  },

  render () {
    var elements = [];
    var topLocations = this.props.showPickups ? this.props.topPickups : this.props.topDropoffs;
    var title = this.props.showPickups ? "Pickups" : "Dropoffs";
    if(this.props.trips.length > 0) {
      elements.push(<div>Total Trip Count: {this.props.trips.length}</div>);
      elements.push(renderByHour());
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

    return (<div id="data">
      {elements}
    </div>);
  }
});

export default DataContainer;