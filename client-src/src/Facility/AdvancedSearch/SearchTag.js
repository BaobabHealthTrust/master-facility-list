import React from "react";

class SearchTag extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="chip">
                {this.props.name}
                <i
                    onClick={id =>
                        this.props.removeSearchValues(
                            this.props.id,
                            this.props.actionType
                        )
                    }
                    className="mfl-close material-icons"
                >
                    close
                </i>
            </div>
        );
    }
}

export default SearchTag;
