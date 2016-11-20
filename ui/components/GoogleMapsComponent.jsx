import React, {Component} from 'react';
import _ from 'lodash';

var mapStyle = {
  position: 'absolute',
  top: '0',
  left: '460px',
  right: '0',
  bottom: '0',
  'minWidth': '300px'
};

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.markers = [];
    this.pickupHeatmap = null;
    this.dropoffHeatmap = null;
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
      arr.push({lat: NE.lat(), lng: SW.lng()}); //NorthWest
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
      zoom: 12,
      center: new google.maps.LatLng(40.7388652,-73.9917875),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      streetViewControl: false,
      zoomControl: true
    });

    this.map = map;

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon', 'rectangle'],
        size: new google.maps.Size(48, 48)
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
        this.removeHeatMaps();
      }
    });
  }

  removeMarkers () {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });

    this.markers = [];
  }

  removeHeatMaps () {
    this.togglePickupHeatMap([], false);
    this.toggleDropoffHeatMap([], false);
    this.pickupHeatmap = null;
    this.dropoffHeatmap = null;
  }

  addMarkers(locations) {
    var i = 0;
    locations.forEach((location) => {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location._id[1], location._id[0]),
        map: this.map,
        title: "Count: " + location.count,
        label: ++i + ''
      });

      this.markers.push(marker);

      var infowindow = new google.maps.InfoWindow;

      google.maps.event.addListener(marker, 'click', () => {
          infowindow.setContent("Count: " + location.count);
          infowindow.open(this.map, marker);
      });
    });
  }

  toggleMarkerOn(id) {
    var marker = this.markers[id-1];
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  toggleMarkerOff(id) {
    var marker = this.markers[id-1];
    marker.setAnimation(null);
  }

  getHeatmapPoints(trips, isPickup) {
    var points = [];
    var coordinateIndex = isPickup ? 0 : 1;
    trips.forEach(function (trip) {
      var coord = trip.loc.coordinates[coordinateIndex];
      points.push(new google.maps.LatLng(coord[1], coord[0]));
    });
    return points;
  }

  togglePickupHeatMap (trips, state) {
    if(!this.pickupHeatmap && state) {
      this.addPickupHeatmap(trips);
    } else {
      this.pickupHeatmap.setMap(state ? this.map : null);
    }
  }

  toggleDropoffHeatMap (trips, state) {
    if(!this.dropoffHeatmap && state) {
      this.addDropoffHeatmap(trips);
    } else {
      this.dropoffHeatmap.setMap(state ? this.map : null);
    }
  }

  addPickupHeatmap (trips) {
    this.pickupHeatmap = new google.maps.visualization.HeatmapLayer({
      data: this.getHeatmapPoints(trips, true),
      map: this.map
    });
  }

  addDropoffHeatmap (trips) {
    this.dropoffHeatmap = new google.maps.visualization.HeatmapLayer({
      data: this.getHeatmapPoints(trips, false),
      map: this.map
    });

    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    this.dropoffHeatmap.set('gradient', gradient);
  }

  render() {
    return <div id="map" style={mapStyle}><i className="fa-li fa fa-spinner fa-pulse"></i>Loading...</div>
  }
}