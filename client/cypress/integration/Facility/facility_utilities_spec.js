/// <reference types="Cypress" />
describe("Tests Facility Utilities Page", () => {
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
    cy.get(`[data-test=FacilityUtilities]`).click();

    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/utilities`
      );
    });
  });

  // it("Shows Valid Facility Code", () => {
  //   cy.get("[data-test=facilityHeader]")
  //     .first()
  //     .should("contain", facility.code);
  // });

  it("Renders facility utilities", () => {
    cy.fetch_current_utilities(facility.id).then(res => {
      const data = res.body.data;
      if (data.length > 0) {
        var renderedUtilities = [];
        cy.get("[data-test='detailLabel']")
          .each(el => {
            cy.wrap(el)
              .invoke("text")
              .then(text => renderedUtilities.push(text.toUpperCase()));
          })
          .then(() => {
            expect(renderedUtilities).to.include.members(
              data.map(data => data.utility.utility_name.toUpperCase())
            );
          });
      }
    });
  });
});
