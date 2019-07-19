/// <reference types="Cypress" />
describe("Facility List Spec", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  it("Navigates to facility list page", () => {
    cy.visit(`${FRONTEND_URL}/facilities`);
  });

  it("Shows Buttons", () => {
    cy.get("[data-test=downloadExcelBtn]").should("be.visible");
    cy.get("[data-test=downloadPdfBtn]").should("be.visible");
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
