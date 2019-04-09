/// <reference types="Cypress" />

describe("Test Dashboard Charts", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  it("Should Render all required charts", () => {
    cy.visit(FRONTEND_URL);

    cy.get("#regulatoryStatusContainer")
      .find("svg")
      .should("be.visible");
    cy.get("#operationalStatusContainer")
      .should("be.visible")
      .find("svg")
      .should("be.visible");
    cy.get("#typeOwnershipContainer")
      .find("svg")
      .should("be.visible");
  });

  it("Should show valid Regulatory Chart statistics", () => {
    cy.fetch_facilieties_aggre_by_reg_status().then(res => {
      res.map((graphData, index) => {
        cy.get("#regulatoryStatusContainer")
          .find(".recharts-bar-rectangle")
          .eq(index)
          .trigger("mouseover");
        cy.get(".recharts-tooltip-wrapper")
          .first()
          .should("be.visible");
        cy.get(".recharts-tooltip-wrapper")
          .first()
          .get(".recharts-tooltip-label")
          .first()
          .should("have.html", graphData.name);
        cy.get(".recharts-tooltip-wrapper")
          .first()
          .get(".recharts-tooltip-item-list")
          .get(".recharts-tooltip-item-value")
          .first()
          .should("have.html", `${graphData.count}`);
      });
    });
  });
  it("Should show valid Operation Chart statistics", () => {
    cy.fetch_facilieties_aggre_by_op_status().then(res => {
      var pieLegend = [];
      cy.get("#operationalStatusContainer")
        .find(".recharts-default-legend")
        .first()
        .find(".recharts-legend-item .recharts-legend-item-text")
        .each((el, index, list) => {
          pieLegend.push(el.context.innerHTML);
        })
        .then(() => {
          expect(res.map(data => data.name)).to.be.members(pieLegend);
        });
    });
  });
  it("Should show valid Ownership Chart statistics", () => {
    cy.fetch_facilieties_aggre_by_owner().then(res => {
      res.map((graphData, index) => {
        cy.get("#typeOwnershipContainer")
          .find(".recharts-bar-rectangle")
          .eq(index)
          .trigger("mouseover");
        cy.get(".recharts-tooltip-wrapper")
          .eq(1)
          .should("be.visible");
        cy.get(".recharts-tooltip-wrapper")
          .eq(1)
          .get(".recharts-tooltip-label")
          .eq(1)
          .should("have.html", graphData.name);
        cy.get(".recharts-tooltip-wrapper")
          .eq(1)
          .get(".recharts-tooltip-item-list")
          .get(".recharts-tooltip-item-value")
          .eq(1)
          .should("have.html", `${graphData.count}`);
      });
    });
  });
});
