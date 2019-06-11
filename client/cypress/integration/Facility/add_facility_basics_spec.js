/// <reference types="Cypress" />
describe("Add Facility Basics", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  var details = {
    commonName: "kuunika",
    dateOpened: "1975-01-01",
    district: 1,
    facilityName: "kuunika",
    facilityOwner: 1,
    facilityType: 1,
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
    registrationNumber: "Invalid Registration Number"
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
      cy.get("#nav-mobile li a[href='/facilities']").click();
      cy.get("a[href='/facilities/add']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/add`);
      });
    });
    it("Shows user basics form", () => {
      cy.get("div .mfl-active-form-wizard").contains("Basic Details");
    });
  });

  context("Validates input in front-end", () => {
    it("Validates facility name", () => {
      cy.get("div[test-id='basicDetailsForm'] div.input-field")
        .first()
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='facilityName']")
        .first()
        .click()
        .clear()
        .type("ku")
        .blur();

      cy.get(`label[data-error='${errors.facilityName}']`)
        .first()
        .should("be.visible");
    });
    it("Validates facility common name", () => {
      cy.get("div[test-id='basicDetailsForm'] div.input-field")
        .eq(1)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='commonName']")
        .first()
        .click()
        .clear()
        .type("ku")
        .blur();

      cy.get(`label[data-error='${errors.facilityCommon}']`)
        .first()
        .should("be.visible");
    });

    it("Validates Registration", () => {
      cy.get("div[test-id='basicDetailsForm'] div.input-field")
        .eq(10)
        .find("label")
        .first()
        .click();

      cy.get("div.input-field input[name='registrationNumber']")
        .first()
        .click()
        .clear()
        .type("1")
        .blur();

      cy.get(`label[data-error='${errors.registrationNumber}']`)
        .first()
        .should("be.visible");
    });
  });

  context("Adds Facility Basics", () => {
    it("Successfully Adds Facility Basics", () => {
      cy.get("div.input-field input[name='facilityName']")
        .first()
        .click()
        .clear()
        .type("kuunika");

      cy.get("div.input-field input[name='commonName']")
        .first()
        .click()
        .clear()
        .type("kuunika");

      cy.get("div.input-field input[name='registrationNumber']")
        .first()
        .click()
        .clear()
        .type("11111111");

      cy.get("div[test-id='basicDetailsForm']")
        .find("button")
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
