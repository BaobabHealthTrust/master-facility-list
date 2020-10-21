/// <reference types="Cypress" />

const validateSelect = (name, error) => {
  cy.get(`[data-test=${name}]`)
    .first()
    .click();

  cy.get(`[id=menu-${name}]`)
    .first()
    .click();
  cy.get("[data-test=formFooter]")
    .first()
    .click();

  cy.get(`[data-test=fieldError${name}]`)
    .first()
    .should("be.visible")
    .contains(error);
};

const type = (fieldName, value) => {
  cy.get(`input[name=${fieldName}]`)
    .first()
    .click()
    .clear()
    .type(value)
    .blur();
};

const selectFirst = fieldName => {
  cy.get(`[data-test=${fieldName}]`)
    .first()
    .click();

  cy.get(`[id=menu-${fieldName}] ul li`)
    .first()
    .click();
};

const hasError = (fieldName, error) => {
  cy.get(`[data-test=fieldError${fieldName}`)
    .first()
    .should("be.visible")
    .contains(error);
};

const clear = fieldName => {
  cy.get(`input[name='${fieldName}']`)
    .first()
    .click()
    .clear();
};

describe("Add Facility Workflow OIC", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  const BACKEND_URL = Cypress.env("API_URL");

  const resourcesFields = [];
  let serviceTypes = [];
  var utilityCount = 0;
  var details = {
    basics: {
      commonName: "kuunika",
      dateOpened: "1975-01-01",
      district: 18,
      facilityName: "kuunika",
      facilityOwner: 8,
      facilityType: 9,
      facility_code_mapping: null,
      operationalStatus: 5,
      publishedDate: null,
      registrationNumber: null,
      regulatoryStatus: 5
    },
    contacts: {
      postalAddress: "P.O.Box 1",
      physicalAddress: "Kuunika",
      contactName: "Kuunika",
      contactEmail: "ku@gmail.com",
      contactPhoneNumber: "0888888888",
      catchmentArea: "Zero",
      catchmentPopulation: "100",
      longitude: "100",
      latitude: "-100"
    },
    resources: [],
    services: []
  };

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const errors = {
    basics: {
      facilityName: "Facility name must have atleast 3 characters",
      facilityCommon: "Common name must have atleast 3 characters",
      registrationNumber: "Invalid Registration Number",
      registrationNumber: "Invalid Registration Number",
      empty: "You can't leave this field blank"
    },
    contacts: {
      postalAddress: "Postal Address is too short",
      physicalAddress: "Physical Address is too short",
      contactName: "Contact Name is too short",
      contactEmail: "Invalid Email format",
      contactPhoneNumber: "Invalid phone number",
      catchmentArea: "Catchment Area is too short",
      catchmentPopulation: `Invalid number`,
      longitude: `longitude must be a positive number`,
      latitude: `latitude must be a negative number`
    },
    resources: {
      empty: `Invalid number`
    }
  };

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  context("Restrict add facility for unauthorized", () => {
    it("Rstricts unauthorized user group", () => {
      cy.login(credentials, "public");
      cy.visit(`${FRONTEND_URL}/facilities/add`);
      cy.get("[data-test='unauthorised']").should("be.visible");
    });
  });

  context("Adds Basics", () => {
    context("Navigates to the add form", () => {
      it("Navigates to the facilities page", () => {
        cy.login(credentials, "officer_in_charge");
        cy.visit(FRONTEND_URL);
        cy.visit(`${FRONTEND_URL}/facilities/add`);
        cy.get("[data-test='unauthorised']").should("be.visible");
      });
    });
  });
});
