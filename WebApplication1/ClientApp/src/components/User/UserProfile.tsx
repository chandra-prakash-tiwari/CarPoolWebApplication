import * as React from 'react';
import { User } from '../../Classes/DataClasses/User';
import UserService from '../../Services/UserService';
import '../../css/user-profile.css'

export default class UserProfile extends React.Component<{}, User> {
    constructor(props: User) {
        super(props);
        this.state = new User();
    }
    componentDidMount() {
        UserService.getUser(UserService.currentUser.id).then((user: any) => {
            this.setState({
                name:user.name,
                mobile: user.mobile,
                address: user.address,
                drivingLicence: user.drivingLicence,
                email: user.email,
                userName: user.userName
            })
        })
    }

    render() {
        return (
            <div className='profile-display'>
                <div className='block'>
                    <p className='left'>Name</p>
                    <p className='right'> : {this.state.name}</p>
                </div>
                <div className='block'>
                    <p className='left'>Mobile</p>
                    <p className='right'> : {this.state.mobile}</p>
                </div>
                <div className='block'>
                    <p className='left'>Address</p>
                    <p className='right'> : {this.state.address}</p>
                </div>
                <div className='block'>
                    <p className='left'>Driving Licence</p>
                    <p className='right'> : {this.state.drivingLicence}</p>
                </div>
                <div className='block'>
                    <p className='left'>Email</p>
                    <p className='right'> : {this.state.email}</p>
                </div>
                <div className='block'>
                    <p className='left'>UserName</p>
                    <p className='right'>: {this.state.userName}</p>
                </div>
            </div>
            )
    }
}