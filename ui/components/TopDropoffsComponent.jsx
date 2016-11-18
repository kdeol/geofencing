import React, {Component} from 'react';

export default class TopDropoffsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate () {
  }

  render() {
    return <button id="top-dropoffs-button" type="button" className="btn btn-default control" onClick={this.props.onQueryClick} disabled={this.props.isLoading}>Get Top Dropoffs</button>
  }
}