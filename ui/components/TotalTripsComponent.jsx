import React, {Component} from 'react';

export default class TotalTripsComponent extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate () {
    return false;
  }

  componentDidMount() {

  }

  componentDidUpdate () {
  }

  render() {
    return <button id="trip-count-button" type="button" className="btn btn-default" onClick={this.props.onQueryClick}>Get Trip Count</button>
  }
}