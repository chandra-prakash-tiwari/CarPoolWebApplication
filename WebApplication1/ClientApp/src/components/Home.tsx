import * as React from 'react'
import { CardContent, Typography, Card, ButtonBase } from '@material-ui/core';
import '../css/home.css';
import '../css/add-new-car.css'
import userServices from '../components/Anonymus/Services.js'

export default function Home() {
    return (
        <div className="home" >
            <div className='welcome'>
                <h1>Hey {userServices.currentUser.name.split(' ')[0]}</h1>
            </div>

            <div className='cards' >
                <ButtonBase href='/booking' >
                    < Card className='ride'>            
                        <CardContent >                            
                            < Typography className='cards-element' component='h1' variant='h5' >                
                                Book a Ride 
                            </Typography>
                        </CardContent>
                    </Card> 
                </ButtonBase>
                <ButtonBase href='/car'>
                    < Card className='booking' >
                        <CardContent >
                            < Typography className='cards-element' component='h1' variant='h5' >
                                Offer a Ride 
                            </Typography>
                        </CardContent>
                    </Card>
                </ButtonBase>
            </div>
        </div>
        
    )
}