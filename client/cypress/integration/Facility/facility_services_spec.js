/// <reference types="Cypress" />

const servicesSpec = (type, services, cy) => {
  let servicesForType = services.filter(ser => ser.serviceType.id == type.id);
  for (let ser of servicesForType) {
    serviceSpec(ser, 0, cy);
  }
};

const serviceSpec = (service, level = 0, cy) => {
  if (
    typeof service.children === "undefined" ||
    service.children.length === 0
  ) {
    let services = [];
    cy.get(`[data-test=serviceDetail${level}]`)
      .each(el => {
        let name =
          el.context.innerHTML.indexOf("<") > -1
            ? el.context.innerHTML.substring(
                0,
                el.context.innerHTML.indexOf("<")
              )
            : el.context.innerText;
        services.push(name);
      })
      .then(() => {
        expect(services).to.include.members([service.service.service_name]);
      });
    return;
  }
  let services = [];
  cy.get(`[data-test=serviceDetail${level}]`)
    .each(el => {
      let name =
        el.context.innerHTML.indexOf("<") > -1
          ? el.context.innerHTML.substring(0, el.context.innerHTML.indexOf("<"))
          : el.context.innerText;
      services.push(name);
    })
    .then(() => {
      expect(services).to.include.members([service.service.service_name]);
    });
  return service.children.map(ser => serviceSpec(ser, level + 1, cy));
};

describe("Tests Facility Services Page", () => {
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
    cy.get(`[data-test=FacilityServices]`).click();

    cy.location().should(loc => {
      expect(loc.href).to.equal(
        `${FRONTEND_URL}/facilities/${facility.id}/services`
      );
    });
  });

  it("Shows Valid Facility Code", () => {
    cy.get("[data-test=facilityHeader]")
      .first()
      .should("contain", facility.code);
  });

  it("Renders facility services", () => {
    cy.fetch_current_services(facility.id).then(services => {
      let currentServices = services.sort(
        (a, b) => a.serviceType.id > b.serviceType.id
      );
      cy.fetch_service_types().then(serviceTypes => {
        for (let serviceType of serviceTypes) {
          servicesSpec(serviceType, currentServices, cy);
        }
      });
    });
  });
});
