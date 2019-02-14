/// <reference types="Cypress" />
describe("Facility List Spec", () => {
  const FRONTEND_URL = "http://localhost:3000";

  it("Navigates to facility list page", () => {
    cy.visit(`${FRONTEND_URL}/facilities`);
    cy.get("#nav-mobile > li[class=active]")
      .first()
      .should("contain", "FACILITIES");
  });

  it("Shows Download", () => {
    cy.get(".fixed-action-btn.horizontal.mfl-download")
      .first()
      .should("be.visible");
  });

  it("Reveals Download buttons for all formats on hover", () => {
    cy.get(".fixed-action-btn.horizontal.mfl-download")
      .first()
      .trigger("mouseover");
    cy.get(".fixed-action-btn.horizontal.mfl-download ul li a")
      .first()
      .should("be.visible");
    cy.get(".fixed-action-btn.horizontal.mfl-download ul li a")
      .eq(1)
      .should("be.visible");
    cy.get(".fixed-action-btn.horizontal.mfl-download ul li a")
      .eq(2)
      .should("be.visible");
  });

  it("Downloads CSV", () => {
    cy.download_facility_list("csv").then(res => {
      expect(res.headers["content-type"]).to.contain("text/csv");
    });
  });
  it("Downloads EXCEL", () => {
    cy.download_facility_list("excel").then(res => {
      expect(res.headers["content-type"]).to.contain(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
    });
  });
  it("Downloads PDF", () => {
    cy.download_facility_list("pdf").then(res => {
      expect(res.headers["content-type"]).to.contain("application/pdf");
    });
  });
});
