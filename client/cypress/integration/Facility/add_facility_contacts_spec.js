/// <reference types="Cypress" />
const type = (cy, field, value) => {
  cy.get(`div.input-field input[name='${field}']`)
    .first()
    .click()
    .clear()
    .type(`${value}`)
    .blur();
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
    longitude: `Invalid number`,
    latitude: `Invalid number`
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
      cy.get("#nav-mobile li a[href='/facilities']").click();
      cy.get("a[href='/facilities/add']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/add`);
      });
    });

    it("Shows facility contacts form", () => {
      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.get("div .mfl-active-form-wizard").contains("Contacts & Location");
    });
  });

  context("Validates input in front-end", () => {
    it("Validates address", () => {
      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .first()
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='postalAddress']")
        .first()
        .click()
        .clear()
        .type("ku")
        .blur();

      cy.get(`label[data-error='${errors.postalAddress}']`)
        .first()
        .should("be.visible");
    });
    it("Validates facility physical address", () => {
      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(1)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='physicalAddress']")
        .first()
        .click()
        .clear()
        .type("ku")
        .blur();

      cy.get(`label[data-error='${errors.physicalAddress}']`)
        .first()
        .should("be.visible");
    });
    it("Validates facility contact name", () => {
      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(2)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='contactName']")
        .first()
        .click()
        .clear()
        .type("ku")
        .blur();

      cy.get(`label[data-error='${errors.contactName}']`)
        .first()
        .should("be.visible");
    });
    it("Validates phone number", () => {
      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(3)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='contactPhoneNumber']")
        .first()
        .click()
        .clear()
        .type("ku")
        .blur();

      cy.get(`label[data-error='${errors.contactPhoneNumber}']`)
        .first()
        .should("be.visible");
    });
    it("Validates email", () => {
      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(4)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='contactEmail']")
        .first()
        .click()
        .clear()
        .type("ku")
        .blur();

      cy.get(`label[data-error='${errors.contactEmail}']`)
        .first()
        .should("be.visible");
    });
    it("Validates catchment area", () => {
      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(5)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='catchmentArea']")
        .first()
        .click()
        .clear()
        .type("1")
        .blur();

      cy.get(`label[data-error="${errors.catchmentArea}"]`)
        .first()
        .should("be.visible");
    });
    it("Validates catchment area pupulation", () => {
      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(6)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='catchmentPopulation']")
        .first()
        .click()
        .clear()
        .blur();

      cy.get(`label[data-error="${errors.catchmentPopulation}"]`)
        .first()
        .should("be.visible");
    });
    it("Validates longitude", () => {
      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(7)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='longitude']")
        .first()
        .click()
        .clear()
        .blur();

      cy.get(`label[data-error="${errors.longitude}"]`)
        .first()
        .should("be.visible");
    });
    it("Validates latitude", () => {
      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(8)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='latitude']")
        .first()
        .click()
        .clear()
        .blur();

      cy.get(`label[data-error="${errors.latitude}"]`)
        .first()
        .should("be.visible");
    });
  });

  context("Adds Facility Contacts And Locations", () => {
    it("Successfully Adds Contacts And Locations", () => {
      type(cy, "postalAddress", details.postalAddress);
      type(cy, "physicalAddress", details.physicalAddress);
      type(cy, "contactName", details.contactName);
      type(cy, "contactPhoneNumber", details.contactPhoneNumber);
      type(cy, "contactEmail", details.contactEmail);
      type(cy, "catchmentArea", details.catchmentArea);

      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(6)
        .find("label")
        .first()
        .click();
      type(cy, "catchmentPopulation", details.catchmentPopulation);

      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(7)
        .find("label")
        .first()
        .click();
      type(cy, "longitude", details.longitude);

      cy.get("div[test-id='contactDetailsForm'] div.input-field")
        .eq(8)
        .find("label")
        .first()
        .click();
      type(cy, "latitude", details.latitude);

      cy.get("div[test-id='contactDetailsForm']")
        .find("button")
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
