/// <reference types="Cypress" />

export const OrderEntities = (orderBy, entities, dir = "asc") => {
  return dir == "asc"
    ? entities.sort((a, b) => (a[orderBy].trim() > b[orderBy].trim() ? 1 : -1))
    : entities.sort((a, b) => (a[orderBy].trim() > b[orderBy].trim() ? -1 : 1));
};

const selectFirst = fieldName => {
  cy.get(`[data-test=${fieldName}]`)
    .first()
    .click();

  cy.get(`[id=menu-${fieldName}] ul li`)
    .eq(2)
    .click();
};

describe("Tests Facility Contacts Page", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  let districts;
  let types;
  let owners;
  let opStatuses;
  before(() => {
    cy.fetch_districts().then(res => {
      districts = OrderEntities("district_name", res);
    });
    cy.fetch_facility_types().then(res => {
      types = OrderEntities("facility_type", res);
    });
    cy.fetch_operational_statuses().then(res => {
      opStatuses = OrderEntities("facility_operational_status", res);
    });
    cy.fetch_owners().then(res => {
      owners = OrderEntities("facility_owner", res);
    });
  });
  context("Renders Facility Page", () => {
    it("Renders facility page", () => {
      cy.visit(`${FRONTEND_URL}/facilities`);

      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities`);
      });
    });
  });

  context("Opens Search Drawer", () => {
    it("Opens Drawer", () => {
      cy.get("[data-test='search_drawer_btn']")
        .first()
        .click();
      cy.get("[data-test=advanced_search_container]")
        .first()
        .should("be.visible");
    });
  });
  context("Filters By District", () => {
    it("It filters by district", () => {
      selectFirst("districts");

      cy.basic_filter("district_id", districts[1].id).then(res => {
        if (res.length > 0) {
          cy.get("[class*='MuiTable']")
            .first()
            .find("tbody tr")
            .each(el => {
              cy.wrap(el)
                .find("td")
                .eq(3)
                .contains(districts[1].district_name);
            });
        }
      });
    });
    it("Removes Filter", () => {
      cy.get(`[data-test=${districts[1].district_name.replace(/ /gi, "_")}]`)
        .first()
        .find("svg")
        .first()
        .click();
    });
  });

  context("Filters By Facility Type", () => {
    it("It filters by facility type", () => {
      selectFirst("facilityTypes");

      cy.basic_filter("facility_type_id", types[1].id).then(res => {
        if (res.length > 0) {
          cy.get("[class*='MuiTable']")
            .first()
            .find("tbody tr")
            .each(el => {
              cy.wrap(el)
                .find("td")
                .eq(5)
                .contains(types[1].facility_type);
            });
        }
      });
    });
    it("Removes Filter", () => {
      cy.get(`[data-test=${types[1].facility_type.replace(/ /gi, "_")}]`)
        .first()
        .find("svg")
        .first()
        .click();
    });
  });

  context("Filters By Ownership", () => {
    it("It filters by Ownership", () => {
      selectFirst("facilityOwners");

      cy.basic_filter("facility_owner", owners[1].id).then(res => {
        if (res.length > 0) {
          cy.get("[class*='MuiTable']")
            .first()
            .find("tbody tr")
            .each(el => {
              cy.wrap(el)
                .find("td")
                .eq(4)
                .contains(owners[1].facility_owner);
            });
        }
      });
    });
    it("Removes Filter", () => {
      cy.get(`[data-test='${owners[1].facility_owner.replace(/ /gi, "_")}']`)
        .first()
        .find("svg")
        .first()
        .click();
    });
  });
});
