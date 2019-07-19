/// <reference types="Cypress" />

const selectFirst = fieldName => {
  cy.get(`[data-test=${fieldName}]`)
    .first()
    .click();

  cy.get(`[id=menu-${fieldName}] ul li`)
    .first()
    .click();
};

describe("Add Facility Services", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  const BACKEND_URL = Cypress.env("API_URL");

  var details = {};
  const fields = [];
  let serviceTypes = [];

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const errors = {
    empty: `Invalid number`
  };

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
      win.localStorage.setItem("new_facility_active_tab", `Services`);
      win.localStorage.setItem(
        "new_facility",
        `{"details":{"facilityName":"kuunika"}}`
      );
    });
    cy.fetch_service_types().then(serviceTypesData => {
      serviceTypes = serviceTypesData;
    });
  });

  beforeEach(() => {
    cy.window().then(win => {
      win.localStorage.setItem("new_facility_active_tab", `Services`);
      win.localStorage.setItem(
        "new_facility",
        `{"details":{"facilityName":"kuunika"}}`
      );
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

    it("Shows facility contacts form", () => {
      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();
    });
  });

  context("Validates input in front-end", () => {
    it("Validates services values", () => {
      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.get(`[data-test="fieldErrorservices"]`)
        .first()
        .should("be.visible")
        .contains("Please Select Atleast One Service");
    });
  });

  context("Adds Facility Services", () => {
    let selectedServices;
    it("Successfully Adds Facility Services", () => {
      cy.server({
        status: 200
      });
      cy.route(
        "POST",
        `${BACKEND_URL}/Facilities`,
        "fixture:add_facility_basics_success.json"
      ).as("basics");

      cy.route(
        "POST",
        `${BACKEND_URL}/Facilities/contactDetails`,
        "fixture:add_facility_basics_success.json"
      ).as("contacts");

      cy.route("POST", `${BACKEND_URL}/FacilityResources`, {
        success: "done"
      }).as("resources");

      cy.route("POST", `${BACKEND_URL}/FacilityUtilities`, {
        success: "done"
      }).as("utilities");

      cy.route("POST", `${BACKEND_URL}/FacilityServices`, {
        success: "done"
      }).as("services");

      cy.route("POST", `${BACKEND_URL}/Facilities/publish`, {
        success: "done"
      }).as("publish");

      for (let serviceType of serviceTypes) {
        selectFirst(serviceType.service_type.replace(/ /g, ""));

        cy.get(`[id=menu-${serviceType.service_type.replace(/ /g, "")}]`)
          .first()
          .click();
        cy.get("[data-test=formFooter]")
          .first()
          .click();
      }

      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.wait("@basics");
      cy.wait("@contacts");
      cy.wait("@services");
      cy.wait("@publish");

      cy.get("@services").then(xhr => {
        const { body } = xhr.request;
        delete body[0].updated_at;
        delete body[0].client;
        cy.expect(body[0]).to.have.deep.keys({
          client_id: 1,
          facility_id: 1,
          service_id: 1
        });
      });
    });
  });
});
