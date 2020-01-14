/// <reference types="Cypress" />
const type = (fieldName, value) => {
  cy.get(`input[name='${fieldName}']`)
    .first()
    .click()
    .clear()
    .type(`${value}`)
    .blur();
};

const clear = fieldName => {
  cy.get(`input[name='${fieldName}']`)
    .first()
    .click()
    .clear();
};

describe("Updates Facility Resources", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  var details = {};
  const fields = [];

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
    it("Renders the facility resources page", () => {
      var ref = `/facilities/${facility.id}/resources`;
      cy.fetch_facility_details(facility.id).then(res => {
        facility = res;
      });
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/resources`);

      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/resources`
        );
      });
    });
    it("Restrict update facility resources form for unathorized", () => {
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/resources/edit`);
      cy.get("[data-test='unauthorised']").should("be.visible");
    });

    it("Renders update facility resources form", () => {
      cy.login(credentials, "admin");
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/resources`);

      cy.get("[data-test='facilityUpdateButton']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/resources/edit`
        );
      });

      cy.get("[data-test='resourcesForm'] input").each((el, index) => {
        cy.wrap(el)
          .invoke("attr", "name")
          .then(val => {
            fields.push(val);
            details[val] = "10";
            clear(val);
          });
      });
    });
  });
  context("Validates input in front-end", () => {
    it("Validates resources values", () => {
      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      for (let field of fields) {
        cy.get(`[data-test="fieldError${field}"]`)
          .first()
          .should("be.visible")
          .contains("Invalid number");
      }
    });
  });

  context("Updates Facility Resources", () => {
    it("Successfully Updates Facility Resources", () => {
      cy.server({
        status: 200
      });
      cy.route("POST", `http://127.0.0.1:4000/api/FacilityResources`, {
        success: "done"
      }).as("update");

      for (let field of fields) {
        type(field, details[field]);
      }

      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.fetch_resources().then(resources => {
        cy.wait("@update");
        cy.get("@update").then(xhr => {
          const { body } = xhr.request;

          cy.expect(resources.map(r => r.id)).to.include.members(
            body.map(r => r.resource_id)
          );

          cy.expect(body.map(r => r.quantity)[0]).to.be.equal(
            Number(details[`resource_${resources[0].id}`])
          );
        });
      });
    });
  });
});
