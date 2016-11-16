import React, {Component} from 'react';

export default class PickupRowComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate () {
  }

  render() {
    var location = this.props.location;
    return <tr>
      <td>{this.props.id}</td>
      <td>{location._id[0]}</td>
      <td>{location._id[1]}</td>
      <td>{location.count}</td>
    </tr>
  }
}