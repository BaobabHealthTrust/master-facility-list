/// <reference types="Cypress" />
describe("Update Facility Basics", () => {
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
      var ref = `/facilities/${facility.id}/summary`;
      cy.fetch_facility_details(facility.id).then(res => {
        facility = res;
      });
      cy.get(`.nav-wrapper ul li a[href='${ref}']`)
        .first()
        .click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/summary`
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
    it("Validates facility name", () => {
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

      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.wait("@update");

      cy.get("@update").then(xhr => {
        const { body } = xhr.request;

        cy.expect(body.facility_name).to.equal(details.facilityName);
        cy.expect(body.common_name).to.equal(details.commonName);
        cy.expect(body.registration_number).to.equal(
          details.registrationNumber
        );
      });
    });
  });
});
