/// <reference types="Cypress" />
describe("Tests Facility Contacts Page", () => {
  const FRONTEND_URL = "http://localhost:3000";

  var facility;
  it("Renders facility contacts page", () => {
    cy.visit(`${FRONTEND_URL}/facilities`);
    // get random facility index
    var facilityIndex = 0;
    cy.fetch_facilieties_list().then(res => {
      facilityIndex =
        res.length >= 10
          ? Math.floor(Math.random() * 9)
          : Math.floor(Math.random() * (res.length - 1));
      facility = res[facilityIndex];
      cy.get("table tbody .MuiTableRow-root-32")
        .eq(facilityIndex)
        .click();
    });
  });
  it("Renders the facility contacts page", () => {
    var ref = `/facilities/${facility.id}/locations`;
    cy.get(`.nav-wrapper ul li a[href='${ref}']`)
      .first()
      .click();
    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/locations`
      );
    });
    cy.get(".container.mfl-titles")
      .first()
      .should("contain", facility.code);
    cy.fetch_current_facility(facility.id).then(locationDetails => {
      // catchment area
      cy.get("[test_id='location']")
        .find(".mfl-summary-subtext")
        .first()
        .should("contain", locationDetails.body.locations.catchment_area);
      // population
      cy.get("[test_id='location']")
        .find(".mfl-summary-subtext")
        .eq(1)
        .should("contain", locationDetails.body.locations.catchment_population);
      // district
      cy.get("[test_id='location']")
        .find(".mfl-summary-subtext")
        .eq(2)
        .should("contain", locationDetails.body.district.district_name);
      // physical address
      cy.get("[test_id='address']")
        .find(".mfl-summary-subtext")
        .first()
        .should("contain", locationDetails.body.addresses.physical_address);
      // postal address
      cy.get("[test_id='address']")
        .find(".mfl-summary-subtext")
        .eq(1)
        .should("contain", locationDetails.body.addresses.postal_address);
      // zone
      cy.get("[test_id='address']")
        .find(".mfl-summary-subtext")
        .eq(2)
        .should("contain", locationDetails.body.district.zone.zone_name);
      // contact person name
      cy.get("[test_id='person']")
        .find(".mfl-summary-subtext")
        .first()
        .should(
          "contain",
          locationDetails.body.contactPeople.contact_person_fullname
        );
      // contact person email
      cy.get("[test_id='person']")
        .find(".mfl-summary-subtext")
        .eq(1)
        .should(
          "contain",
          locationDetails.body.contactPeople.contact_person_email
        );
      // contact person phone
      cy.get("[test_id='person']")
        .find(".mfl-summary-subtext")
        .eq(2)
        .should(
          "contain",
          locationDetails.body.contactPeople.contact_person_phone
        );
    });
  });
});
