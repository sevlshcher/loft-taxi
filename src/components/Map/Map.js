import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'

export default class Map extends Component {
    map = null;
    mapContainer = React.createRef();
  
    componentDidMount() {
      mapboxgl.accessToken = "pk.eyJ1Ijoic2V2bHNoY2hlciIsImEiOiJjazAzeDRoaWwwNWF3M21xb3dhbnFkOG1oIn0.3oJ9LkaEtxomxG7dTWxNMg";
      this.map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v9",
        center: [30.2656504, 59.8029126],
        zoom: 15
      });
    }
  
    componentWillUnmount() {
      this.map.remove();
    }
  
    render() {
      return <div ref={this.mapContainer} />;
    }
  }