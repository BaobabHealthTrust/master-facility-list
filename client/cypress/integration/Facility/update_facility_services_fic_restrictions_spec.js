/// <reference types="Cypress" />

const selectFirst = fieldName => {
  cy.get(`[data-test=${fieldName}]`)
    .first()
    .click();

  cy.get(`[id=menu-${fieldName}] ul li`)
    .first()
    .click();
};

describe("Update Facility Services", () => {
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

  var facility;
  context("Navigates to the update form", () => {
    it("Renders facility details page)", () => {
      cy.login(credentials, "public");
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
    it("Renders the facility services page", () => {
      var ref = `/facilities/${facility.id}/services`;
      cy.fetch_facility_details(facility.id).then(res => {
        facility = res;
      });
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/services`);

      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/services`
        );
      });
    });

    it("Restrict update facility services form for unathorized", () => {
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/services/edit`);
      cy.get("[data-test='unauthorised']").should("be.visible");
    });

    it("Renders update facility services form", () => {
      cy.login(credentials, "facility_in_charge");
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/services`);

      cy.get("[data-test='facilityUpdateButton']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/services/edit`
        );
      });
    });
  });

  context("Update Facility Services", () => {
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

      // for (let serviceType of serviceTypes) {
      //   selectFirst(serviceType.service_type.replace(/ /g, ""));

      //   cy.get("[data-test=formFooter]")
      //     .first()
      //     .click({ force: true });
      // }

      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.wait("@basics");
      cy.wait("@contacts");
      cy.wait("@services");
      cy.wait("@publish");

      cy.get("@services").then(xhr => {
        const { body } = xhr.request;
        cy.expect(body);
      });
    });
  });
});
