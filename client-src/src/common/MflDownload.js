import React, { Component } from "react";
import { connect } from "react-redux";
import downloadFacilities from "../actions/download-facilities";
import fileDownload from "js-file-download";

class MflDownload extends Component {
    constructor(props) {
        super(props);
    }

    async handleDownload(format, fileName) {
        await this.props.downloadFacilities(format);
        await fileDownload(this.props.download, fileName);
    }

    render() {
        const excelFormat = `${this.props.fileName}.xlsx`;
        const csvFormat = `${this.props.fileName}.csv`;
        const pdfFormat = `${this.props.fileName}.pdf`;

        return (
            <div className="fixed-action-btn horizontal mfl-download right">
                <a className="btn-floating btn-large blue">
                    <i className="large material-icons">file_download</i>
                </a>
                <ul>
                    <li>
                        <a className="btn-floating red">
                            <i className="material-icons">picture_as_pdf</i>
                        </a>
                    </li>
                    <li>
                        <a
                            className="btn-floating green darken-1"
                            onClick={this.handleDownload.bind(
                                this,
                                "excel",
                                excelFormat
                            )}
                        >
                            <i className="material-icons">grid_on</i>
                        </a>
                    </li>
                    <li>
                        <a
                            className="btn-floating green darken-3"
                            onClick={this.handleDownload.bind(
                                this,
                                "csv",
                                csvFormat
                            )}
                        >
                            <i className="material-icons">insert_drive_file</i>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        download: state.downloads.data
    };
};

export default connect(mapStateToProps, { downloadFacilities })(MflDownload);
