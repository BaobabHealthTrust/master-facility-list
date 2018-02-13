import React, { Component } from "react";
import Card from "../common/MflCard";

class MflLogin extends Component {
    render() {
        return (
            <div className="container mfl-container">
                <div className="row mfl-tm-20">
                    <div className="col m6 s12">
                        <input type="text" id="fname" name="fname" placeholder="Username" />

                    </div>
                </div>
                <div className="row">
                    <div className="col m6 s12">
                        <input type="password" id="fname" name="fname" placeholder="Password" />
                    </div>
                </div>
            </div>

        );
    }
}


export default MflLogin;
