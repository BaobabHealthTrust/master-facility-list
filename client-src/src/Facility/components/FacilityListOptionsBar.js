import React from "react";
import { isAdmin } from "../../helpers/utilities";
import styled from "styled-components";
import settings from "../../settings";
import { Link } from "react-router-dom";
import { ButtonConfiguration } from "../../types/helper-types";
import SearchButton from "./Search/SearchButton";

const ButtonsContainer = styled.div.attrs({
  className: "flex flex-row w-full justify-between mt-5 mb-5"
})``;

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

  const _renderButtons = () =>
    buttons.map(button => <Button key={button.text} {...button} />);

  const _getWhereClause = (): whereClause => {
    const { filterOptions } = props;
    const filter =
      filterOptions.length > 0 ? props.filter.map(facility => facility.id) : [];
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
    <ButtonsContainer>
      <SearchButton
        className="hide-on-med-and-down"
        onClick={props.onClick}
        open={props.open}
      />
      {_renderButtons()}
      <div className="hide-on-small-only ml-auto">
        {isAdmin() && (
          <Button
            margin="0"
            color="#517c4f"
            icon="add_circle"
            text="Add Facility"
            link="/facilities/add"
            onClick={() => {}}
          />
        )}
      </div>
    </ButtonsContainer>
  );
}

export default function Button(props) {
  const { color, icon, text } = props;
  const buttonClass = props.margin
    ? `waves-effect btn`
    : `mr-3 waves-effect btn`;
  return props.link ? (
    <Link
      className={buttonClass}
      to={props.link}
      style={{ backgroundColor: color }}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  ) : (
    <Link
      className={buttonClass}
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
