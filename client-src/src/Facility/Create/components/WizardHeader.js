import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormWizardTabHeading } from "../../../common";
import _ from "lodash";

const WizardHeaderContainer = styled.ul`
  margin-bottom: 30px;
  overflow: hidden;
  counter-reset: step;
  display: flex;
`;

const WizardContainer = styled.div.attrs({
  className: "mfl-form-wizard-container"
})`
  margin-top: -18px;
`;

const WizardBackground = styled.div`
  height: 60px;
  padding-top: 15px;
  background: #375a8c;
`;

const LabelsContainer = styled.div`
  display: flex;
  text-align: center;
`;

const Label = styled.div`
  flex: 1;
`;

function WizardHeader(props) {
  const currentIndex = props.formLabels.indexOf(props.active);

  return (
    <React.Fragment>
      <WizardBackground>
        <LabelsContainer>
          {props.formLabels.map((label, index) => (
            <Label
              key={label}
              style={{
                color: currentIndex > index ? "#a0ea50" : "white"
              }}
            >
              {label}
            </Label>
          ))}
        </LabelsContainer>
      </WizardBackground>
      <WizardContainer>
        <WizardHeaderContainer>
          <FormWizardTabHeading
            index="1"
            title="Basic Details"
            active={props.active}
            completed={currentIndex > 0}
          />
          <FormWizardTabHeading
            index="2"
            title="Contacts & Location"
            active={props.active}
            completed={currentIndex > 1}
          />
          <FormWizardTabHeading
            index="3"
            title="Resources"
            active={props.active}
            completed={currentIndex > 2}
          />
          <FormWizardTabHeading
            index="4"
            title="Utilities"
            active={props.active}
            completed={currentIndex > 3}
          />
          <FormWizardTabHeading
            index="5"
            title="Services"
            active={props.active}
            completed={currentIndex > 4}
          />
        </WizardHeaderContainer>
      </WizardContainer>
    </React.Fragment>
  );
}

WizardHeader.propTypes = {};

export default WizardHeader;
