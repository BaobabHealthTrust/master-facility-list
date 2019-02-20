/// <reference types="Cypress" />
describe("Tests Facility Services Page", () => {
  const FRONTEND_URL = "http://localhost:3000";

  var facility;
  it("Renders facility services page", () => {
    cy.visit(`${FRONTEND_URL}/facilities`);
    // get random facility index
    var facilityIndex = Math.floor(Math.random() * 9);
    cy.fetch_facilieties_list().then(res => {
      facility = res[facilityIndex];
      cy.get("table tbody .MuiTableRow-root-32")
        .eq(facilityIndex)
        .click();
    });
  });
  it("Renders the facility services page", () => {
    var ref = `/facilities/${facility.id}/services`;
    cy.get(`.nav-wrapper ul li a[href='${ref}']`)
      .first()
      .click();
    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/services`
      );
    });
    cy.get(".container.mfl-titles")
      .first()
      .should("contain", facility.code);
  });
  it("Renders facility services", () => {
    cy.fetch_current_services(facility.id).then(res => {
      const data = res.body.hierarchy;
      if (data.length != 0) {
      }
    });
  });
});
