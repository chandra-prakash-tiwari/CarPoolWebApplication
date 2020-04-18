import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Authentication from '../Helper/authentication';
import { Avatar } from '@material-ui/core';


export default function Profile() {
    const [close, open] = React.useState(null);

    const handleClick = (event) => {
        open(event.currentTarget);
    };

    const myRides = () => {
        window.location.pathname = '/myride';
    }

    const logout = () => {
        Authentication.logout();
        window.location.pathname = '/login';
    }

    return (
        <div className='Avatar'>
            <Button aria-controls="menu" onClick={handleClick}>
                <h5>{Authentication.currentUser.name}</h5>
                <Avatar/>
            </Button>
            <Menu id="menu" anchorEl={close} open={Boolean(close)} >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={myRides}>My Rides</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
} 
