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

describe("Add Facility Resources", () => {
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
      win.localStorage.setItem("new_facility_active_tab", `Resources`);
      win.localStorage.setItem(
        "new_facility",
        `{"details":{"facilityName":"kuunika"}}`
      );
    });
  });
  beforeEach(() => {
    cy.window().then(win => {
      win.localStorage.setItem("new_facility_active_tab", `Resources`);
    });
  });

  context("Navigates to the add form", () => {
    it("Navigates to the facilities page", () => {
      cy.login(credentials, "facility_in_charge");
      cy.visit(FRONTEND_URL);
      cy.get(`[data-test=menuFacilities]`).click();
      cy.get("[data-test=addFacilityBtn]").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/add`);
      });
    });

    it("Shows facility resorces form", () => {
      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

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

  context("Adds Facility Resources", () => {
    it("Successfully Adds Facility Resources", () => {
      for (let field of fields) {
        type(field, details[field]);
      }
    });

    it("Successfully Adds Facility Resources", () => {
      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.fetch_add_facility().then(facility => {
        let facilityResources = facility.resources;
        cy.expect(facilityResources).to.deep.equal({
          ...details
        });
      });
    });
  });
});
