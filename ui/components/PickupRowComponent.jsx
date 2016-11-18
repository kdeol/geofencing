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
    return <tr onMouseOver={()=>this.props.onRowHover(this.props.id)} onMouseOut={()=>this.props.onRowMouseOut(this.props.id)}>
      <td>{this.props.id}</td>
      <td>{location._id[0]}</td>
      <td>{location._id[1]}</td>
      <td>{location.count}</td>
    </tr>
  }
}