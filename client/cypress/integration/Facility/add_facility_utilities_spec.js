/// <reference types="Cypress" />

describe("Add Facility Utilities", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  var utilityCount = 0;

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
      win.localStorage.setItem("new_facility_active_tab", `Utilities`);
      win.localStorage.setItem(
        "new_facility",
        `{"details":{"facilityName":"kuunika"}}`
      );
    });
  });
  beforeEach(() => {
    cy.window().then(win => {
      win.localStorage.setItem("new_facility_active_tab", `Utilities`);
    });
  });

  context("Navigates to the add form", () => {
    it("Navigates to the facilities page", () => {
      cy.login(credentials);
      cy.visit(FRONTEND_URL);
      cy.get(`[data-test=menuFacilities]`).click();
      cy.get("[data-test=addFacilityBtn]").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/add`);
      });
    });

    it("Shows facility utilities form", () => {
      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();
    });
  });

  context("Validates input in front-end", () => {
    it("Validates utilities values", () => {
      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.get("[data-test='fieldErrorutilities']").contains(
        "Energy Proovider,Water Provider,Waste Disposal,Network Provider"
      );
    });
  });

  context("Adds Facility Utilities", () => {
    it("Successfully Adds Facility Utilities", () => {
      cy.get("[data-test='utilitiesForm'] input").each(el => {
        cy.wrap(el).click();
        utilityCount++;
      });

      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.fetch_add_facility().then(facility => {
        let facilityUtilities = facility.utilities;
        cy.expect(utilityCount).to.equal(facilityUtilities.length);
      });
    });
  });
});
