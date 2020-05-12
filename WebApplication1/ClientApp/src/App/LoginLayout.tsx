import * as React from 'react';
import { Grid } from '@material-ui/core';
import Login from '../components/Anonymus/Login';
import Text from '../components/Anonymus/Text'

export default class LoginLayout extends React.Component{
    render() {
        return (
            <Grid container className='page'>
                <Grid item xs={false} sm={4} md={8} className='image'>
                    <Text/>
                </Grid>
                <Login />
            </Grid>
            )
    }
}