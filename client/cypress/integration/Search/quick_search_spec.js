/// <reference types="Cypress" />
describe("Tests Quick Search", () => {
  const FRONTEND_URL = "http://localhost:3000";

  var facility;
  it("Renders facility details page", () => {
    cy.visit(`${FRONTEND_URL}`);
    // get random facility index
    cy.get("#searchbar").click();
    cy.get("#searchbar #search").type("Lilongwe");

    cy.quick_search("Lilongwe").then(res => {
      cy.get(".mfl-search-results-container table tbody tr").each(row => {
        expect(row.text().toLowerCase()).to.contain("lilongwe");
      });
      res.map((facility, index) => {
        let searchRows = cy.get(".mfl-search-results-container table tbody tr");
        searchRows
          .eq(index)
          .get("td")
          .first()
          .get("span")
          .should("contain", facility.code);
      });
    });

    cy.get("#searchbar #search").clear();
    cy.get("#searchbar #search").type("closed");
    cy.wait(60 * 60);

    cy.quick_search("closed").then(res => {
      cy.get(".mfl-search-results-container table tbody tr").each(row => {
        expect(row.text().toLowerCase()).to.contain("closed");
      });
      res.map((facility, index) => {
        let searchRows = cy.get(".mfl-search-results-container table tbody tr");
        searchRows
          .eq(index)
          .get("td")
          .first()
          .get("span")
          .should("contain", facility.code);
      });
    });

    cy.get("#searchbar #search").clear();
    cy.wait(60 * 60);

    cy.quick_search("").then(res => {
      res.map((facility, index) => {
        let searchRows = cy.get(".mfl-search-results-container table tbody tr");
        searchRows
          .eq(index)
          .get("td")
          .first()
          .get("span")
          .should("contain", facility.code);
      });
    });
  });
});
