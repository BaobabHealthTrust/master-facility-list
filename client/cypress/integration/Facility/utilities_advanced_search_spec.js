/// <reference types="Cypress" />

import { filter } from "bluebird";

describe("Tests Facility Contacts Page", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  let utilities;

  context("Renders Facility Page", () => {
    it("Renders facility page", () => {
      cy.visit(`${FRONTEND_URL}/facilities`);

      cy.get("#nav-mobile > li[class=active]")
        .first()
        .should("contain", "FACILITIES");
      cy.fetch_utilities().then(res => {
        utilities = res;
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
    it("Navigates to utilities tab", () => {
      cy.get("[class*='MuiTabs']")
        .first()
        .find("button")
        .eq(2)
        .click();
    });
  });

  context("Filters By Utilities", () => {
    it("Selects utility", () => {
      cy.get("[class*='SearchTabs']")
        .first()
        .find(".input-field")
        .first()
        .click();

      cy.get("[class*='SearchTabs']")
        .first()
        .find("ul.dropdown-content.select-dropdown.active li")
        .first()
        .click();
    });
    it("It filters by resource range", () => {
      cy.utilities_filter(utilities[0].id).then(facilities => {
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
    it("Removes Filter", () => {
      cy.get("[class*='MuiDrawer']")
        .first()
        .find("[class*='MuiChip-root'] svg")
        .first()
        .click();
    });
  });
});
