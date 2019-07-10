/// <reference types="Cypress" />
const type = (fieldName, value) => {
  cy.get(`input[name='${fieldName}']`)
    .first()
    .click()
    .clear()
    .type(`${value}`)
    .blur();
};

const hasError = (fieldName, error) => {
  cy.get(`[data-test=fieldError${fieldName}`)
    .first()
    .should("be.visible")
    .contains(error);
};

describe("Add Facility Contacts", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  var details = {
    postalAddress: "P.O.Box 1",
    physicalAddress: "Kuunika",
    contactName: "Kuunika",
    contactEmail: "ku@gmail.com",
    contactPhoneNumber: "0888888888",
    catchmentArea: "100",
    catchmentPopulation: "100",
    longitude: "100",
    latitude: "-100"
  };

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const errors = {
    postalAddress: "Postal Address is too short",
    physicalAddress: "Physical Address is too short",
    contactName: "Contact Name is too short",
    contactEmail: "Invalid Email format",
    contactPhoneNumber: "Invalid phone number",
    catchmentArea: "Catchment Area is too short",
    catchmentPopulation: `Invalid number`,
    longitude: `longitude must be a positive number`,
    latitude: `latitude must be a negative number`
  };

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
      win.localStorage.setItem(
        "new_facility_active_tab",
        `Contacts & Location`
      );
      win.localStorage.setItem(
        "new_facility",
        `{"details":{"facilityName":"kuunika"}}`
      );
    });
  });
  beforeEach(() => {
    cy.window().then(win => {
      win.localStorage.setItem(
        "new_facility_active_tab",
        `Contacts & Location`
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
    it("Validates postal address", () => {
      type("postalAddress", "ku");

      hasError("postalAddress", errors.postalAddress);
    });

    it("Validates physical address", () => {
      type("physicalAddress", "ku");

      hasError("physicalAddress", errors.physicalAddress);
    });

    it("Validates contact name", () => {
      type("contactName", "ku");

      hasError("contactName", errors.contactName);
    });

    it("Validates phone", () => {
      type("contactPhoneNumber", "ku");

      hasError("contactPhoneNumber", errors.contactPhoneNumber);
    });

    it("Validates email", () => {
      type("contactEmail", "ku");

      hasError("contactEmail", errors.contactEmail);
    });

    it("Validates catchment area", () => {
      type("catchmentArea", "ku");

      hasError("catchmentArea", errors.catchmentArea);
    });
    it("Validates catchment area population", () => {
      type("catchmentPopulation", "ty");

      hasError("catchmentPopulation", errors.catchmentPopulation);
    });
    it("Validates latitude", () => {
      type("latitude", "1");

      hasError("latitude", errors.latitude);
    });

    it("Validates longitude", () => {
      type("longitude", "-1");

      hasError("longitude", errors.longitude);
    });
  });

  context("Adds Facility Contacts And Locations", () => {
    it("Successfully Adds Contacts And Locations", () => {
      type("postalAddress", details.postalAddress);
      type("physicalAddress", details.physicalAddress);
      type("contactName", details.contactName);
      type("contactPhoneNumber", details.contactPhoneNumber);
      type("contactEmail", details.contactEmail);
      type("catchmentArea", details.catchmentArea);
      type("catchmentPopulation", details.catchmentPopulation);

      type("longitude", details.longitude);

      type("latitude", details.latitude);

      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.fetch_add_facility().then(facility => {
        let facilityContacts = facility.contact;
        cy.expect(facilityContacts).to.deep.equal({
          ...details
        });
      });
    });
  });
});
