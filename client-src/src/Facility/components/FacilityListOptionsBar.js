import React from "react";
import { isAdmin } from "../../helpers/utilities";
import styled from "styled-components";
import settings from "../../settings";
import { MFLRevealButton } from "../../common";
import { Link } from "react-router-dom";
import { ButtonConfiguration } from "../../types/helper-types";
import PropTypes from "prop-types";

const RevealButtonWrapper = styled.div.attrs({
  className: "hide-on-med-and-down"
})`
  margin-top: -10px;
`;

export function FacilityListOptionsBar(props) {
  const buttons: ButtonConfiguration = [
    {
      icon: "grid_on",
      action: () => _downloadFileIn("excel"),
      color: "#83bb70",
      text: "Download Excel",
      link: ""
    },
    {
      icon: "picture_as_pdf",
      action: () => _downloadFileIn("pdf"),
      color: "#c38665",
      text: "Download PDF",
      link: ""
    }
  ];

  const _renderAdvancedSearchButton = (): ReactElement<Link> => (
    <Link className="btn-flat" to="/facilities/search">
      <i className="material-icons left">search</i>
      <span>Advanced Search</span>
    </Link>
  );

  const _renderButtons = () =>
    buttons.map(button => <Button key={button.text} {...button} />);

  const _getWhereClause = (): whereClause => {
    const { filter } = props;
    return filter.length ? { id: { inq: filter } } : {};
  };

  const _downloadFileIn = (format: string): VoidFunction => {
    return window.open(
      `${settings.hostname}/api/facilities/download?data=` +
        JSON.stringify({
          where: _getWhereClause(),
          format
        })
    );
  };

  return (
    <div className="flex flex-row w-full justify-between mt-5 mb-5">
      {_renderAdvancedSearchButton()}
      {_renderButtons()}
      <div className="hide-on-small-only ml-auto">
        {isAdmin() && (
          <Button
            color="#517c4f"
            icon="add_circle"
            text="Add Facility"
            link="/facilities/add"
            onClick={() => {}}
          />
        )}
      </div>
    </div>
  );
}

export default function Button(props) {
  const { color, icon, text } = props;
  return props.link ? (
    <Link
      className={`ml-3 waves-effect btn`}
      to={props.link}
      style={{ backgroundColor: color }}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  ) : (
    <Link
      className={`ml-3 waves-effect btn`}
      style={{ backgroundColor: color }}
      to="#"
      onClick={() => props.action()}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  );
}

FacilityListOptionsBar.propTypes = {};
