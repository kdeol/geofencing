import React, {Component} from 'react';
import _ from 'lodash';

var mapStyle = {
  width:"500px",
  height:"500px"
};

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.markers = [];
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false;
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  boundsToArray(bounds, isRectangle) {
    var arr = [];
    if(isRectangle) {
      var NE = bounds.getNorthEast();
      var SW = bounds.getSouthWest();
      arr.push({lat: NE.lat(), lng: NE.lng()}); //NorthEast
      arr.push({lat: SW.lat(), lng: NE.lng()}); //SouthEast
      arr.push({lat: SW.lat(), lng: SW.lng()}); //SouthWest
      arr.push({lat: SW.lng(), lng: NE.lat()}); //NorthWest
      arr.push({lat: NE.lat(), lng: NE.lng()}); //Close the loop to make this box a polygon
    } else {
      for(let b of bounds) {
        arr.push({lat: b.lat(), lng: b.lng()});
      }

      if(!_.isEmpty(arr)) {
        arr.push({lat: bounds[0].lat(), lng: bounds[0].lng()});
      }
    }

    return arr;
  }

  componentDidUpdate () {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: new google.maps.LatLng(40.7388652,-73.9917875),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      streetViewControl: false
    });

    this.map = map;

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon', 'rectangle']
      },
      polygonOptions: {
        draggable: true,
        editable: true,
        fillColor: '#000',
        fillOpacity: 0.25,
        strokeWeight: 2,
        zIndex: 1
      },
      rectangleOptions: {
        draggable: true,
        editable: true,
        fillColor: '#000',
        fillOpacity: 0.25,
        strokeWeight: 2,
        zIndex: 1
      }
    });
    drawingManager.setMap(map);
    var shape = null;
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      if (event.type == google.maps.drawing.OverlayType.RECTANGLE || event.type == google.maps.drawing.OverlayType.POLYGON) {
        if(shape != null)
          shape.setMap(null);
        shape = event.overlay;
        var bounds = [];
        //should be setting component state here and sending to server when it changes
        if(event.type == google.maps.drawing.OverlayType.POLYGON) {
          var path = shape.getPath();
          this.props.onShapeChange(this.boundsToArray(path.getArray(), false));
          google.maps.event.addListener(path, 'set_at', () => {
            this.props.onShapeChange(this.boundsToArray(path.getArray(), false));
          });
          google.maps.event.addListener(path, 'insert_at', () => {
            this.props.onShapeChange(this.boundsToArray(path.getArray(), false));
          });
        } else {
          bounds = shape.getBounds();
          this.props.onShapeChange(this.boundsToArray(bounds, true));
          google.maps.event.addListener(shape, "bounds_changed", () => {
            bounds = shape.getBounds();
            this.props.onShapeChange(this.boundsToArray(bounds, true));
          });
        }

        drawingManager.setDrawingMode(null);
      }
    });

    google.maps.event.addListener(drawingManager, "drawingmode_changed", () => {
      if (drawingManager.getDrawingMode() &&
        (shape != null)) {
        shape.setMap(null);
        this.removeMarkers();
      }
    });
  }

  removeMarkers () {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });

    this.markers = [];
  }

  addMarkers(locations) {
    locations.forEach((location) => {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location._id[1], location._id[0]),
        map: this.map
      });

      this.markers.push(marker);

      var infowindow = new google.maps.InfoWindow;

      google.maps.event.addListener(marker, 'click', () => {
          infowindow.setContent("Count: " + location.count);
          infowindow.open(this.map, marker);
      });
    });
  }

  render() {
    return <div id="map" style={mapStyle}><i className="fa-li fa fa-spinner fa-spin"></i>Loading...</div>
  }
}