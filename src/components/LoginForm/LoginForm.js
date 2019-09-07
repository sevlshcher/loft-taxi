import React from "react";
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from "redux-form";
import { Grid, Paper, Typography, TextField, Button, withStyles } from '@material-ui/core';
import { loginSubmitRequest, getIsAuthorized } from '../../modules/Auth'

const styles = theme => ({
  Grid:{
    minHeight: "100vh"
  },
  Paper: {
    padding: '28px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    width: 320
  },
  Field: {
    marginTop: '30px'
  }
})

const customInput = ({
  input,
  type,
  placeholder,
  label,
  id,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <TextField
      {...input}
      {...rest}
      fullWidth
      error={touched && error}
      helperText={touched && error}
      placeholder={placeholder}
      label={label}
      type={type}
      id={id}
    />
  );
};

const myValidator = values => {
  const errors = {};
  if (values.username !== 'test@test.com') {
    errors.username = "Неверный логин";
  }
  if (values.password !== '123123') {
    errors.password = "Неправильный пароль";
  }
  return errors;
};

const LoginForm = props => {
  const { classes, handleSubmit, isAuthorized } = props
  const onSubmit = data => {
    const { loginSubmitRequest } = props
    loginSubmitRequest(data)
  }
  return isAuthorized ? (
    <Redirect to='/map' />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid className={classes.Grid}
        container
        alignItems='center'
        justify='center'
        direction='column-reverse'
      >
        <Paper className={classes.Paper} >
          <Typography variant='h4' align='center' >
            Войти
          </Typography>
          <div>
            <Field className={classes.Field}
              name="username"
              type="text"
              id="user-name"
              placeholder="Имя пользователя"
              label="Имя пользователя*"
              component={customInput}
            />
          </div>
          <div>
            <Field className={classes.Field}
              name="password"
              type="text"
              id="password"
              placeholder="Пароль"
              label="Пароль*"
              component={customInput}
            />
          </div>
          <Button className={classes.Field}
            variant='outlined'
            color='primary'
            type="submit">
            Войти
          </Button>
        </Paper>
      </Grid>
    </form>
  );
};

export default compose(
  connect( state => ({
    isAuthorized: getIsAuthorized(state)
  }), { loginSubmitRequest }
  ),
  reduxForm({
    form: "loginForm",
    validate: myValidator
  })
)(withStyles(styles)(LoginForm));