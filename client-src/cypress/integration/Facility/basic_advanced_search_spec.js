/// <reference types="Cypress" />

import { filter } from "bluebird";

describe("Tests Facility Contacts Page", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  let districts;
  let types;
  let owners;
  let opStatuses;
  context("Renders Facility Page", () => {
    it("Renders facility page", () => {
      cy.visit(`${FRONTEND_URL}/facilities`);

      cy.get("#nav-mobile > li[class=active]")
        .first()
        .should("contain", "FACILITIES");
      cy.fetch_districts().then(res => {
        districts = res;
      });
      cy.fetch_facility_types().then(res => {
        types = res;
      });
      cy.fetch_operational_statuses().then(res => {
        opStatuses = res;
      });
      cy.fetch_owners().then(res => {
        owners = res;
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
  });
  context("Filters By District", () => {
    it("It filters by district", () => {
      cy.get("[class*='SearchTabs']")
        .first()
        .find(".input-field")
        .first()
        .click();

      cy.get("[class*='SearchTabs']")
        .first()
        .find("ul.dropdown-content.select-dropdown.active li")
        .eq(1)
        .click();

      cy.basic_filter("district_id", districts[1].id).then(res => {
        if (res.length > 0) {
          cy.get("[class*='MuiTable']")
            .first()
            .find("tbody tr")
            .each(el => {
              cy.wrap(el)
                .find("td")
                .eq(6)
                .contains(districts[1].district_name);
            });
        }
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

  context("Filters By Facility Type", () => {
    it("It filters by facility type", () => {
      cy.get("[class*='SearchTabs']")
        .first()
        .find(".input-field")
        .eq(1)
        .click();

      cy.get("[class*='SearchTabs']")
        .first()
        .find("ul.dropdown-content.select-dropdown.active li")
        .eq(1)
        .click();

      cy.basic_filter("facility_type_id", types[1].id).then(res => {
        if (res.length > 0) {
          cy.get("[class*='MuiTable']")
            .first()
            .find("tbody tr")
            .each(el => {
              cy.wrap(el)
                .find("td")
                .eq(4)
                .contains(types[1].facility_type);
            });
        }
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

  context("Filters By Ownership", () => {
    it("It filters by Ownership", () => {
      cy.get("[class*='SearchTabs']")
        .first()
        .find(".input-field")
        .eq(4)
        .click();

      cy.get("[class*='SearchTabs']")
        .first()
        .find("ul.dropdown-content.select-dropdown.active li")
        .eq(1)
        .click();

      cy.basic_filter("facility_owner", owners[1].id).then(res => {
        if (res.length > 0) {
          cy.get("[class*='MuiTable']")
            .first()
            .find("tbody tr")
            .each(el => {
              cy.wrap(el)
                .find("td")
                .eq(3)
                .contains(owners[1].facility_owner);
            });
        }
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
