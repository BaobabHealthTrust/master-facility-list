/// <reference types="Cypress" />
const type = (cy, field, value) => {
  cy.get(`div.input-field input[name='${field}']`)
    .first()
    .click()
    .clear()
    .type(`${value}`)
    .blur();
};

const clear = (cy, field) => {
  cy.get(`div.input-field input[name='${field}']`)
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
      cy.login(credentials);
      cy.visit(FRONTEND_URL);
      cy.get("#nav-mobile li a[href='/facilities']").click();
      cy.get("a[href='/facilities/add']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/add`);
      });
    });

    it("Shows facility resources form", () => {
      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.get("div .mfl-active-form-wizard").contains("Resources");
      cy.get("div[test-id='resourcesForm'] div.input-field").each(
        (el, index) => {
          cy.wrap(el)
            .find("input")
            .first()
            .invoke("attr", "name")
            .then(val => {
              fields.push(val);
              details[val] = "10";
              clear(cy, val);
            });
        }
      );
    });
  });

  context("Validates input in front-end", () => {
    it("Validates resources values", () => {
      cy.get("div[test-id='resourcesForm']")
        .find("button")
        .first()
        .click();
      for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
        cy.get(`label[data-error="${errors.empty}"]`)
          .first(fieldIndex)
          .should("be.visible");
      }
    });
  });

  context("Adds Facility Resources", () => {
    it("Successfully Adds Facility Resources", () => {
      for (let field of fields) {
        type(cy, field, details[field]);
      }
    });

    it("Successfully Adds Facility Resources", () => {
      cy.get("div[test-id='resourcesForm']")
        .find("button")
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
