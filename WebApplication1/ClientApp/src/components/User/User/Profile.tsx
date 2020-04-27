import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import userServices from '../../Anonymus/Services.js'
import { Avatar, ButtonBase } from '@material-ui/core';


export default function Profile() {
    const [close, open] = React.useState(null);

    const handleClick = (event: any) => {
        open(event.currentTarget);
    };

    const myRides = () => {
        window.location.pathname = '/myride';
    }

    const logout = () => {
        userServices.Logout();
        window.location.pathname = '/login';
    }

    const home = () => {
        window.location.pathname = '/home';
    }

    return (
        <div className='Avatar'>
            <Button aria-controls="menu" onClick={handleClick}>
                <h5>{userServices.currentUser.name}</h5>
                <Avatar/>
            </Button>
            <Menu id="menu" anchorEl={close} open={Boolean(close)} >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={myRides}>My Rides</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <ButtonBase>
                <span onClick={home}>HOME</span>
            </ButtonBase>
        </div>
    );
} 
