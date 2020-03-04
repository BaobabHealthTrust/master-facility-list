/// <reference types="Cypress" />
describe("Tests Facility Contacts Page", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  var facility;
  it("Renders facility contacts page", () => {
    cy.visit(`${FRONTEND_URL}/facilities`);

    var facilityIndex = 0;
    cy.fetch_facilieties_list().then(res => {
      // get random facility index
      facilityIndex =
        res.length >= 10
          ? Math.floor(Math.random() * 9)
          : Math.floor(Math.random() * (res.length - 1));
      facility = res[facilityIndex];
      cy.get("[class*='MuiTable'] tbody [class*=MuiTableRow]")
        .eq(facilityIndex)
        .click();
    });
  });
  it("Renders the facility contacts page", () => {
    cy.get(`[data-test=FacilityContacts]`).click();

    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/contact`
      );
    });
  });

  // it("Shows Valid Facility Code", () => {
  //   cy.get("[data-test=facilityHeader]")
  //     .first()
  //     .should("contain", facility.code);
  // });

  it("Shows Valid Basic Details", () => {
    cy.fetch_current_facility(facility.id).then(curFacility => {
      // catchment area
      cy.get("[data-test=detailLabelCatchmentarea]").should(
        "contain",
        curFacility.body.locations.catchment_area
      );
      // population
      cy.get("[data-test=detailLabelPopulation]").should(
        "contain",
        curFacility.body.locations.catchment_population
      );
      // district
      cy.get("[data-test=detailLabelDistrict]").should(
        "contain",
        curFacility.body.district.district_name
      );
      // physical address
      cy.get("[data-test='detailLabel']")
        .eq(3)
        .should("contain", curFacility.body.addresses.physical_address);
      // postal address
      cy.get("[data-test='detailLabel']")
        .eq(4)
        .should("contain", curFacility.body.addresses.postal_address);
      // zone
      cy.get("[data-test='detailLabel']")
        .eq(5)
        .should("contain", curFacility.body.district.zone.zone_name);
      // contact person name
      cy.get("[data-test='detailLabel']")
        .first()
        .should(
          "contain",
          curFacility.body.contactPeople.contact_person_fullname
        );
      // contact person email
      cy.get("[data-test='detailLabel']")
        .eq(1)
        .should("contain", curFacility.body.contactPeople.contact_person_email);
      // contact person phone
      cy.get("[data-test='detailLabel']")
        .eq(2)
        .should("contain", curFacility.body.contactPeople.contact_person_phone);
    });
  });
});
