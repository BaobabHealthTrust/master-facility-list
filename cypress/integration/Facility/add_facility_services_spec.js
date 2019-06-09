/// <reference types="Cypress" />

describe("Add Facility Services", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  var selectedTypes = [];
  var selectedFirstLevelServices = [];
  var selectedSecondLevelServices = [];
  var selectedThirdLevelServices = [];
  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
      win.localStorage.setItem("new_facility_active_tab", `Services`);
      win.localStorage.setItem(
        "new_facility",
        `{"details":{"facilityName":"kuunika"}}`
      );
    });
  });
  beforeEach(() => {
    cy.window().then(win => {
      win.localStorage.setItem("new_facility_active_tab", `Services`);
    });
  });

  context("Navigates to the add form", () => {
    it("Navigates to the services page", () => {
      cy.login(credentials);
      cy.visit(FRONTEND_URL);
      cy.get("#nav-mobile li a[href='/facilities']").click();
      cy.get("a[href='/facilities/add']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/add`);
      });
    });

    it("Shows facility services form", () => {
      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();

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
          selectedTypes.push(text);
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
                  selectedFirstLevelServices.push(text);
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
                  selectedSecondLevelServices.push(text);
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
                  selectedThirdLevelServices.push(text);
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

      for (let typeIndex = 0; typeIndex < selectedTypes.length; typeIndex++) {
        cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
          .eq(typeIndex)
          .find("div.flex.justify-between")
          .first()
          .should("contain", selectedTypes[typeIndex]);
      }

      for (
        let firstLevelIndex = 0;
        firstLevelIndex < selectedFirstLevelServices.length;
        firstLevelIndex++
      ) {
        cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
          .eq(firstLevelIndex)
          .find("div.flex.justify-between.mt-4.ml-4")
          .first()
          .should("contain", selectedFirstLevelServices[firstLevelIndex]);
      }

      for (
        let secondLevelIndex = 0;
        secondLevelIndex < selectedSecondLevelServices.length;
        secondLevelIndex++
      ) {
        cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
          .eq(secondLevelIndex)
          .find("div.flex.justify-between.mt-4.ml-8")
          .first()
          .should("contain", selectedSecondLevelServices[secondLevelIndex]);
      }

      for (
        let thirdLevelIndex = 0;
        thirdLevelIndex < selectedThirdLevelServices.length;
        thirdLevelIndex++
      ) {
        cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
          .eq(thirdLevelIndex)
          .find("div.flex.justify-between.mt-4.ml-12")
          .first()
          .should("contain", selectedThirdLevelServices[thirdLevelIndex]);
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
          selectedTypes.push(text);
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
                  selectedFirstLevelServices.push(text);
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
                  selectedSecondLevelServices.push(text);
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
                  selectedThirdLevelServices.push(text);
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

      for (let typeIndex = 0; typeIndex < selectedTypes.length; typeIndex++) {
        cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
          .eq(typeIndex)
          .find("div.flex.justify-between")
          .first()
          .should("contain", selectedTypes[typeIndex]);
      }

      for (
        let firstLevelIndex = 0;
        firstLevelIndex < selectedFirstLevelServices.length;
        firstLevelIndex++
      ) {
        cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
          .eq(firstLevelIndex)
          .find("div.flex.justify-between.mt-4.ml-4")
          .first()
          .should("contain", selectedFirstLevelServices[firstLevelIndex]);
      }

      for (
        let secondLevelIndex = 0;
        secondLevelIndex < selectedSecondLevelServices.length;
        secondLevelIndex++
      ) {
        cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
          .eq(secondLevelIndex)
          .find("div.flex.justify-between.mt-4.ml-8")
          .first()
          .should("contain", selectedSecondLevelServices[secondLevelIndex]);
      }

      for (
        let thirdLevelIndex = 0;
        thirdLevelIndex < selectedThirdLevelServices.length;
        thirdLevelIndex++
      ) {
        cy.get("div div.p-4.mb-2.shadow.w-full.cursor-pointer")
          .eq(thirdLevelIndex)
          .find("div.flex.justify-between.mt-4.ml-12")
          .first()
          .should("contain", selectedThirdLevelServices[thirdLevelIndex]);
      }
    });
  });
});
