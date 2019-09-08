import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { Box, Paper, Typography, Button, withStyles } from '@material-ui/core';
import { getFlyToData, getLayerData, getMapData, apiKey } from "./config";
import { getProfile } from '../../modules/Profile';
import BillingInfo from '../BillingInfo';
import RouteSelect from '../RouteSelect';

const styles = theme => ({
  layer: {
    width: "100%",
    height: "100vh",
    position: "absolute",
    top: 0,
    zIndex: -10
  },
  typo: {
    marginBottom: 25
  },
  button: {
    marginTop: 25
  },
  paper: {
    padding: '28px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    width: '30vw'
  }
})

const Map = ({ profile, classes }) => {
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
    <div className={classes.layer} ref={mapContainer}>
      {isOrder && <Box zIndex="tooltip" position='absolute' left='20px' top='15vh'>
                    <Paper className={classes.paper} >
                      <Typography className={classes.typo} variant='h4' align='left' >
                        Заказ размещён
                      </Typography>
                      <Typography align='left' >
                        Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.
                      </Typography>
                      <div>
                          <Button className={classes.button}
                          variant='outlined'
                          color='primary'
                          type="submit"
                          onClick={removeLayout}>
                          СДЕЛАТЬ НОВЫЙ ЗАКАЗ
                          </Button>
                      </div>
                    </Paper>
                  </Box>}
      {(!isOrder && profile) && <RouteSelect setCoords={setCoords} />}
      {!profile && <BillingInfo />}
    </div>
  )
}

export default connect(state => ({
  profile: getProfile(state)
}))(withStyles(styles)(Map))