/// <reference types="Cypress" />
import moment from "moment";
describe("Tests Facility Details Page", () => {
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
    cy.get(`[data-test=FacilitySummary]`).click();

    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/summary`
      );
    });
  });

  it("Shows Valid Facility Code", () => {
    cy.get("[data-test=facilityHeader]")
      .first()
      .should("contain", facility.code);
  });

  it("Shows Valid Basic Details", () => {
    cy.fetch_current_facility(facility.id).then(curFacility => {
      // owner
      cy.get("[data-test=detailLabelOwner]").should(
        "contain",
        curFacility.body.owner.facility_owner
      );
      // common name
      cy.get("[data-test=detailLabelCommonName]").should(
        "contain",
        curFacility.body.common_name
      );
      // type
      cy.get("[data-test=detailLabelFacilityType]").should(
        "contain",
        curFacility.body.facilityType.facility_type
      );
      // op status
      cy.get("[data-test=detailLabelOperationalStatus]").should(
        "contain",
        curFacility.body.operationalStatus.facility_operational_status
      );
      // date Opened
      cy.get("[data-test=detailLabelDateOpened]").should(
        "contain",
        moment(curFacility.body.facility_date_opened).format("MMMM DD YYYY")
      );
      // reg status
      cy.get("[data-test=detailLabelRegistrationStatus]").should(
        "contain",
        curFacility.body.regulatoryStatus.facility_regulatory_status
      );
    });
  });
});
