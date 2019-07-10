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

describe("Add Facility Basics", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  var details = {
    commonName: "kuunika",
    dateOpened: "1975-01-01",
    district: 1,
    facilityName: "kuunika",
    facilityOwner: 1,
    facilityType: 1,
    facility_code_mapping: null,
    operationalStatus: 1,
    publishedDate: null,
    registrationNumber: "11111111",
    regulatoryStatus: 1
  };

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const errors = {
    facilityName: "Facility name must have atleast 3 characters",
    facilityCommon: "Common name must have atleast 3 characters",
    registrationNumber: "Invalid Registration Number",
    empty: "You can't leave this field blank"
  };

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
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
  });

  context("Validates input in front-end", () => {
    it("Validates facility name", () => {
      type("facilityName", "ku");

      cy.get(`[data-test=fieldErrorfacilityName`)
        .first()
        .should("be.visible")
        .contains(errors.facilityName);
    });
    it("Validates facility common name", () => {
      type("commonName", "ku");

      cy.get(`[data-test=fieldErrorcommonName]`)
        .first()
        .should("be.visible")
        .contains(errors.facilityCommon);
    });

    it("Validates facility type", () => {
      validateSelect("facilityType", errors.empty);
    });

    it("Validates Operational Status", () => {
      validateSelect("operationalStatus", errors.empty);
    });

    it("Validates regulatory status", () => {
      validateSelect("regulatoryStatus", errors.empty);
    });

    it("Validates facility owner", () => {
      validateSelect("facilityOwner", errors.empty);
    });

    it("Validates district", () => {
      validateSelect("district", errors.empty);
    });

    it("Validates Registration", () => {
      type("registrationNumber", "1");

      cy.get(`[data-test=fieldErrorregistrationNumber]`)
        .first()
        .should("be.visible")
        .contains(errors.registrationNumber);
    });
  });

  context("Adds Facility Basics", () => {
    it("Successfully Adds Facility Basics", () => {
      cy.get("input[name='facilityName']")
        .first()
        .click()
        .clear()
        .type("kuunika");

      cy.get("input[name='commonName']")
        .first()
        .click()
        .clear()
        .type("kuunika");

      selectFirst("facilityType");

      selectFirst("operationalStatus");

      selectFirst("regulatoryStatus");

      selectFirst("facilityOwner");

      selectFirst("district");

      cy.get("input[name='registrationNumber']")
        .first()
        .click()
        .clear()
        .type("11111111");

      cy.get("[data-test='saveBtn']")
        .first()
        .click();
      cy.window().then(win => {
        let facility = JSON.parse(win.localStorage.new_facility);
        let facilityDetails = facility.details;
        cy.expect(facilityDetails).to.deep.equal({
          ...details
        });
      });
    });
  });
});
