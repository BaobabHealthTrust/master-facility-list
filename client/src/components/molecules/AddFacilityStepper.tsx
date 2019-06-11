import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FormWizardTabHeading from "../atoms/FormStep";

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

function WizardHeader(props: Props) {
  const { sections, active } = props;
  const currentIndex = sections.indexOf(active);

  return (
    <React.Fragment>
      <WizardBackground>
        <LabelsContainer>
          {sections
            .filter(sec => sec != "Finish")
            .map((label: string, index: number) => (
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
          {sections
            .filter(sec => sec != "Finish")
            .map((label: string, index: number) => (
              <FormWizardTabHeading
                key={index}
                title={label}
                active={active}
                completed={currentIndex > index}
              />
            ))}
        </WizardHeaderContainer>
      </WizardContainer>
    </React.Fragment>
  );
}

type Props = {
  sections: Array<string>;
  active: string;
};

export default WizardHeader;
