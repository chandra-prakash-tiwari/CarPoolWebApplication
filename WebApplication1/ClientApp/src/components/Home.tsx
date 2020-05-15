import * as React from 'react'
import { CardContent, Typography, Card, ButtonBase } from '@material-ui/core';
import '../css/home.css';
import '../css/add-new-car.css';
import UserService from '../Services/UserService'

export default class Home extends React.Component {

    render(){
        return (
            <div className="home" >
                <div className='welcome'>
                    <p>Hey {UserService.currentUser.name.split(' ')[0]}!</p>
                </div>
                <div className='cards' >
                    <ButtonBase href='/booking' >
                        < Card className='ride'>
                            <CardContent >
                                < Typography className='cards-element' component='h1' variant='h5' >Book a ride </Typography>
                            </CardContent>
                        </Card>
                    </ButtonBase>
                    <ButtonBase href='/ride/selectcar'>
                        < Card className='booking' >
                            <CardContent >
                                < Typography className='cards-element' component='h1' variant='h5' >Offer a ride </Typography>
                            </CardContent>
                        </Card>
                    </ButtonBase>
                </div>
            </div>
        )
    }
}