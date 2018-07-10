import React from 'react';

export default class MflCardGeneric extends React.Component{
    render() {
        return (
            <div className="z-depth-2 mlf-w-9">
                <div className="mfl-card-title  bg-blue">
                    {this.props.heading}
                </div>
                <div className=" mfl-p-2 mfl-bm-5">
                    {this.props.view}
                </div>
            </div>
        );
    }
}