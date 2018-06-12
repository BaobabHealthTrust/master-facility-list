//@flow
import React from "react";
import { BasicDetailsForm, ContactsForm, ResourcesForm, UtilitiesForm, ServicesForm }
  from '../FacilityForms'
import footerResize from '../../helpers/footerResize';
import { FormWizardTabHeading, FinishedForm } from '../../common';

class FacilityTabs extends React.Component<{}> {

  state = {
    active: 'Basic Details',
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
          fromAdd
          onNext={() => this.setState({ active: 'Contacts & Location' })}
          submitFacility={(facility) => this.setState({ facility })}
        />
      case 'Contacts & Location':
        return <ContactsForm
          fromAdd
          onNext={() => this.setState({ active: 'Resources' })}
          facility={this.state.facility}
        />
      case 'Resources':
        return <ResourcesForm
          fromAdd
          onNext={() => this.setState({ active: 'Utilities' })}
          facility={this.state.facility}
        />
      case 'Utilities':
        return <UtilitiesForm
          fromAdd
          onNext={() => this.setState({ active: 'Services' })}
          facility={this.state.facility}
        />
      case 'Services':
        return <ServicesForm
          fromAdd
          onNext={() => this.setState({ active: 'Finish' })}
          facility={this.state.facility}
        />
      case 'Finish':
        return <FinishedForm handleBack={() => this.props.handleCancelAddFacility()} />
      default:
        return <BasicDetailsForm
          fromAdd
          onNext={() => this.setState({ active: 'Contacts & Location' })}
          submitFacility={(facility) => this.setState({ facility })}
        />
    }
  }

  render() {
    return (
      <div>
        {
          this.state.active != 'Finish' && (
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
          )
        }
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
