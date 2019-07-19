/// <reference types="Cypress" />

describe("Test Dashboard Summary Statistics", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  it("Should show valid Facilities statistics", () => {
    cy.visit(FRONTEND_URL);
    cy.fetch_facilieties().then(res => {
      cy.get("[data-test=TotalFacilities]").should("be.visible");
      cy.get("[data-test=TotalFacilities]")
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });

  it("Should show valid District Hospitals statistics", () => {
    cy.fetch_facilieties("facility_type_id", 5).then(res => {
      cy.get("[data-test=DistHospitals]").should("be.visible");
      cy.get("[data-test=DistHospitals]")
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });

  it("Should show valid Health Centers statistics", () => {
    cy.fetch_facilieties("facility_type_id", 1).then(res => {
      cy.get("[data-test=HealthCenters]").should("be.visible");
      cy.get("[data-test=HealthCenters]")
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });

  it("Should show valid Dispensary statistics", () => {
    cy.fetch_facilieties("facility_type_id", 2).then(res => {
      cy.get("[data-test=Dispensaries]").should("be.visible");
      cy.get("[data-test=Dispensaries]")
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });

  it("Should show valid Health Post statistics", () => {
    cy.fetch_facilieties("facility_type_id", 4).then(res => {
      cy.get("[data-test=HealthPosts]").should("be.visible");
      cy.get("[data-test=HealthPosts]")
        .find("p")
        .first()
        .should("have.html", `${res.length}`);
    });
  });
});
