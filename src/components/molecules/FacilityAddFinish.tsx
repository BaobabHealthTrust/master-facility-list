import React from "react";
import styled from "styled-components";
import Card from "../atoms/Card";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

function FacilityAddFinish(props: Props) {
  const { facility, error } = props;
  return (
    <Card bodyStyle={{ padding: "0px" }}>
      <Body>
        {error ? (
          <>
            <Img src="/static/images/warning.svg" />
            <Text>
              Facility Saved. However, some details were not saved. <br />
              View the facility and edit the details to complete.
            </Text>
          </>
        ) : (
          <>
            <Img src="/static/images/checklist.svg" />
            <Text>Congratulations. Facility Successfully Added</Text>
          </>
        )}
      </Body>
      <Footer>
        <Link to={`/facilities/${facility.id}`}>
          <Button theme="success">View Facility</Button>
        </Link>
        <Link to="/facilities">
          <Button theme="default">Or All Facilities</Button>
        </Link>
      </Footer>
    </Card>
  );
}

type Props = {
  facility: any;
  error?: boolean;
};

export default FacilityAddFinish;

const Body = styled.div`
  min-height: 300px;
  padding: 50px;
`;
const Footer = styled.div`
  text-align: right;
  background: #ededed;
  padding: 10px;
`;

const Img = styled.img`
  margin: auto;
  width: 200px;
`;
const Text = styled.div`
  font-size: 26px;
  text-align: center;
  color: #669b31;
  padding-top: 0px 15px;
`;
