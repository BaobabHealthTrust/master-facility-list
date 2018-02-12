import React from "react";

class SearchTag extends React.Component {
    render() {
        return (
            <div className="chip">
                {this.props.name}
                <i
                    onClick={(id) => {
                        this.props.removeSearchValues(
                            this.props.id,
                            this.props.actionType
                        ),
                            this.props.manageCheckbox(this.props.id)
                    }
                    }
                    className="mfl-close material-icons"
                >
                    close
                </i>
            </div >
        );
    }
}


export default SearchTag;
