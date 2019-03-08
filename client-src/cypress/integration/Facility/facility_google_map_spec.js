/// <reference types="Cypress" />
describe("Tests Facility Contacts Page", () => {
  const FRONTEND_URL = "http://localhost:3000";

  var facility;
  it("Renders facility contacts page", () => {
    cy.visit(`${FRONTEND_URL}/facilities`);
    // get random facility index

    cy.fetch_facilieties_list().then(res => {
      var facilityIndex =
        res.length >= 10
          ? Math.floor(Math.random() * 9)
          : Math.floor(Math.random() * (res.length - 1));
      facility = res[facilityIndex];
      cy.get("table tbody .MuiTableRow-root-32")
        .eq(facilityIndex)
        .click();
    });
  });
  it("Shows facility on google maps", () => {
    var ref = `/facilities/${facility.id}/locations`;
    cy.get(`.nav-wrapper ul li a[href='${ref}']`)
      .first()
      .click();
    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/locations`
      );
    });
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
