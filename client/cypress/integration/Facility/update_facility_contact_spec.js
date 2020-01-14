/// <reference types="Cypress" />
const type = (fieldName, value) => {
  cy.get(`input[name=${fieldName}]`)
    .first()
    .click()
    .clear()
    .type(value)
    .blur();
};

const clear = fieldName => {
  cy.get(`input[name=${fieldName}]`)
    .first()
    .click()
    .clear()
    .blur();
};
describe("Updates Facility Contacts and Locations", () => {
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
    catchmentPopulation: `You can't leave this field blank`,
    longitude: `You can't leave this field blank`,
    latitude: `You can't leave this field blank`
  };

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  var facility;
  context("Navigates to the update form", () => {
    it("Renders facility details page", () => {
      cy.login(credentials);
      cy.visit(`${FRONTEND_URL}/facilities`);
      // get random facility index

      cy.fetch_facilieties_list().then(res => {
        var facilityIndex =
          res.length >= 10
            ? Math.floor(Math.random() * 9)
            : Math.floor(Math.random() * (res.length - 1));
        facility = res[facilityIndex];
        cy.get("[class*='MuiTable'] tbody [class*=MuiTableRow]")
          .eq(facilityIndex)
          .click();
      });
    });
    it("Renders the facility locations page", () => {
      var ref = `/facilities/${facility.id}/locations`;
      cy.fetch_facility_details(facility.id).then(res => {
        facility = res;
      });
      cy.get("[data-test='FacilityContacts']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/contact`
        );
      });
    });
    it("Renders the update facility contact details form", () => {
      cy.get("[data-test='facilityUpdateButton']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/contact/edit`
        );
      });
    });
  });

  context("Validates input in front-end", () => {
    it("Validates address", () => {
      type("postalAddress", "ku");

      cy.get(`[data-test=fieldErrorpostalAddress]`)
        .first()
        .should("be.visible")
        .contains(errors.postalAddress);
    });
    it("Validates facility physical address", () => {
      type("physicalAddress", "ku");

      cy.get(`[data-test=fieldErrorphysicalAddress]`)
        .first()
        .should("be.visible")
        .contains(errors.physicalAddress);
    });
    it("Validates facility contact name", () => {
      type("contactName", "ku");

      cy.get(`[data-test=fieldErrorcontactName]`)
        .first()
        .should("be.visible")
        .contains(errors.contactName);
    });
    it("Validates phone number", () => {
      type("contactPhoneNumber", "ku");

      cy.get(`[data-test=fieldErrorcontactPhoneNumber]`)
        .first()
        .should("be.visible")
        .contains(errors.contactPhoneNumber);
    });
    it("Validates email", () => {
      type("contactEmail", "ku");

      cy.get(`[data-test=fieldErrorcontactEmail]`)
        .first()
        .should("be.visible")
        .contains(errors.contactEmail);
    });
    it("Validates catchment area", () => {
      type("catchmentArea", "ku");

      cy.get(`[data-test=fieldErrorcatchmentArea]`)
        .first()
        .should("be.visible")
        .contains(errors.catchmentArea);
    });
    it("Validates catchment area pupulation", () => {
      clear("catchmentPopulation");

      cy.get(`[data-test=fieldErrorcatchmentPopulation]`)
        .first()
        .should("be.visible")
        .contains(errors.catchmentPopulation);
    });
    it("Validates longitude", () => {
      clear("longitude");

      cy.get(`[data-test=fieldErrorlongitude]`)
        .first()
        .should("be.visible")
        .contains(errors.longitude);
    });
    it("Validates latitude", () => {
      clear("latitude");

      cy.get(`[data-test=fieldErrorlatitude]`)
        .first()
        .should("be.visible")
        .contains(errors.latitude);
    });
  });

  context("Updates Facility Contacts and Location", () => {
    it("Successfully Updates Facility Contacts and Location", () => {
      cy.server({
        status: 200
      });
      cy.route(
        "POST",
        `http://127.0.0.1:4000/api/Facilities/updateContactDetails`,
        "fixture:add_facility_basics_success.json"
      ).as("update");

      type("postalAddress", details.postalAddress);
      type("physicalAddress", details.physicalAddress);
      type("contactName", details.contactName);
      type("contactPhoneNumber", details.contactPhoneNumber);
      type("contactEmail", details.contactEmail);
      type("catchmentArea", details.catchmentArea);
      type("catchmentPopulation", details.catchmentPopulation);
      type("longitude", details.longitude);
      type("latitude", details.latitude);

      cy.get("[data-test='saveBtn']").click();

      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.wait("@update");

      cy.get("@update").then(xhr => {
        const { body } = xhr.request;
        delete body.data.updated_at;
        delete body.data.client;
        cy.expect(body.data).to.deep.equal(details);
      });
    });
  });
});
