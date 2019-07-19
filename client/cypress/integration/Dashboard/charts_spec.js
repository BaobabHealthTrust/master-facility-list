/// <reference types="Cypress" />

describe("Test Dashboard Charts", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  it("Should Render all required charts", () => {
    cy.visit(FRONTEND_URL);

    cy.get("[data-test=licenseStatus]")
      .find("svg")
      .should("be.visible");
    cy.get("[data-test=regulatoryStatus]")
      .should("be.visible")
      .find("svg")
      .should("be.visible");
  });

  it("Should show valid License Chart statistics", () => {
    var pieLegend = [];
    cy.get("[data-test=licenseStatus]")
      .find(".recharts-default-legend")
      .first()
      .find(".recharts-legend-item .recharts-legend-item-text")
      .each((el, index, list) => {
        pieLegend.push(el.context.innerHTML);
      })
      .then(() => {
        expect(["Registered", "Pending", "Not Registered"]).to.be.members(
          pieLegend
        );
      });
  });

  it("Should show valid Regualatory Chart statistics", () => {
    var pieLegend = [];
    cy.get("[data-test=regulatoryStatus]")
      .find(".recharts-default-legend")
      .first()
      .find(".recharts-legend-item .recharts-legend-item-text")
      .each((el, index, list) => {
        pieLegend.push(el.context.innerHTML);
      })
      .then(() => {
        expect(["Functional", "Closed (Temporary)", "Closed"]).to.be.members(
          pieLegend
        );
      });
  });
});
