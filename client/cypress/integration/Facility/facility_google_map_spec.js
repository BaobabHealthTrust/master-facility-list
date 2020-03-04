/// <reference types="Cypress" />
describe("Tests Facility Contacts Page", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  var facility;
  it("Renders facility details page", () => {
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
  it("Shows facility on google maps", () => {
    cy.fetch_current_facility(facility.id).then(locationDetails => {
      const location =
        locationDetails.body.geolocations &&
        locationDetails.body.geolocations.latitude !== ""
          ? `${parseFloat(
              locationDetails.body.geolocations.latitude
            )},${parseFloat(locationDetails.body.geolocations.longitude)}`
          : "-13.962612,33.774119";
      cy.wait(60 * 60);

      cy.get("div[test-id='fgooglemap'] a")
        .first()
        .invoke("attr", "href")
        .should("contain", `${location}`);
    });
  });
});
