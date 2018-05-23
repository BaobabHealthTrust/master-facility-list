//@flow
import React from "react";
import { BasicDetailsForm, ContactsForm, ResourcesForm, UtilitiesForm, ServicesForm }
  from '../FacilityForms'
import footerResize from '../../helpers/footerResize';
import { FormWizardTabHeading } from '../../common';

class FacilityTabs extends React.Component<{}> {

  state = {
    active: 'Utilities',
    facility: {}
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
        return <BasicDetailsForm
          onNext={() => this.setState({ active: 'Contacts & Location' })}
          submitFacility={(facility) => this.setState({ facility })}
        />
      case 'Contacts & Location':
        return <ContactsForm
          onNext={() => this.setState({ active: 'Resources' })}
          facility={this.state.facility}
        />
      case 'Resources':
        return <ResourcesForm
          onNext={() => this.setState({ active: 'Utilities' })}
          facility={this.state.facility}
        />
      case 'Utilities':
        return <UtilitiesForm
          onNext={() => this.setState({ active: 'Services' })}
          facility={this.state.facility}
        />
      case 'Services':
        return <h4>Services Form</h4>
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
          <FormWizardTabHeading index="5" title="Services" active={this.state.active} />
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
