import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Paper, Typography, Select, MenuItem, InputLabel, FormControl, Button, withStyles } from '@material-ui/core';

const styles = theme => ({
    typo: {
      marginBottom: 15
    },
    button: {
      marginTop: 20
    },
    box: {
      padding: '28px',
      boxShadow: '0 0 5px rgba(0,0,0,0.3)',
      width: '30vw'
    }
})

const RouteSelect = ({ setCoords, classes }) => {
  const [values, setValues] = useState({
    from: "",
    to: ""
  });
  const [addresses, setAddresses] = useState([]);

  const onChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));

    setAddresses(oldValues => {
      return oldValues.map(item => {
        if (item.name === event.target.value) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
        return item;
      });
    });
  };

  const onCalling = () => {
    const { from, to} = values;

    if (!from && !to) {
      return;
    }

    axios.get(`https://loft-taxi.glitch.me/route?address1=${from}&address2=${to}`).then(response => {
      setCoords(response.data)
    })
  }

  useEffect(() => {
    axios.get("https://loft-taxi.glitch.me/addressList").then(response => {
      const { addresses } = response.data;

      const normalizeAddresses = addresses.map((item, index) => {
        return {
          id: index,
          name: item,
          isSelected: false
        };
      });

      setAddresses(normalizeAddresses);
    });
  }, []);

  return (
    <Box className={classes.box} zIndex="tooltip" position='absolute' left='20px' top='15vh'>
      {props => (
        <Paper {...props}>
            <Typography className={classes.typo} variant="h4">
              Вызов такси
            </Typography>
            <FormControl className={classes.typo} fullWidth>
              <InputLabel htmlFor="from">
                Выберите адрес отправления
              </InputLabel>
              <Select
                value={values.from}
                onChange={onChange}
                inputProps={{
                  name: "from",
                  id: "from"
                }}
              >
                {addresses.map(item => (
                  <MenuItem
                    key={item.id}
                    value={item.name}
                    disabled={item.isSelected}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="to">
                Выберите адрес прибытия
              </InputLabel>
              <Select
                value={values.to}
                onChange={onChange}
                inputProps={{
                  name: "to",
                  id: "to"
                }}
              >
                {addresses.map(item => (
                  <MenuItem
                    key={item.id}
                    value={item.name}
                    disabled={item.isSelected}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button className={classes.button} disabled={!(values.from && values.to)} variant="outlined" color="primary" onClick={onCalling}>
              ВЫЗВАТЬ ТАКСИ
            </Button>
        </Paper>
      )}
    </Box>
  );
};

export default withStyles(styles)(RouteSelect)