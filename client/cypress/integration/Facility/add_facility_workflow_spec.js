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

describe("Add Facility Workflow", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  const resourcesFields = [];
  var utilityCount = 0;
  var details = {
    basics: {
      commonName: "kuunika",
      dateOpened: "1975-01-01",
      district: 1,
      facilityName: "kuunika",
      facilityOwner: 1,
      facilityType: 1,
      operationalStatus: 1,
      publishedDate: null,
      registrationNumber: "11111111",
      regulatoryStatus: 1
    },
    contacts: {
      postalAddress: "P.O.Box 1",
      physicalAddress: "Kuunika",
      contactName: "Kuunika",
      contactEmail: "ku@gmail.com",
      contactPhoneNumber: "0888888888",
      catchmentArea: "Zero",
      catchmentPopulation: "100",
      longitude: "100",
      latitude: "-100"
    },
    resources: {},
    services: {
      selectedTypes: [],
      selectedFirstLevelServices: [],
      selectedSecondLevelServices: [],
      selectedThirdLevelServices: []
    }
  };

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const errors = {
    basics: {
      facilityName: "Facility name must have atleast 3 characters",
      facilityCommon: "Common name must have atleast 3 characters",
      registrationNumber: "Invalid Registration Number"
    },
    contacts: {
      postalAddress: "Postal Address is too short",
      physicalAddress: "Physical Address is too short",
      contactName: "Contact Name is too short",
      contactEmail: "Invalid Email format",
      contactPhoneNumber: "Invalid phone number",
      catchmentArea: "Catchment Area is too short",
      catchmentPopulation: `Invalid number`,
      longitude: `Invalid number`,
      latitude: `Invalid number`
    },
    resources: {
      empty: `Invalid number`
    }
  };

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  context("Adds Basics", () => {
    context("Navigates to the add form", () => {
      it("Navigates to the facilities page", () => {
        cy.login(credentials);
        cy.visit(FRONTEND_URL);
        cy.get("#nav-mobile li a[href='/facilities']").click();
        cy.get("a[href='/facilities/add']").click();
        cy.location().should(loc => {
          expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/add`);
        });
      });
      it("Shows user basics form", () => {
        cy.get("div .mfl-active-form-wizard").contains("Basic Details");
      });
    });

    context("Validates input in front-end", () => {
      it("Validates facility name", () => {
        cy.get("div[test-id='basicDetailsForm'] div.input-field")
          .first()
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='facilityName']")
          .first()
          .click()
          .clear()
          .type("ku")
          .blur();

        cy.get(`label[data-error='${errors.basics.facilityName}']`)
          .first()
          .should("be.visible");
      });
      it("Validates facility common name", () => {
        cy.get("div[test-id='basicDetailsForm'] div.input-field")
          .eq(1)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='commonName']")
          .first()
          .click()
          .clear()
          .type("ku")
          .blur();

        cy.get(`label[data-error='${errors.basics.facilityCommon}']`)
          .first()
          .should("be.visible");
      });

      it("Validates Registration", () => {
        cy.get("div[test-id='basicDetailsForm'] div.input-field")
          .eq(10)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='registrationNumber']")
          .first()
          .click()
          .clear()
          .type("1")
          .blur();

        cy.get(`label[data-error='${errors.basics.registrationNumber}']`)
          .first()
          .should("be.visible");
      });
    });

    context("Adds Facility Basics", () => {
      it("Successfully Adds Facility Basics", () => {
        cy.get("div.input-field input[name='facilityName']")
          .first()
          .click()
          .clear()
          .type("kuunika");

        cy.get("div.input-field input[name='commonName']")
          .first()
          .click()
          .clear()
          .type("kuunika");

        cy.get("div.input-field input[name='registrationNumber']")
          .first()
          .click()
          .clear()
          .type("11111111");

        cy.get("div[test-id='basicDetailsForm']")
          .find("button")
          .first()
          .click();
        cy.window().then(win => {
          let facility = JSON.parse(win.localStorage.new_facility);
          let facilityDetails = facility.details;
          cy.expect(facilityDetails).to.deep.equal({
            ...details.basics
          });
        });
      });
    });
  });

  context("Adds Contacts and locations", () => {
    context("Navigates to the contacts form", () => {
      it("Shows facility contacts form", () => {
        cy.get("div .mfl-active-form-wizard").contains("Contacts & Location");
      });
    });

    context("Validates input in front-end", () => {
      it("Validates address", () => {
        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .first()
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='postalAddress']")
          .first()
          .click()
          .clear()
          .type("ku")
          .blur();

        cy.get(`label[data-error='${errors.contacts.postalAddress}']`)
          .first()
          .should("be.visible");
      });
      it("Validates facility physical address", () => {
        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(1)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='physicalAddress']")
          .first()
          .click()
          .clear()
          .type("ku")
          .blur();

        cy.get(`label[data-error='${errors.contacts.physicalAddress}']`)
          .first()
          .should("be.visible");
      });
      it("Validates facility contact name", () => {
        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(2)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='contactName']")
          .first()
          .click()
          .clear()
          .type("ku")
          .blur();

        cy.get(`label[data-error='${errors.contacts.contactName}']`)
          .first()
          .should("be.visible");
      });
      it("Validates phone number", () => {
        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(3)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='contactPhoneNumber']")
          .first()
          .click()
          .clear()
          .type("ku")
          .blur();

        cy.get(`label[data-error='${errors.contacts.contactPhoneNumber}']`)
          .first()
          .should("be.visible");
      });
      it("Validates email", () => {
        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(4)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='contactEmail']")
          .first()
          .click()
          .clear()
          .type("ku")
          .blur();

        cy.get(`label[data-error='${errors.contacts.contactEmail}']`)
          .first()
          .should("be.visible");
      });
      it("Validates catchment area", () => {
        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(5)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='catchmentArea']")
          .first()
          .click()
          .clear()
          .type("1")
          .blur();

        cy.get(`label[data-error="${errors.contacts.catchmentArea}"]`)
          .first()
          .should("be.visible");
      });
      it("Validates catchment area pupulation", () => {
        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(6)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='catchmentPopulation']")
          .first()
          .click()
          .clear()
          .blur();

        cy.get(`label[data-error="${errors.contacts.catchmentPopulation}"]`)
          .first()
          .should("be.visible");
      });
      it("Validates longitude", () => {
        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(7)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='longitude']")
          .first()
          .click()
          .clear()
          .blur();

        cy.get(`label[data-error="${errors.contacts.longitude}"]`)
          .first()
          .should("be.visible");
      });
      it("Validates latitude", () => {
        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(8)
          .find("label")
          .first()
          .click();

        cy.get("div.input-field input[name='latitude']")
          .first()
          .click()
          .clear()
          .blur();

        cy.get(`label[data-error="${errors.contacts.latitude}"]`)
          .first()
          .should("be.visible");
      });
    });
    context("Adds Facility Contacts And Locations", () => {
      it("Successfully Adds Contacts And Locations", () => {
        type(cy, "postalAddress", details.contacts.postalAddress);
        type(cy, "physicalAddress", details.contacts.physicalAddress);
        type(cy, "contactName", details.contacts.contactName);
        type(cy, "contactPhoneNumber", details.contacts.contactPhoneNumber);
        type(cy, "contactEmail", details.contacts.contactEmail);
        type(cy, "catchmentArea", details.contacts.catchmentArea);

        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(6)
          .find("label")
          .first()
          .click();
        type(cy, "catchmentPopulation", details.contacts.catchmentPopulation);

        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(7)
          .find("label")
          .first()
          .click();
        type(cy, "longitude", details.contacts.longitude);

        cy.get("div[test-id='contactDetailsForm'] div.input-field")
          .eq(8)
          .find("label")
          .first()
          .click();
        type(cy, "latitude", details.contacts.latitude);

        cy.get("div[test-id='contactDetailsForm']")
          .find("button")
          .first()
          .click();

        cy.fetch_add_facility().then(facility => {
          let facilityContacts = facility.contact;
          cy.expect(facilityContacts).to.deep.equal({
            ...details.contacts
          });
        });
      });
    });
  });

  context("Adds Facility Resources", () => {
    context("Navigates to the add form", () => {
      it("Shows facility resources form", () => {
        cy.get("div .mfl-active-form-wizard").contains("Resources");
        cy.get("div[test-id='resourcesForm'] div.input-field").each(
          (el, index) => {
            cy.wrap(el)
              .find("input")
              .first()
              .invoke("attr", "name")
              .then(val => {
                resourcesFields.push(val);
                details.resources[val] = "10";
                clear(cy, val);
              });
          }
        );
      });
    });
    context("Validates input in front-end", () => {
      it("Validates resources values", () => {
        cy.get("div[test-id='resourcesForm']")
          .find("button")
          .first()
          .click();
        for (
          let fieldIndex = 0;
          fieldIndex < resourcesFields.length;
          fieldIndex++
        ) {
          cy.get(`label[data-error="${errors.resources.empty}"]`)
            .first(fieldIndex)
            .should("be.visible");
        }
      });
    });

    context("Adds Facility Resources", () => {
      it("Successfully Adds Facility Resources", () => {
        for (let field of resourcesFields) {
          type(cy, field, details.resources[field]);
        }
      });

      it("Successfully Adds Facility Resources", () => {
        cy.get("div[test-id='resourcesForm']")
          .find("button")
          .first()
          .click();

        cy.fetch_add_facility().then(facility => {
          let facilityResources = facility.resources;
          cy.expect(facilityResources).to.deep.equal({
            ...details.resources
          });
        });
      });
    });
  });

  context("Adds Facility Utilities", () => {
    context("Navigates to the add form", () => {
      it("Shows facility utilities form", () => {
        cy.get("div .mfl-active-form-wizard").contains("Utilities");
      });
    });

    context("Validates input in front-end", () => {
      it("Validates utilities values", () => {
        cy.get("div[test-id='utilitiesForm']")
          .find("button")
          .first()
          .click();

        cy.get("div[test-id='utilitiesForm']").contains(
          "Energy Proovider,Water Provider,Waste Disposal,Network Provider"
        );
      });
    });
    context("Adds Facility Utilities", () => {
      it("Successfully Adds Facility Utilities", () => {
        cy.get("div[test-id='utilitiesForm'] div label").each(el => {
          cy.wrap(el).click();
          utilityCount++;
        });

        cy.get("div[test-id='utilitiesForm']")
          .find("button")
          .first()
          .click();

        cy.fetch_add_facility().then(facility => {
          let facilityUtilities = facility.utilities;
          cy.expect(utilityCount).to.equal(facilityUtilities.length);
        });
      });
    });
  });

  context("Adds Services", () => {
    context("Navigates to the add form", () => {
      it("Shows facility services form", () => {
        cy.get("div .mfl-active-form-wizard").contains("Services");
      });
    });

    context("Validates input in front-end", () => {
      it("Validates services type", () => {
        cy.get("div[test-id='servicesForm']")
          .find("button")
          .first()
          .click();

        cy.get("div[test-id='servicesForm']").contains(
          "Please select a Service Type"
        );

        cy.get("div[test-id='servicesForm'] input")
          .first()
          .click();

        cy.get("ul.dropdown-content.select-dropdown.active li")
          .eq(1)
          .invoke("text")
          .then(text => {
            details.services.selectedTypes.push(text);
          });

        cy.get("ul.dropdown-content.select-dropdown.active li")
          .eq(1)
          .click();
      });
      it("Validates First Level Service", () => {
        if (Cypress.$("div[test-id='servicesForm'] input").length >= 2) {
          cy.get("div[test-id='servicesForm'] input")
            .eq(1)
            .then(input => {
              if (input) {
                cy.get("div[test-id='servicesForm']")
                  .find("button")
                  .first()
                  .click();

                cy.get("div[test-id='servicesForm']").contains(
                  "Please select a Service"
                );

                cy.get("div[test-id='servicesForm'] input")
                  .eq(1)
                  .click();

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .invoke("text")
                  .then(text => {
                    details.services.selectedFirstLevelServices.push(text);
                  });

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .click();
              }
            });
        }
      });
      it("Validates Second level service", () => {
        if (Cypress.$("div[test-id='servicesForm'] input").length >= 3) {
          cy.get("div[test-id='servicesForm'] input")
            .eq(2)
            .then(input => {
              if (input) {
                cy.get("div[test-id='servicesForm']")
                  .find("button")
                  .first()
                  .click();

                cy.get("div[test-id='servicesForm']").contains(
                  "Please select a Subservice"
                );
                cy.get("div[test-id='servicesForm'] input")
                  .eq(2)
                  .click();

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .invoke("text")
                  .then(text => {
                    details.services.selectedSecondLevelServices.push(text);
                  });

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .click();
              }
            });
        }
      });
      it("Validates Third level service", () => {
        if (Cypress.$("div[test-id='servicesForm'] input").length >= 3) {
          cy.get("div[test-id='servicesForm'] input")
            .eq(3)
            .then(input => {
              if (input) {
                cy.get("div[test-id='servicesForm']")
                  .find("button")
                  .first()
                  .click();

                cy.get("div[test-id='servicesForm']").contains(
                  "Please select a Sub Sub Service"
                );
                cy.get("div[test-id='servicesForm'] input")
                  .eq(3)
                  .click();

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .invoke("text")
                  .then(text => {
                    details.services.selectedThirdLevelServices.push(text);
                  });

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .click();
              }
            });
        }
      });
    });
    context("Adds Facility Services", () => {
      it(`Successfully Adds Facility Services (first services set)`, () => {
        cy.get("div[test-id='servicesForm']")
          .find("button")
          .first()
          .click();

        for (
          let typeIndex = 0;
          typeIndex < details.services.selectedTypes.length;
          typeIndex++
        ) {
          cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
            .eq(typeIndex)
            .find("div.flex.justify-between")
            .first()
            .should("contain", details.services.selectedTypes[typeIndex]);
        }

        for (
          let firstLevelIndex = 0;
          firstLevelIndex < details.services.selectedFirstLevelServices.length;
          firstLevelIndex++
        ) {
          cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
            .eq(firstLevelIndex)
            .find("div.flex.justify-between.mt-4.ml-4")
            .first()
            .should(
              "contain",
              details.services.selectedFirstLevelServices[firstLevelIndex]
            );
        }

        for (
          let secondLevelIndex = 0;
          secondLevelIndex <
          details.services.selectedSecondLevelServices.length;
          secondLevelIndex++
        ) {
          cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
            .eq(secondLevelIndex)
            .find("div.flex.justify-between.mt-4.ml-8")
            .first()
            .should(
              "contain",
              details.services.selectedSecondLevelServices[secondLevelIndex]
            );
        }

        for (
          let thirdLevelIndex = 0;
          thirdLevelIndex < details.services.selectedThirdLevelServices.length;
          thirdLevelIndex++
        ) {
          cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
            .eq(thirdLevelIndex)
            .find("div.flex.justify-between.mt-4.ml-12")
            .first()
            .should(
              "contain",
              details.services.selectedThirdLevelServices[thirdLevelIndex]
            );
        }
      });
      it("Successfully selects Services (category)", () => {
        cy.get("div[test-id='servicesForm'] input")
          .first()
          .click();

        cy.get("ul.dropdown-content.select-dropdown.active li")
          .eq(2)
          .invoke("text")
          .then(text => {
            details.services.selectedTypes.push(text);
          });

        cy.get("ul.dropdown-content.select-dropdown.active li")
          .eq(2)
          .click();
      });
      it("Successfully selects Services (first level)", () => {
        if (Cypress.$("div[test-id='servicesForm'] input").length >= 2) {
          cy.get("div[test-id='servicesForm'] input")
            .eq(1)
            .then(input => {
              if (input) {
                cy.get("div[test-id='servicesForm'] input")
                  .eq(1)
                  .click();

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .invoke("text")
                  .then(text => {
                    details.services.selectedFirstLevelServices.push(text);
                  });

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .click();
              }
            });
        }
      });
      it("Successfully selects Services (second level)", () => {
        if (Cypress.$("div[test-id='servicesForm'] input").length >= 3) {
          cy.get("div[test-id='servicesForm'] input")
            .eq(2)
            .then(input => {
              if (input) {
                cy.get("div[test-id='servicesForm'] input")
                  .eq(2)
                  .click();

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .invoke("text")
                  .then(text => {
                    details.services.selectedSecondLevelServices.push(text);
                  });

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .click();
              }
            });
        }
      });
      it("Successfully selects Services (third level)", () => {
        if (Cypress.$("div[test-id='servicesForm'] input").length >= 3) {
          cy.get("div[test-id='servicesForm'] input")
            .eq(3)
            .then(input => {
              if (input) {
                cy.get("div[test-id='servicesForm'] input")
                  .eq(3)
                  .click();

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .invoke("text")
                  .then(text => {
                    details.services.selectedThirdLevelServices.push(text);
                  });

                cy.get("ul.dropdown-content.select-dropdown.active li")
                  .eq(1)
                  .click();
              }
            });
        }
      });
      it("Successfully Adds second service", () => {
        cy.get("div[test-id='servicesForm']")
          .find("button")
          .first()
          .click();

        for (
          let typeIndex = 0;
          typeIndex < details.services.selectedTypes.length;
          typeIndex++
        ) {
          cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
            .eq(typeIndex)
            .find("div.flex.justify-between")
            .first()
            .should("contain", details.services.selectedTypes[typeIndex]);
        }

        for (
          let firstLevelIndex = 0;
          firstLevelIndex < details.services.selectedFirstLevelServices.length;
          firstLevelIndex++
        ) {
          cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
            .eq(firstLevelIndex)
            .find("div.flex.justify-between.mt-4.ml-4")
            .first()
            .should(
              "contain",
              details.services.selectedFirstLevelServices[firstLevelIndex]
            );
        }

        for (
          let secondLevelIndex = 0;
          secondLevelIndex <
          details.services.selectedSecondLevelServices.length;
          secondLevelIndex++
        ) {
          cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
            .eq(secondLevelIndex)
            .find("div.flex.justify-between.mt-4.ml-8")
            .first()
            .should(
              "contain",
              details.services.selectedSecondLevelServices[secondLevelIndex]
            );
        }

        for (
          let thirdLevelIndex = 0;
          thirdLevelIndex < details.services.selectedThirdLevelServices.length;
          thirdLevelIndex++
        ) {
          cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
            .eq(thirdLevelIndex)
            .find("div.flex.justify-between.mt-4.ml-12")
            .first()
            .should(
              "contain",
              details.services.selectedThirdLevelServices[thirdLevelIndex]
            );
        }
      });
    });
  });

  context("Post Facility Details", () => {
    it("Posts facility details", () => {
      cy.server({
        status: 200
      });
      cy.route(
        "POST",
        `http://127.0.0.1:4000/api/Facilities/`,
        "fixture:add_facility_basics_success.json"
      ).as("basics");

      cy.route(
        "POST",
        `http://127.0.0.1:4000/api/Facilities/contactDetails`,
        "fixture:add_facility_basics_success.json"
      ).as("contacts");

      cy.route("POST", `http://127.0.0.1:4000/api/FacilityResources/`, {
        success: "done"
      }).as("resources");

      cy.route("POST", `http://127.0.0.1:4000/api/FacilityUtilities/`, {
        success: "done"
      }).as("utilities");

      cy.route("POST", `http://127.0.0.1:4000/api/FacilityServices/`, {
        success: "done"
      }).as("services");

      cy.route("POST", `http://127.0.0.1:4000/api/Facilities/publish`, {
        success: "done"
      }).as("publish");

      cy.get("div[test-id='servicesForm']")
        .find("button")
        .eq(1)
        .click();

      cy.wait("@basics");
      cy.wait("@contacts");
      cy.wait("@resources");
      cy.wait("@utilities");
      cy.wait("@services");
      cy.wait("@publish");

      cy.get("@basics").then(xhr => {
        const { body } = xhr.request;

        cy.expect(body.facility_name).to.equal(details.basics.facilityName);
        cy.expect(body.common_name).to.equal(details.basics.commonName);
        cy.expect(body.registration_number).to.equal(
          details.basics.registrationNumber
        );
      });

      cy.get("@contacts").then(xhr => {
        const { body } = xhr.request;
        delete body.data.updated_at;
        delete body.data.client;
        cy.expect(body.data).to.deep.equal(details.contacts);
      });

      cy.get("@resources").then(xhr => {
        const { body } = xhr.request;
        cy.expect(Number(body[0].quantity)).to.equal(
          Number(details.resources[resourcesFields[0]])
        );
      });

      cy.get("@utilities").then(xhr => {
        const { body } = xhr.request;
        for (let utility of body) {
          cy.expect(utility).to.have.deep.keys({
            client_id: 1,
            created_date: "2019-04-02T12:16:28.577Z",
            facility_id: 1035,
            utility_id: 4
          });
        }
      });

      cy.get("@services").then(xhr => {
        const { body } = xhr.request;
        delete body[0].updated_at;
        delete body[0].client;
        cy.expect(body[0]).to.have.deep.keys({
          client_id: 1,
          facility_id: 0,
          service_id: 1
        });
      });
    });
  });
});
