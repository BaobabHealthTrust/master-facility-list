/// <reference types="Cypress" />

const type = (fieldName, value) => {
  cy.get(`input[name=${fieldName}]`)
    .first()
    .click()
    .clear()
    .type(value)
    .blur();
};

describe("Update Facility Basics DHO", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  var details = {
    commonName: "kuunika",
    dateOpened: "1975-01-01",
    district: 18,
    facilityName: "kuunika",
    facilityOwner: 8,
    facilityType: 9,
    operationalStatus: 5,
    publishedDate: null,
    registrationNumber: "11111111",
    regulatoryStatus: 5
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
    it("Renders the facility details page", () => {
      var ref = `/facilities/${facility.id}/summary`;
      cy.fetch_facility_details(facility.id).then(res => {
        facility = res;
      });

      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/${facility.id}`);
      });
    });
    it("Restrict update facility details form for unathorized", () => {
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/summary/edit`);
      cy.get("[data-test='unauthorised']").should("be.visible");
    });

    it("Renders update facility details form for DHO", () => {
      cy.login(credentials, "dho");
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/summary`);

      cy.get("[data-test='facilityUpdateButton']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/summary/edit`
        );
      });
    });
  });

  context("Validates input in front-end", () => {
    it("Validates facility name", () => {
      type("facilityName", "ku");

      cy.get(`[data-test=fieldErrorfacilityName]`)
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
  });

  context("Updates Facility Basics", () => {
    it("Successfully Updates Facility Basics", () => {
      cy.server({
        status: 200
      });
      cy.route(
        "PUT",
        `http://127.0.0.1:4000/api/Facilities/${facility.id}`,
        "fixture:update_facility_basics_success.json"
      ).as("update");

      type("facilityName", "kuunika");

      type("commonName", "kuunika");

      cy.get("[data-test='saveBtn']").click();

      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.wait("@update");

      cy.get("@update").then(xhr => {
        const { body } = xhr.request;

        cy.expect(body.facility_name).to.equal(details.facilityName);
        cy.expect(body.common_name).to.equal(details.commonName);
      });
    });
  });
});
