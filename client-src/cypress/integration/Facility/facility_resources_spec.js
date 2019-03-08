/// <reference types="Cypress" />

import { filter } from "bluebird";

describe("Tests Facility Resources Page", () => {
  const FRONTEND_URL = "http://localhost:3000";

  var facility;
  it("Renders facility resources page", () => {
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
  it("Renders the facility resources page", () => {
    var ref = `/facilities/${facility.id}/resources`;
    cy.get(`.nav-wrapper ul li a[href='${ref}']`)
      .first()
      .click();
    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/resources`
      );
    });
    cy.get(".container.mfl-titles")
      .first()
      .should("contain", facility.code);
  });
  it("Renders facility resources", () => {
    cy.fetch_current_resources(facility.id).then(res => {
      const data = res.body.data;
      if (data.length == 0) {
        cy.get("div.card-panel.yellow").should(
          "contain",
          "Resources are not available for this facility"
        );
      } else {
        var renderedResources = [];
        cy.get("table .mfl-card-row .mfl-summary-subheader")
          .each((el, index) => {
            renderedResources.push(el.context.innerHTML.toUpperCase());

            let quantity = data.filter(
              data =>
                data.resource.resource_name.toUpperCase() ==
                el.context.innerHTML.toUpperCase()
            )[0].quantity;

            cy.get("table .mfl-card-row .mfl-summary-subtext")
              .eq(index)
              .should("contain", quantity);
            expect(
              data.map(data => data.resource.resource_name.toUpperCase())
            ).to.include(el.context.innerHTML.toUpperCase());
          })
          .then(() => {
            expect(renderedResources).to.include.members(
              data.map(data => data.resource.resource_name.toUpperCase())
            );
          });
      }
    });
  });
});
