/// <reference types="Cypress" />
describe("Tests Facility Services Page", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  var facility;
  var currentServices = [];
  it("Renders facility services page", () => {
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
  it("Renders the facility services page", () => {
    var ref = `/facilities/${facility.id}/services`;
    cy.get(`.nav-wrapper ul li a[href='${ref}']`)
      .first()
      .click();
    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/services`
      );
    });
    cy.get(".container.mfl-titles")
      .first()
      .should("contain", facility.code);
  });

  it("Renders facility services", () => {
    cy.fetch_current_services(facility.id).then(services => {
      currentServices = services.sort(
        (a, b) => a.serviceType.id > b.serviceType.id
      );
    });
    cy.fetch_service_types().then(serviceTypes => {
      for (
        let serviceIndex = 0;
        serviceIndex < serviceTypes.length;
        serviceIndex++
      ) {
        cy.get("ul.tabs.mfl-tabs li")
          .eq(serviceIndex)
          .click();

        let servicesForType = currentServices.filter(
          ser => ser.serviceType.id == serviceTypes[serviceIndex].id
        );

        let cardCount = 0;

        for (let currentService of servicesForType) {
          cy.get("div.active")
            .first()
            .find("div.card")
            .eq(cardCount)
            .find("span.card-title")
            .first()
            .contains(currentService.service.service_name);

          if (currentService.children && currentService.children.length > 0) {
            for (
              let slChildCount = 0;
              slChildCount < currentService.children.length;
              slChildCount++
            ) {
              cy.get("div.active")
                .first()
                .find("div.card")
                .eq(cardCount)
                .find("div ul li h6")
                .eq(slChildCount)
                .contains(
                  currentService.children[slChildCount].service.service_name
                );
              if (
                currentService.children[slChildCount].children &&
                currentService.children[slChildCount].children.length > 0
              ) {
                for (
                  let tlChildCount = 0;
                  tlChildCount <
                  currentService.children[slChildCount].children.length;
                  tlChildCount++
                ) {
                  cy.get("div.active")
                    .first()
                    .find("div.card")
                    .eq(cardCount)
                    .find("div ul li ul li")
                    .eq(tlChildCount)
                    .contains(
                      currentService.children[slChildCount].children[
                        tlChildCount
                      ].service.service_name
                    );
                }
              }
            }
          }

          cardCount++;
        }
      }
    });
  });
});
