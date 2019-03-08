/// <reference types="Cypress" />
describe("Tests Facility Details Page", () => {
  const FRONTEND_URL = "http://localhost:3000";

  var facility;
  it("Renders facility details page", () => {
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
  it("Renders the facility details page", () => {
    var ref = `/facilities/${facility.id}/summary`;
    cy.get(`.nav-wrapper ul li a[href='${ref}']`)
      .first()
      .click();
    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/summary`
      );
    });
    cy.get(".container.mfl-titles")
      .first()
      .should("contain", facility.code);
  });
});
