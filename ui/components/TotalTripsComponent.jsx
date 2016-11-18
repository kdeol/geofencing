import React, {Component} from 'react';

export default class TotalTripsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate () {
  }

  render() {
    return <button id="trip-count-button" type="button" className="btn btn-default control" onClick={this.props.onQueryClick} disabled={this.props.isLoading}>Search Area</button>
  }
}