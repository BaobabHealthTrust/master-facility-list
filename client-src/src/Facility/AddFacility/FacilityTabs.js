//@flow
import React from "react";
import { BasicDetailsForm, ContactsForm, ResourcesForm, UtilitiesForm, ServicesForm }
  from '../FacilityForms'
import footerResize from '../../helpers/footerResize';
import { FormWizardTabHeading } from '../../common';

class FacilityTabs extends React.Component<{}> {

  state = {
    active: 'Resources'
  }

  componentWillUpdate() {
    footerResize();
  }

  componentDidMount() {
    footerResize();
  }

  _switchForms = () => {
    switch (this.state.active) {
      case 'Basic Details':
        return <BasicDetailsForm onNext={() => this.setState({ active: 'Contacts & Location' })} />
      case 'Contacts & Location':
        return <ContactsForm onNext={() => this.setState({ active: 'Resources' })} />
      case 'Resources':
        return <ResourcesForm onNext={() => this.setState({ active: 'Utilities' })} />
      case 'Utilities':
        return <h2>Utilities Form</h2>

      default:
        return <BasicDetailsForm onNext={() => this.setState({ active: 'Contacts & Location' })} />
    }
  }

  render() {
    return (
      <div>
        <div
          className="mfl-form-wizard"
          style={styles.container}
        >
          <FormWizardTabHeading index="1" title="Basic Details" active={this.state.active} />
          <FormWizardTabHeading index="2" title="Contacts & Location" active={this.state.active} />
          <FormWizardTabHeading index="3" title="Resources" active={this.state.active} />
          <FormWizardTabHeading index="4" title="Utilities" active={this.state.active} />
        </div>
        <div>
          {this._switchForms()}
        </div>
      </div >
    );
  }
}

export default FacilityTabs;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: 20,
    marginTop: 20
  }
}
