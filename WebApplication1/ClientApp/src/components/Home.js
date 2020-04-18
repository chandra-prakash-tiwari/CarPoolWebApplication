import React from 'react'
import { CardContent, Typography, Card, ButtonBase } from '@material-ui/core';
import '../css/home.css';
import Authentication from '../Helper/authentication'

export default function Home() {
    return (
        <div className="home" >
            <div className='welcome'>
                <h1>Hey {Authentication.currentUser.name.split(' ')[0]}</h1>
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
                <ButtonBase href='/createride'>
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