import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Typography, Button, Box, withStyles, AppBar, Toolbar } from '@material-ui/core';
import {getIsAuthorized} from '../../modules/Auth';

const styles = theme => ({
    AppBar: {
        backgroundColor: 'white',
    },
    title: {
        color: 'black'
    }
})

const Header = ({ classes, IsAuthorized, logout }) => {
    return (
        <div>
            <AppBar className={classes.AppBar}>
                <Toolbar>
                    <Typography className={classes.title}
                        variant='h6'
                    >
                        Loft Taxi
                    </Typography>
                    <Box position='absolute' right={20}>
                        <Button component={Link} to='/map'>
                            Карта
                        </Button>
                        <Button component={Link} to='/profile'>
                            Профиль
                        </Button>
                        {IsAuthorized ? (
                            <Button onClick={logout}>Выйти</Button>
                        ) : (
                            <Button component={Link} to='/login'>Войти</Button>
                        )}
                    </Box>
            </Toolbar>
            </AppBar>
        </div>
    )
}

export default connect(
    state => ({
        IsAuthorized: getIsAuthorized(state)
    }),
)(withStyles(styles)(Header))