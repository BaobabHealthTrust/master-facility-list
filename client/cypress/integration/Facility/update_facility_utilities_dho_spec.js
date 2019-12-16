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
    it("Renders the facility utilities page", () => {
      var ref = `/facilities/${facility.id}/utilities`;
      cy.fetch_facility_details(facility.id).then(res => {
        facility = res;
      });
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/utilities`);

      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/utilities`
        );
      });
    });
    it("Restrict update facility utilities form for unathorized", () => {
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/utilities/edit`);
      cy.get("[data-test='unauthorised']").should("be.visible");
    });

    it("Renders update facility details form for DHO", () => {
      cy.login(credentials, "dho");
      cy.visit(`${FRONTEND_URL}/facilities/${facility.id}/utilities`);

      cy.get("[data-test='facilityUpdateButton']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(
          `${FRONTEND_URL}/facilities/${facility.id}/utilities/edit`
        );
      });
    });
  });

  context("Validates input in front-end", () => {
    it("Validates resources values", () => {
      cy.get("div[data-test='utilitiesForm'] span.MuiButtonBase-root").each(
        el => {
          cy.wrap(el).click();
          cy.wrap(el)
            .invoke("attr", "class")
            .then(cls => {
              if (cls.includes("Mui-checked")) {
                cy.wrap(el).click({ force: true });
              }
            });
        }
      );
      //   cy.get("[data-test='saveBtn']")
      //     .first()
      //     .click();

      // cy.get("div[data-test='utilitiesForm']").contains(
      //   "Energy Proovider,Water Provider,Waste Disposal,Network Provider"
      // );
    });
  });

  context("Updates Facility Utilities", () => {
    it("Successfully Updates Facility Utilities", () => {
      cy.server({
        status: 200
      });
      cy.route("POST", `http://127.0.0.1:4000/api/FacilityUtilities`, {
        success: "done"
      }).as("update");

      cy.get("div[data-test='utilitiesForm'] input").each(el => {
        cy.wrap(el).click();
      });

      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

      cy.fetch_utilities().then(utilities => {
        cy.wait("@update");
        cy.get("@update").then(xhr => {
          const { body } = xhr.request;
          cy.expect(utilities.map(util => util.id)).to.include.members(
            body.map(ut => ut.utility_id)
          );
        });
      });
    });
  });
});
