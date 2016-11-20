import React, {Component} from 'react';

var spinnerStyle = {
  "position": "inherit",
  "fontSize": "24px"
};

export default class LoadingComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate () {
  }

  render() {
    var el = [];
    if(this.props.isLoading) {
      el.push(<i className="fa-li fa fa-spinner fa-pulse" style={spinnerStyle}></i>);
      el.push(<span>Loading...</span>);
    }
    return <div className="loading-spinner" >{el}</div>;
  }
}