import * as React from 'react'
import { Card, ButtonBase } from '@material-ui/core';
import '../../../css/car-selector.css';
import Services from './Services.js'

type allCars = {
    cars: [];
}

export default class CarSelector extends React.Component<{}, allCars> {
    constructor(props: allCars) {
        super(props);
        this.state = {
            cars: []
        }
    }

    componentDidMount() {
        var data=Services.GetCars()
        console.log(data);
        //this.setState({cars:data})
    }

    handleclick = (carRecord:any) => {
        localStorage.setItem('carDetails', JSON.stringify(carRecord));
        window.location.pathname = '/createride';
    }

    render() {

        const carDetails = this.state.cars.map((carRecord:any, i) => (
            <ButtonBase key={i} onClick={() => this.handleclick(carRecord)} >
                < Card className='car-cards'>
                    <div>
                        <p>Model : {carRecord.model}</p>
                    </div>
                    <div>
                        <p>Car Number : {carRecord.number}</p>
                    </div>
                    <div>
                        <p>MAX NUMBER OF SEAT: {carRecord.noofSeat}</p>
                    </div>
                </Card>
            </ButtonBase>
        ))

        return (
            <div className='car-selectors'>
                <div className='header'>
                    <h3>Select one car if not present then add that car</h3>
                </div>
                <div className='user-cars'>{carDetails}</div>
                <ButtonBase href='/car/addnewcar' >
                    < Card className='car-cards'>
                        <div className='add-new-car'>+</div>
                    </Card>
                </ButtonBase>
            </div>
        )
    }
}