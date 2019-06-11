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
      var ref = `/facilities/${facility.id}/resources`;
      cy.fetch_facility_details(facility.id).then(res => {
        facility = res;
      });
      cy.get(`.nav-wrapper ul li a[href='${ref}']`)
        .first()
        .click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/resources`
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
      cy.wait(60 * 10);
      cy.get(".mfl-download")
        .first()
        .find("ul li")
        .eq(1)
        .click();
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
      for (let index = 0; index < fields.length; index++) {
        cy.get("div[test-id='resourcesForm']")
          .find("button")
          .first()
          .click();

        cy.get(`label[data-error="${errors.empty}"]`)
          .first(index)
          .should("be.visible");
      }
    });
  });

  context("Updates Facility Resources", () => {
    it("Successfully Updates Facility Resources", () => {
      cy.server({
        status: 200
      });
      cy.route(
        "POST",
        `http://127.0.0.1:4000/api/FacilityResources/replaceOrCreate`,
        { success: "done" }
      ).as("update");

      for (let field of fields) {
        type(cy, field, details[field]);
      }

      cy.get("div[test-id='resourcesForm']")
        .find("button")
        .first()
        .click();

      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.fetch_resources().then(resources => {
        for (let resource of resources) {
          cy.wait("@update");
          cy.get("@update").then(xhr => {
            const { body } = xhr.request;
            cy.expect(body).to.have.deep.keys({
              client_id: 1,
              created_date: "2019-04-03T07:12:51.174Z",
              description: "",
              facility_id: 249,
              id: null,
              quantity: 10,
              resource_id: 1
            });
            cy.expect(body.quantity).to.be.equal(
              Number(details[`resource_${resource.id}`])
            );
          });
        }
      });
    });
  });
});
