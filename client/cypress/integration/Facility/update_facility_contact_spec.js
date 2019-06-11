/// <reference types="Cypress" />
const type = (cy, field, value) => {
  cy.get(`div.input-field input[name='${field}']`)
    .first()
    .click()
    .clear()
    .type(`${value}`)
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
    it("Navigates to the facilities page", () => {
      cy.login(credentials);
      cy.visit(FRONTEND_URL);
      cy.get("#nav-mobile li a[href='/facilities']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities`);
      });
    });
    it("Renders facility details page", () => {
      cy.visit(`${FRONTEND_URL}/facilities`);
      // get random facility index

      cy.fetch_facilieties_list().then(res => {
        var facilityIndex =
          res.length >= 10
            ? Math.floor(Math.random() * 9)
            : Math.floor(Math.random() * (res.length - 1));
        facility = res[facilityIndex];
        cy.get("table tbody .MuiTableRow-root-32")
          .eq(facilityIndex)
          .click();
      });
    });
    it("Renders the facility details page", () => {
      var ref = `/facilities/${facility.id}/locations`;
      cy.fetch_facility_details(facility.id).then(res => {
        facility = res;
      });
      cy.get(`.nav-wrapper ul li a[href='${ref}']`)
        .first()
        .click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/locations`
        );
      });
      cy.get(".container.mfl-titles")
        .first()
        .should("contain", facility.code);
    });
    it("Renders the update facility details form", () => {
      cy.get(".mfl-download")
        .first()
        .trigger("mouseover");
      cy.wait(60 * 60);
      cy.get(".mfl-download")
        .first()
        .find("ul li")
        .eq(1)
        .click();
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

      type(cy, "postalAddress", details.postalAddress);
      type(cy, "physicalAddress", details.physicalAddress);
      type(cy, "contactName", details.contactName);
      type(cy, "contactPhoneNumber", details.contactPhoneNumber);
      type(cy, "contactEmail", details.contactEmail);
      type(cy, "catchmentArea", details.catchmentArea);
      type(cy, "catchmentPopulation", details.catchmentPopulation);
      type(cy, "longitude", details.longitude);
      type(cy, "latitude", details.latitude);

      cy.get("div[test-id='contactDetailsForm']")
        .find("button")
        .first()
        .click();

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
