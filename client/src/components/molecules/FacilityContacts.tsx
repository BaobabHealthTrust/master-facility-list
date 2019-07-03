import React from "react";
import { Grid } from "@material-ui/core";
import SectionTitle from "../atoms/FacilityViewSectionTitle";
import FacilityDetail from "../atoms/FacilityDetail";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarker,
  faAddressBook
} from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faMapMarker, faAddressBook);

function FacilityDetails(props: Props) {
  const { facility } = props;

  const locationData = facility.locations
    ? [
        ["Catchment area", facility.locations.catchment_area],
        ["Population", facility.locations.catchment_population],
        ["District", facility.district.district_name],
        ["Latitude", facility.geolocations.latitude],
        ["Longitude", facility.geolocations.longitude]
      ]
    : [];

  const contactPersonData = facility.contactPeople
    ? [
        ["", facility.contactPeople.contact_person_fullname],
        ["", facility.contactPeople.contact_person_email],
        ["", facility.contactPeople.contact_person_phone]
      ]
    : [];

  const addressData = facility.addresses
    ? [
        ["", facility.addresses.physical_address],
        ["", facility.addresses.postal_address],
        ["", facility.district.zone.zone_name]
      ]
    : [];
  return (
    <Grid container>
      <Grid xs={12} sm={6} md={4}>
        <SectionTitle
          icon={<FontAwesomeIcon icon={faUser} />}
          text="Contact Person"
        />
        {contactPersonData.map(contact => (
          <FacilityDetail
            key={contact[0]}
            label={contact[0]}
            text={contact[1]}
          />
        ))}
      </Grid>

      <Grid xs={12} sm={6} md={4}>
        <SectionTitle
          icon={<FontAwesomeIcon icon={faMapMarker} />}
          text="Location"
        />
        {locationData.map(contact => (
          <FacilityDetail
            key={contact[0]}
            label={contact[0]}
            text={contact[1]}
          />
        ))}
      </Grid>

      <Grid xs={12} sm={6} md={4}>
        <SectionTitle
          icon={<FontAwesomeIcon icon={faAddressBook} />}
          text="Contact Address"
        />
        {addressData.map(contact => (
          <FacilityDetail
            key={contact[0]}
            label={contact[0]}
            text={contact[1]}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default FacilityDetails;

type Props = {
  facility: any;
};
