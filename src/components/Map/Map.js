import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { getFlyToData, getLayerData, getMapData, apiKey } from "./config";
import { getProfile } from '../../modules/Profile';
import BillingInfo from '../BillingInfo';
import RouteSelect from '../RouteSelect';
import OderPlaced from '../OderPlaced';

const style = {
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: 0,
  zIndex: -10
};

const Map = ({ profile }) => {
  const mapContainer = useRef();
  const id = useRef("");
  const [map, setMap] = useState("");
  const [coords, setCoords] = useState([]);
  const [isOrder, setIsOrder] = useState(false);

  const removeLayout = () => {
    map.removeLayer(id.current);
    setIsOrder(false);
  };

  useEffect(() => {
    mapboxgl.accessToken = apiKey;

    const map = new mapboxgl.Map(getMapData(mapContainer.current));

    setMap(map);
  }, []);

  useEffect(() => {
    if (coords.length) {
      id.current = Date.now().toFixed();

      map.addLayer(getLayerData(id.current, coords));
      map.flyTo(getFlyToData(coords[0]));

      setIsOrder(true);
    }
  }, [coords, map]);

  return ( 
    <div style={style} ref={mapContainer}>
      {isOrder && <OderPlaced removeLayout={removeLayout} />}
      {!isOrder && profile && <RouteSelect setCoords={setCoords} />}
      {!profile && <BillingInfo />}
    </div>
  )
}

export default connect(state => ({
  profile: getProfile(state)
}))(Map)