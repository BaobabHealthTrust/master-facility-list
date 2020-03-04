/// <reference types="Cypress" />

describe("Tests Facility Resources Page", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  var facility;
  it("Renders facility contacts page", () => {
    cy.visit(`${FRONTEND_URL}/facilities`);

    var facilityIndex = 0;
    cy.fetch_facilieties_list().then(res => {
      // get random facility index
      facilityIndex =
        res.length >= 10
          ? Math.floor(Math.random() * 9)
          : Math.floor(Math.random() * (res.length - 1));
      facility = res[facilityIndex];
      cy.get("[class*='MuiTable'] tbody [class*=MuiTableRow]")
        .eq(facilityIndex)
        .click();
    });
  });
  it("Renders the facility contacts page", () => {
    cy.get(`[data-test=FacilityResources]`).click();

    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/resources`
      );
    });
  });

  // it("Shows Valid Facility Code", () => {
  //   cy.get("[data-test=facilityHeader]")
  //     .first()
  //     .should("contain", facility.code);
  // });

  it("Renders facility resources", () => {
    cy.fetch_current_resources(facility.id).then(res => {
      const data = res.body.data;
      if (data.length > 0) {
        for (let resource of data) {
          cy.get(
            `[data-test='detailLabel${resource.resource.resource_name.replace(
              / /g,
              ""
            )}']`
          ).contains(resource.quantity);
        }
      }
    });
  });
});
