import React from 'react';
import { Card, Icon } from 'react-materialize';

export default (props) => {
    return (
        <Card>
            <h1 style=
                {{ borderBottom: '1px solid black', paddingBottom: '10px', marginBottom: '10px'}}
                >
                <Icon>{props.icon}</Icon>
                <span style={{float: 'right'}}>{props.count}</span>
            </h1>
            <p 
            style={{marginTop: 0, fontSize: '120%'}}>
                {props.title}
            </p>
        </Card>
    );
}