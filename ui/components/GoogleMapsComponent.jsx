import React, {Component} from 'react';

var mapStyle = {
  width:"100%",
  height:"100%"
};

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate () {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: new google.maps.LatLng(this.props.lat,this.props.lon),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      streetViewControl: false
    });

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
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      if (event.type == google.maps.drawing.OverlayType.RECTANGLE || event.type == google.maps.drawing.OverlayType.POLYGON) {
        if(shape != null)
          shape.setMap(null);
        shape = event.overlay;
        var bounds = [];
        if(event.type == google.maps.drawing.OverlayType.POLYGON) {
          var path = shape.getPath();
          bounds = path.getArray();
          google.maps.event.addListener(path, 'set_at', function() {
            bounds = path.getArray();
            console.log(bounds);
          });
          google.maps.event.addListener(path, 'insert_at', function() {
            bounds = path.getArray();
            console.log(bounds);
          });
        } else {
          bounds = shape.getBounds();
          google.maps.event.addListener(shape, "bounds_changed", function() {
            bounds = shape.getBounds();
            console.log(bounds);
          });
        }
        console.log(bounds);

        drawingManager.setDrawingMode(null);
      }
    });

    google.maps.event.addListener(drawingManager, "drawingmode_changed", function() {
      if (drawingManager.getDrawingMode() &&
        (shape != null))
        shape.setMap(null);
    });
  }

  render() {
    return <div id="map" style={mapStyle}><i className="fa-li fa fa-spinner fa-spin"></i>Loading...</div>
  }
}