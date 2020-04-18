import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <Grid container className='abc'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Container>
                    {this.props.children}
                </Container>
            </Grid>
        );
    }
}
