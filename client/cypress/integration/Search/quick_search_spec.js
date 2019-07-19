/// <reference types="Cypress" />
describe("Tests Quick Search", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  var facility;
  it("Renders facility details page", () => {
    cy.visit(`${FRONTEND_URL}`);

    cy.get("[data-test=quickSearch]")
      .first()
      .click();

    cy.get("[name=search]").type("Lilongwe");

    cy.quick_search("Lilongwe").then(res => {
      cy.get("[data-test=quickSearchContainer] table tbody tr").each(row => {
        expect(row.text().toLowerCase()).to.contain("lilongwe");
      });
      res.map((facility, index) => {
        let searchRows = cy.get(
          "[data-test=quickSearchContainer] table tbody tr"
        );
        searchRows
          .eq(index)
          .find("td")
          .first()
          .should("contain", facility.code);
      });
    });

    cy.get("[name=search]").clear();
    cy.get("[name=search]").type("closed");
    cy.wait(60 * 60);

    cy.quick_search("closed").then(res => {
      cy.get("[data-test=quickSearchContainer] table tbody tr").each(row => {
        expect(row.text().toLowerCase()).to.contain("closed");
      });
      res.map((facility, index) => {
        cy.get("[data-test=quickSearchContainer] table tbody tr")
          .eq(index)
          .find("td")
          .first()
          .should("contain", facility.code);
      });

      if (res.length > 0) {
        cy.get("[data-test=quickSearchContainer] table tbody tr")
          .first()
          .click();
        cy.url().should(
          "equal",
          `${Cypress.env("FRONT_END_URL")}/facilities/${res[0].id}`
        );
      }
    });
  });
});
