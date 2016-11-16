import React, {Component} from 'react';

export default class TopPickupsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate () {
  }

  render() {
    return <button id="top-pickups-button" type="button" className="btn btn-default" onClick={this.props.onQueryClick}>Get Top Pickups</button>
  }
}