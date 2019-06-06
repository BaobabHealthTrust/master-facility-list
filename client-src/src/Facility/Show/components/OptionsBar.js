import React from "react";
import moment from "moment";
import { ButtonConfiguration } from "../../../types/helper-types";
import styled from "styled-components";
import settings from "../../../settings";
import { isAdmin } from "../../../helpers/utilities";
import { MFLRevealButton } from "../../../common";
import { Row, Col } from "react-materialize";
import { Paper, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

const Tools = styled.div.attrs({
  className: "hide-on-med-and-down"
})``;

const FlexRow = styled.div`
  display: flex;
`;

const StatusBadge = styled.span``;

const ButtonsContainer = styled.div.attrs({
  className: "flex justify-between"
})``;

const FacilityCodeDistrict = styled.h6``;

const LastUpdated = styled.small`
  font-style: italic;
  color: #7d7d7d;
`;

export default function OptionsBar(props) {
  const pathArr: string[] = props.location.pathname.split("/");
  const { current } = props;

  const buttonConfiguration: ButtonConfiguration = [
    {
      icon: "delete",
      action: () => props.handleArchive(),
      color: "red",
      name: "Delete Facility"
    },
    {
      icon: "edit",
      action: () =>
        this.setState({ pushTo: `${props.location.pathname}/edit` }),
      color: "green",
      name: "Edit Facility"
    },
    {
      icon: "file_download",
      action: () =>
        window.open(
          `${settings.hostname}/api/facilities/download/${
            props.match.params.id
          }`
        ),
      color: "blue",
      name: "Download Facility Details"
    }
  ];

  const _getBadgeClass = current => {
    let badgeClass = "new badge";
    if (current.operationalStatus) {
      switch (current.operationalStatus.facility_operational_status) {
        case "Closed":
          badgeClass = "new badge red";
          break;
        case "Closed (Temporary)":
          badgeClass = "new badge deep-orange";
          break;
        case "Functional":
          badgeClass = "new badge green";
          break;
        case "Pending Operation (Under construction)":
          badgeClass = "new badge orange";
          break;
        case "Pending Operation (Construction Complete)":
          badgeClass = "new badge brown";
          break;
        default:
          break;
      }
    }
    return badgeClass;
  };

  return (
    <Paper className="p-5 my-5">
      <FlexRow className="justify-between">
        <div>
          <div className={"pb-2"}>
            <b style={{ fontSize: "1.2rem" }}>
              {current.facility_code} ,{" "}
              {current.district && current.district.district_name}
            </b>
            {current.operationalStatus && (
              <StatusBadge
                id="badge"
                className={_getBadgeClass(current)}
                data-badge-caption={
                  current.operationalStatus.facility_operational_status
                }
              />
            )}
          </div>
          <div>
            aka <b>{current.common_name} </b>
            <LastUpdated>
              {`Last Updated - ${moment(current.updated_at).format("LLLL")}`}
            </LastUpdated>
          </div>
        </div>
        <Tools>
          <ButtonsContainer>
            <Button
              text="Download PDF"
              icon="file_download"
              color="#bd805f"
              onClick={() => {
                window.open(
                  `${settings.hostname}/api/facilities/download/${
                    props.match.params.id
                  }`
                );
              }}
            />
          </ButtonsContainer>

          {/* {pathArr[pathArr.length - 1] !== "edit" &&
            sessionStorage.getItem("token") && (
              <MFLRevealButton
                buttonConfiguration={buttonConfiguration}
                mainButtonConfiguration={{
                  color: "teal",
                  icon: "more_horiz"
                }}
              />
            )}
          {pathArr[pathArr.length - 1] !== "edit" &&
            !sessionStorage.getItem("token") && (
              <Button
                className="mt-4 flex flex-row align-center"
                onClick={() => {
                  window.open(
                    `${settings.hostname}/api/facilities/download/${
                      props.match.params.id
                    }`
                  );
                }}
              >
                <i className="material-icons">file_download</i>
                <div>Download</div>
              </Button>
            )} */}
        </Tools>
      </FlexRow>
    </Paper>
  );
}
function Button(props) {
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
      onClick={() => props.onClick()}
    >
      <i className="material-icons left">{icon}</i>
      {text}
    </Link>
  );
}
