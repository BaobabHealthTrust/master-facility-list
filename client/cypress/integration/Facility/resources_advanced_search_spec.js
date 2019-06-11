/// <reference types="Cypress" />

import { filter } from "bluebird";

describe("Tests Facility Contacts Page", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  let resources;

  context("Renders Facility Page", () => {
    it("Renders facility page", () => {
      cy.visit(`${FRONTEND_URL}/facilities`);

      cy.get("#nav-mobile > li[class=active]")
        .first()
        .should("contain", "FACILITIES");
      cy.fetch_resources().then(res => {
        resources = res;
      });
    });
  });

  context("Opens Search Drawer", () => {
    it("Opens Drawer", () => {
      cy.get("[test_id='search_drawer_btn']")
        .first()
        .click();
      cy.get("[class*='SearchTabs']")
        .first()
        .should("be.visible");
    });
    it("Navigates to resources tab", () => {
      cy.get("[class*='MuiTabs']")
        .first()
        .find("button")
        .eq(1)
        .click();
    });
  });

  context("Filters By Resources (min-max)", () => {
    it("It inputs minimum value", () => {
      cy.get("[class*='MuiHandleComponent']")
        .first()
        .trigger("mousedown");

      cy.get("[class*='MuiHandleComponent']")
        .first()
        .trigger("mouseup");
    });
    it("It filters by resource range", () => {
      let range = [];
      cy.get("[class*='MuiHandleComponent']")
        .first()
        .invoke("attr", "aria-valuenow")
        .then(val => {
          range[0] = Number(val);
          cy.get("[class*='MuiHandleComponent']")
            .eq(1)
            .invoke("attr", "aria-valuenow")
            .then(val => {
              range[1] = Number(val);
            })
            .then(() => {
              cy.resources_filter(resources[0].id, range).then(facilities => {
                if (facilities.length == 0) {
                  cy.get("[class*='MuiTable']")
                    .first()
                    .find("tbody")
                    .contains("No data");
                  return;
                }
                cy.get("[class*='MuiTable']")
                  .first()
                  .find("tbody tr")
                  .each((el, index) => {
                    cy.wrap(el)
                      .find("td")
                      .first()
                      .contains(facilities[index].code);
                  });
              });
            });
        });
    });
    it("Removes Filter", () => {
      cy.get("[class*='MuiDrawer']")
        .first()
        .find("[class*='MuiChip-root'] svg")
        .first()
        .click();
    });
  });

  context("Filters By Resources", () => {
    it("It inputs minimum value", () => {
      cy.get("[class*='MuiHandleComponent']")
        .first()
        .trigger("mousedown");

      cy.get("[class*='MuiHandleComponent']")
        .first()
        .trigger("mousemove", 10, 1, { force: true });

      cy.get("[class*='MuiHandleComponent']")
        .first()
        .trigger("mouseup");
    });
    it("It filters by resource range (min>0 - max)", () => {
      let range = [];
      cy.get("[class*='MuiHandleComponent']")
        .first()
        .invoke("attr", "aria-valuenow")
        .then(val => {
          range[0] = Number(val);
          cy.get("[class*='MuiHandleComponent']")
            .eq(1)
            .invoke("attr", "aria-valuenow")
            .then(val => {
              range[1] = Number(val);
            })
            .then(() => {
              cy.resources_filter(resources[0].id, range).then(facilities => {
                if (facilities.length == 0) {
                  cy.get("[class*='MuiTable']")
                    .first()
                    .find("tbody")
                    .contains("No data");
                  return;
                }
                cy.get("[class*='MuiTable']")
                  .first()
                  .find("tbody tr")
                  .each((el, index) => {
                    cy.wrap(el)
                      .find("td")
                      .first()
                      .contains(facilities[index].code);
                  });
              });
            });
        });
    });
    it("Removes Filter", () => {
      cy.get("[class*='MuiDrawer']")
        .first()
        .find("[class*='MuiChip-root'] svg")
        .first()
        .click();
    });
  });
});
