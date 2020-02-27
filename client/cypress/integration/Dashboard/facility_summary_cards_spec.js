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

  describe("Shows valid stats", () => {
    const FacilityTypesDisplay = {
      Hospitals: "District Hospital",
      HealthCenters: "Health Centre",
      HealthPosts: "Health Post",
      Dispensaries: "Dispensary"
    };
    let FacilityTypes = [];
    it("Should get facility types", () => {
      cy.fetch_facility_types().then(res => {
        FacilityTypes = res;
      });
    });

    it("Should show valid District Hospitals statistics", () => {
      const id = FacilityTypes.find(
        type => type.facility_type == FacilityTypesDisplay.Hospitals
      ).id;
      cy.fetch_facilieties("facility_type_id", id).then(res => {
        cy.get("[data-test=Hospitals]").should("be.visible");
        cy.get("[data-test=Hospitals]")
          .find("p")
          .first()
          .should("have.html", `${res.length}`);
      });
    });

    it("Should show valid Health Centers statistics", () => {
      const id = FacilityTypes.find(
        type => type.facility_type == FacilityTypesDisplay.HealthCenters
      ).id;
      cy.fetch_facilieties("facility_type_id", id).then(res => {
        cy.get("[data-test=HealthCenters]").should("be.visible");
        cy.get("[data-test=HealthCenters]")
          .find("p")
          .first()
          .should("have.html", `${res.length}`);
      });
    });

    it("Should show valid Dispensary statistics", () => {
      const id = FacilityTypes.find(
        type => type.facility_type == FacilityTypesDisplay.Dispensaries
      ).id;
      cy.fetch_facilieties("facility_type_id", id).then(res => {
        cy.get("[data-test=Dispensaries]").should("be.visible");
        cy.get("[data-test=Dispensaries]")
          .find("p")
          .first()
          .should("have.html", `${res.length}`);
      });
    });

    it("Should show valid Health Post statistics", () => {
      const id = FacilityTypes.find(
        type => type.facility_type == FacilityTypesDisplay.HealthPosts
      ).id;
      cy.fetch_facilieties("facility_type_id", id).then(res => {
        cy.get("[data-test=HealthPosts]").should("be.visible");
        cy.get("[data-test=HealthPosts]")
          .find("p")
          .first()
          .should("have.html", `${res.length}`);
      });
    });
  });
});
