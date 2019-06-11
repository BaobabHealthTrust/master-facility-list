/// <reference types="Cypress" />

describe("Updates Facility Utilities", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };
  var utilityCount = 0;

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
      var ref = `/facilities/${facility.id}/utilities`;
      cy.fetch_facility_details(facility.id).then(res => {
        facility = res;
      });
      cy.get(`.nav-wrapper ul li a[href='${ref}']`)
        .first()
        .click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/utilities`
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
    });
  });

  context("Validates input in front-end", () => {
    it("Validates resources values", () => {
      cy.get("div[test-id='utilitiesForm'] div label").each(el => {
        cy.wrap(el).click();
        cy.wrap(el)
          .invoke("attr", "class")
          .then(cls => {
            if (cls == "active") {
              cy.wrap(el).click();
            }
          });
      });
      cy.get("div[test-id='utilitiesForm']")
        .find("button")
        .first()
        .click();

      cy.get("div[test-id='utilitiesForm']").contains(
        "Energy Proovider,Water Provider,Waste Disposal,Network Provider"
      );
    });
  });

  context("Updates Facility Utilities", () => {
    it("Successfully Updates Facility Utilities", () => {
      cy.server({
        status: 200
      });
      cy.route(
        "POST",
        `http://127.0.0.1:4000/api/FacilityUtilities/replaceOrCreate`,
        { success: "done" }
      ).as("update");

      cy.get("div[test-id='utilitiesForm'] div label").each(el => {
        cy.wrap(el).click();
      });

      cy.get("div[test-id='utilitiesForm']")
        .find("button")
        .first()
        .click();

      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.fetch_utilities().then(utilities => {
        for (let utility of utilities) {
          cy.wait("@update");
          cy.get("@update").then(xhr => {
            const { body } = xhr.request;
            cy.expect(body).to.have.deep.keys({
              client_id: 1,
              created_date: "2019-04-02T12:16:28.577Z",
              facility_id: 1035,
              id: null,
              utility_id: 4
            });
          });
        }
      });
    });
  });
});
