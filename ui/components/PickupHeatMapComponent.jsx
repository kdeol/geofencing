import React, {Component} from 'react';

export default class PickupHeatMapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  componentDidMount() {

  }

  componentDidUpdate () {
  }

  onCheck (checkbox) {
    this.setState({checked: checkbox.checked});
    this.props.onChecked(checkbox.target);
  }

  render() {
    var disabled = this.props.heatmapEnabled ? '' : 'disabled';
    return <label className="checkbox-inline control" disabled={disabled}><input type="checkbox" checked={this.props.heatmapOn || this.state.checked} disabled={disabled} onClick={this.onCheck.bind(this)} value="" />Pickups Heatmap</label>
  }
}

