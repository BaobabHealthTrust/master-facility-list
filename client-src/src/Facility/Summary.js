import React, { Component } from 'react';

class Summary extends Component {
    render() {
        return (
            <div className="container">
                <h6>
                    <strong>{'Bwaila District Hospital'.toUpperCase()}</strong>
                </h6>
                <div className="row z-depth-2">
                    <div className="col m6 s12">
                        <p className="center">
                            Common Name <hr />Bottom Hospital
                        </p>
                        <br />
                        <p className="center">
                            Facility Code <hr />LL001
                        </p>
                    </div>

                    <div className="col m6 s12">
                        <p className="center">
                            DATE OPENED <hr /> MAY 1987
                        </p>

                        <br />

                        <p className="center">
                            Facility Type <hr /> HOSPITAL
                        </p>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col m4 s12">
                        <p className="center z-depth-2 mlf-w-9">
                            CONTACT PERSON <hr /> FULL NAME: JAPHAT GONDWE
                        </p>
                    </div>

                    <div className="col m4 s12">
                        <p className="center z-depth-2 mlf-w-9">
                            ADDRESS <hr /> POSTAL ADDRESS: BOX 2505
                        </p>
                    </div>

                    <div className="col m4 s12">
                        <p className="center z-depth-2 mlf-w-9">
                            OWNERSHIP & REGULATION <hr />OWNER: MALAWI
                            GOVERNMENT
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;
