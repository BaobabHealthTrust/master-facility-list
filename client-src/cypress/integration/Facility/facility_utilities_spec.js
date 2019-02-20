/// <reference types="Cypress" />
describe("Tests Facility Utilities Page", () => {
  const FRONTEND_URL = "http://localhost:3000";

  var facility;
  it("Renders facility utilities page", () => {
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
  it("Renders the facility utilities page", () => {
    var ref = `/facilities/${facility.id}/utilities`;
    cy.get(`.nav-wrapper ul li a[href='${ref}']`)
      .first()
      .click();
    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/utilities`
      );
    });
    cy.get(".container.mfl-titles")
      .first()
      .should("contain", facility.code);
  });
  it("Renders facility utilities", () => {
    cy.fetch_current_utilities(facility.id).then(res => {
      const data = res.body.data;
      if (data.length == 0) {
        cy.get("div.card-panel.yellow").should(
          "contain",
          "Utilities are not available for this facility"
        );
      } else {
        var renderedUtilities = [];
        cy.get("table .mfl-card-row .mfl-summary-subheader")
          .each(el => {
            renderedUtilities.push(el.context.innerHTML.toUpperCase());
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
