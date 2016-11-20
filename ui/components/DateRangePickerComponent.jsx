import React, {Component} from 'react';

var datePickerStyle = {
  "display": "inline"
};

var dateRangeStyle = {
  marginLeft: "6px"
};

export default class DateRangePickerComponent extends Component {
  constructor(props) {
    super(props);
  }


  shouldComponentUpdate () {
    return false;
  }
  
  componentDidMount() {
    $('input[name="daterange"]').daterangepicker(
      {
        startDate: "2014-04-01",
        endDate: "2014-08-31",
        locale: {
          format: 'YYYY-MM-DD'
        }
      },
      this.props.onDateRange
    );
  }

  componentDidUpdate () {
  }

  render() {
    return <div style={datePickerStyle} className="control">
      <label>Date Range</label>
      <input type="text" name="daterange" style={dateRangeStyle}/>
    </div>
  }
}