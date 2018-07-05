import React from 'react';
import { GenericCard } from './index'

export default (props) => {
    return (
        <GenericCard count={props.count} title={props.title} icon={props.icon} />
    );
}