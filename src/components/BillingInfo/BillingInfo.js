import React from "react";
import { Link } from "react-router-dom";
import { Box, Paper, Typography, Button, withStyles } from '@material-ui/core';

const styles = theme => ({
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

const BillingInfo = ({ classes }) => {
  return (
    <Box zIndex="tooltip" position='absolute' left='20px' top='15vh'>
      <Paper className={classes.paper} >
        <Typography className={classes.typo} variant='h4' align='left' >
          Заполните платежные данные
        </Typography>
        <Typography variant='h8' align='left' >
          Укажите информацию о банковской карте, чтобы сделать заказ.
        </Typography>
        <div>
          <Button className={classes.button} component={Link} to='/profile'
            variant='outlined'
            color='primary'
            type="submit">
            ПЕРЕЙТИ В ПРОФИЛЬ.
          </Button>
        </div>
      </Paper>
    </Box>
  )
}

export default withStyles(styles)(BillingInfo)