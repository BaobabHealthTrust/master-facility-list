import React, { Component } from "react";

class Summary extends Component {
    render() {
        return (
            <div className="container">
                <h6 className="mfl-summary-subheader">
                    {"Bwaila District Hospital".toUpperCase()}
                </h6>
                <h5 className="mfl-summary-subtext">
                    {"ll00001,lilongwe".toUpperCase()}
                </h5>
                <div className="row z-depth-2">
                    <div className="col m6 s12">
                        <p className="center mfl-summary-header">Common Name</p>
                        <p className="center mfl-summary-text">
                            Bottom Hospital
                        </p>
                        <br />
                        <p className="center mfl-summary-header">
                            Facility Code
                        </p>
                        <p className="center mfl-summary-text">LL00111</p>
                    </div>

                    <div className="col m6 s12">
                        <p className="center mfl-summary-header">DATE OPENED</p>
                        <p className="center mfl-summary-text">May 1987</p>

                        <br />

                        <p className="center mfl-summary-header">
                            Facility Type
                        </p>
                        <p className="center mfl-summary-text">Hospital</p>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col m4 s12">
                        <div className=" z-depth-2 mlf-w-9 mfl-p-5">
                            <p className="center mfl-summary-header">
                                Contact Person
                            </p>

                            <table>
                                <tbody>
                                    <tr className="mfl-card-row">
                                        <td className="mfl-summary-subheader">
                                            fullname
                                        </td>
                                        <td className="right-align mfl-summary-subtext">
                                            japhat gondwe
                                        </td>
                                    </tr>
                                    <tr className="mfl-card-row">
                                        <td className="mfl-summary-subheader">
                                            email
                                        </td>
                                        <td className="right-align mfl-summary-subtext">
                                            jgondwe@gmail.com
                                        </td>
                                    </tr>

                                    <tr className="mfl-card-row">
                                        <td className="mfl-summary-subheader">
                                            phone
                                        </td>
                                        <td className="right-align mfl-summary-subtext">
                                            0888444101
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col m4 s12">
                        <div className=" z-depth-2 mlf-w-9 mfl-p-5">
                            <p className="center mfl-summary-header">
                                Physical Address
                            </p>
                            <table>
                                <tbody>
                                    <tr className="mfl-card-row">
                                        <td className="mfl-summary-subheader">
                                            postal address
                                        </td>
                                        <td className="right-align mfl-summary-subtext">
                                            p.o box 334
                                        </td>
                                    </tr>
                                    <tr className="mfl-card-row">
                                        <td className="mfl-summary-subheader">
                                            district
                                        </td>
                                        <td className="right-align mfl-summary-subtext">
                                            lilongwe
                                        </td>
                                    </tr>
                                    <tr className="mfl-card-row">
                                        <td className="mfl-summary-subheader">
                                            zone
                                        </td>
                                        <td className="right-align mfl-summary-subtext">
                                            district
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col m4 s12">
                        <div className=" z-depth-2 mlf-w-9 mfl-p-5">
                            <p className="center mfl-summary-header">
                                ownership&Regulation
                            </p>

                            <table>
                                <tbody>
                                    <tr className="mfl-card-row">
                                        <td className="mfl-summary-subheader">
                                            owner
                                        </td>
                                        <td className="right-align mfl-summary-subtext">
                                            government
                                        </td>
                                    </tr>
                                    <tr className="mfl-card-row">
                                        <td className="mfl-summary-subheader">
                                            operational status
                                        </td>
                                        <td className="right-align mfl-summary-subtext">
                                            operational
                                        </td>
                                    </tr>

                                    <tr className="mfl-card-row">
                                        <td className="mfl-summary-subheader">
                                            regulation status
                                        </td>
                                        <td className="right-align mfl-summary-subtext">
                                            licesenced
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;
