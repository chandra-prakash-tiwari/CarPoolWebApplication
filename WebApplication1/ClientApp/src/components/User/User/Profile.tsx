import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserService from '../../../Services/UserService'
import { Avatar, ButtonBase, SvgIcon } from '@material-ui/core';


export default function Profile() {
    const [open, close] = React.useState(null);

    const handleClick = (event:any) => {
        close(event.currentTarget);
    };

    const handleClose = () => {
        close(null);
    };

    const profile = () => {
        window.location.pathname = '/profile';
    }

    const myRides = () => {
        window.location.pathname = '/myride';
    }

    const logout = () => {
        UserService.logout();
        window.location.pathname = '/login';
    }

    const home = () => {
        window.location.pathname = '/home';
    }

    return (
        <div className='Avatar'>
            <Button aria-controls="menu" onClick={handleClick} style={{ margin: "0px 4px" }}>
                <p style={{ margin: '5px', fontFamily: 'Roboto', fontSize: '1.2rem', textTransform: "capitalize" }}>{UserService.currentUser.name}</p>
                <Avatar/>
            </Button>
            <Menu id="simple-menu"
                anchorEl={open}
                keepMounted
                open={Boolean(open)}
                onClose={handleClose} >
                <MenuItem onClick={profile} >Profile</MenuItem>
                <MenuItem onClick={myRides}>My Rides</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <ButtonBase style={{ height: '2.8rem', width:'2rem' }}>
                <SvgIcon onClick={home}>
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
            </ButtonBase>
        </div>
    );
} 
