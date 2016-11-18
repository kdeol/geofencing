import React, {Component} from 'react';

export default class TopDropoffsComponent extends Component {
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
    return <button id="top-dropoffs-button" type="button" className="btn btn-default" onClick={this.props.onQueryClick}>Get Top Dropoffs</button>
  }
}