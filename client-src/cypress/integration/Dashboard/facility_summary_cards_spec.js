/// <reference types="Cypress" />

describe("Test Dashboard Summary Statistics", () => {
  const FRONTEND_URL = "http://localhost:3000";

  it("Should show valid Facilities statistics", () => {
    cy.visit(FRONTEND_URL);
    cy.fetch_facilieties().then(res => {
      cy.get(".card")
        .first()
        .should("be.visible");
      cy.get(".card")
        .first()
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });

  it("Should show valid District Hospitals statistics", () => {
    cy.fetch_facilieties("facility_type_id", 5).then(res => {
      cy.get(".card")
        .eq(1)
        .should("be.visible");
      cy.get(".card")
        .eq(1)
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });

  it("Should show valid Health Centers statistics", () => {
    cy.fetch_facilieties("facility_type_id", 1).then(res => {
      cy.get(".card")
        .eq(2)
        .should("be.visible");
      cy.get(".card")
        .eq(2)
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });

  it("Should show valid Dispensary statistics", () => {
    cy.fetch_facilieties("facility_type_id", 2).then(res => {
      cy.get(".card")
        .eq(3)
        .should("be.visible");
      cy.get(".card")
        .eq(3)
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });

  it("Should show valid Health Post statistics", () => {
    cy.fetch_facilieties("facility_type_id", 4).then(res => {
      cy.get(".card")
        .eq(4)
        .should("be.visible");
      cy.get(".card")
        .eq(4)
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });
});
