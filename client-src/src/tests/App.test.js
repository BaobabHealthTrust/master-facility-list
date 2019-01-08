import React from "react";
import ReactDOM from "react-dom";
// import FacilityList from "../Facility/FacilityList";
import renderer from "react-test-renderer";
import Enzyme, {shallow} from "enzyme";

class Sample extends React.Component {
  render() {
    return <div>Hey there... you!</div>;
  }
}

const sampleFacility = {
  code: "CP020001",
  common: "Hyatt Inc",
  dateOpened: "Invalid date",
  district: "Chitipa",
  id: 1,
  name: "Msumbe Health Center",
  ownership: "Christian Health Association of Malawi (CHAM)",
  regulatoryStatus: "Registration cancelled"
};

it("renders landing page", () => {
  const component = renderer.create(<Sample />);

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
