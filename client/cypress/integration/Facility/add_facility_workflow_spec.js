/// <reference types="Cypress" />

const validateSelect = (name, error) => {
  cy.get(`[data-test=${name}]`)
    .first()
    .click();

  cy.get(`[id=menu-${name}]`)
    .first()
    .click();
  cy.get("[data-test=formFooter]")
    .first()
    .click();

  cy.get(`[data-test=fieldError${name}]`)
    .first()
    .should("be.visible")
    .contains(error);
};

const type = (fieldName, value) => {
  cy.get(`input[name=${fieldName}]`)
    .first()
    .click()
    .clear()
    .type(value)
    .blur();
};

const selectFirst = fieldName => {
  cy.get(`[data-test=${fieldName}]`)
    .first()
    .click();

  cy.get(`[id=menu-${fieldName}] ul li`)
    .first()
    .click();
};

const hasError = (fieldName, error) => {
  cy.get(`[data-test=fieldError${fieldName}`)
    .first()
    .should("be.visible")
    .contains(error);
};

const clear = fieldName => {
  cy.get(`input[name='${fieldName}']`)
    .first()
    .click()
    .clear();
};

describe("Add Facility Workflow", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  const BACKEND_URL = Cypress.env("API_URL");

  const resourcesFields = [];
  let serviceTypes = [];
  var utilityCount = 0;
  var details = {
    basics: {
      commonName: "kuunika",
      dateOpened: "1975-01-01",
      district: 1,
      facilityName: "kuunika",
      facilityOwner: 1,
      facilityType: 1,
      facility_code_mapping: null,
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
    resources: [],
    services: []
  };

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const errors = {
    basics: {
      facilityName: "Facility name must have atleast 3 characters",
      facilityCommon: "Common name must have atleast 3 characters",
      registrationNumber: "Invalid Registration Number",
      registrationNumber: "Invalid Registration Number",
      empty: "You can't leave this field blank"
    },
    contacts: {
      postalAddress: "Postal Address is too short",
      physicalAddress: "Physical Address is too short",
      contactName: "Contact Name is too short",
      contactEmail: "Invalid Email format",
      contactPhoneNumber: "Invalid phone number",
      catchmentArea: "Catchment Area is too short",
      catchmentPopulation: `Invalid number`,
      longitude: `longitude must be a positive number`,
      latitude: `latitude must be a negative number`
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
        cy.get(`[data-test=menuFacilities]`).click();
        cy.get("[data-test=addFacilityBtn]").click();
        cy.location().should(loc => {
          expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/add`);
        });
      });
    });

    context("Validates basic input in front-end", () => {
      it("Validates facility name", () => {
        type("facilityName", "ku");

        cy.get(`[data-test=fieldErrorfacilityName`)
          .first()
          .should("be.visible")
          .contains(errors.basics.facilityName);
      });
      it("Validates facility common name", () => {
        type("commonName", "ku");

        cy.get(`[data-test=fieldErrorcommonName]`)
          .first()
          .should("be.visible")
          .contains(errors.basics.facilityCommon);
      });

      it("Validates Operational Status", () => {
        validateSelect("operationalStatus", errors.basics.empty);
      });

      it("Validates facility owner", () => {
        validateSelect("facilityOwner", errors.basics.empty);
      });

      it("Validates district", () => {
        validateSelect("district", errors.basics.empty);
      });

      it("Validates Registration", () => {
        type("registrationNumber", "1");
      });
    });

    context("Adds Facility Basics", () => {
      it("Successfully Adds Facility Basics", () => {
        cy.get("input[name='facilityName']")
          .first()
          .click()
          .clear()
          .type("kuunika");

        cy.get("input[name='commonName']")
          .first()
          .click()
          .clear()
          .type("kuunika");

        selectFirst("facilityType");

        selectFirst("operationalStatus");

        selectFirst("regulatoryStatus");

        selectFirst("facilityOwner");

        selectFirst("district");

        cy.get("input[name='registrationNumber']")
          .first()
          .click()
          .clear()
          .type("11111111");

        cy.get("[data-test='saveBtn']")
          .first()
          .click();
        cy.window().then(win => {
          let facility = JSON.parse(win.localStorage.new_facility);
          let facilityDetails = facility.details;
          cy.expect(facilityDetails).to.deep.keys({
            ...details.basics
          });
        });
      });
    });
  });

  context("Adds Contacts and locations", () => {
    context("Validates contacts input in front-end", () => {
      it("Validates postal address", () => {
        type("postalAddress", "ku");

        hasError("postalAddress", errors.contacts.postalAddress);
      });

      it("Validates physical address", () => {
        type("physicalAddress", "ku");

        hasError("physicalAddress", errors.contacts.physicalAddress);
      });

      it("Validates contact name", () => {
        type("contactName", "ku");

        hasError("contactName", errors.contacts.contactName);
      });

      it("Validates phone", () => {
        type("contactPhoneNumber", "ku");

        hasError("contactPhoneNumber", errors.contacts.contactPhoneNumber);
      });

      it("Validates email", () => {
        type("contactEmail", "ku");

        hasError("contactEmail", errors.contacts.contactEmail);
      });

      it("Validates catchment area", () => {
        type("catchmentArea", "ku");

        hasError("catchmentArea", errors.contacts.catchmentArea);
      });
      it("Validates catchment area population", () => {
        type("catchmentPopulation", "ty");

        hasError("catchmentPopulation", errors.contacts.catchmentPopulation);
      });
      it("Validates latitude", () => {
        type("latitude", "1");

        hasError("latitude", errors.contacts.latitude);
      });

      it("Validates longitude", () => {
        type("longitude", "-1");

        hasError("longitude", errors.contacts.longitude);
      });
    });
    context("Adds Facility Contacts And Locations", () => {
      it("Successfully Adds Contacts And Locations", () => {
        type("postalAddress", details.contacts.postalAddress);
        type("physicalAddress", details.contacts.physicalAddress);
        type("contactName", details.contacts.contactName);
        type("contactPhoneNumber", details.contacts.contactPhoneNumber);
        type("contactEmail", details.contacts.contactEmail);
        type("catchmentArea", details.contacts.catchmentArea);
        type("catchmentPopulation", details.contacts.catchmentPopulation);

        type("longitude", details.contacts.longitude);

        type("latitude", details.contacts.latitude);

        cy.get("[data-test='saveBtn']")
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
        cy.get("[data-test='resourcesForm'] input").each((el, index) => {
          cy.wrap(el)
            .invoke("attr", "name")
            .then(val => {
              resourcesFields.push(val);
              details.resources[val] = "10";
              clear(val);
            });
        });
      });
    });
    context("Validates resources input in front-end", () => {
      it("Validates resources values", () => {
        cy.get("[data-test='saveBtn']")
          .first()
          .click();

        for (let field of resourcesFields) {
          cy.get(`[data-test="fieldError${field}"]`)
            .first()
            .should("be.visible")
            .contains(errors.resources.empty);
        }
      });
    });

    context("Adds Facility Resources", () => {
      it("Successfully Adds Facility Resources", () => {
        for (let field of resourcesFields) {
          type(field, details.resources[field]);
        }
      });

      it("Successfully Adds Facility Resources", () => {
        cy.get("[data-test='saveBtn']")
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
    context("Validates utilities input in front-end", () => {
      it("Validates utilities values", () => {
        cy.get("[data-test='saveBtn']")
          .first()
          .click();

        cy.get("[data-test='fieldErrorutilities'] p")
          .first()
          .contains(/Energy Proovider/)
          .contains(/Water Provider/)
          .contains(/Waste Disposal/)
          .contains(/Network Provider/);
      });
    });

    context("Adds Facility Utilities", () => {
      it("Successfully Adds Facility Utilities", () => {
        cy.get("[data-test='utilitiesForm'] input").each(el => {
          cy.wrap(el).click();
          utilityCount++;
        });

        cy.get("[data-test='saveBtn']")
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
    context("Validates services input in front-end", () => {
      it("Validates services values", () => {
        cy.fetch_service_types().then(serviceTypesData => {
          serviceTypes = serviceTypesData;
        });
        cy.get("[data-test='saveBtn']")
          .first()
          .click();

        cy.get(`[data-test="fieldErrorservices"]`)
          .first()
          .should("be.visible")
          .contains("Please Select Atleast One Service");
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
        `${BACKEND_URL}/Facilities`,
        "fixture:add_facility_basics_success.json"
      ).as("basics");

      cy.route(
        "POST",
        `${BACKEND_URL}/Facilities/contactDetails`,
        "fixture:add_facility_basics_success.json"
      ).as("contacts");

      cy.route("POST", `${BACKEND_URL}/FacilityResources`, {
        success: "done"
      }).as("resources");

      cy.route("POST", `${BACKEND_URL}/FacilityUtilities`, {
        success: "done"
      }).as("utilities");

      cy.route("POST", `${BACKEND_URL}/FacilityServices`, {
        success: "done"
      }).as("services");

      cy.route("POST", `${BACKEND_URL}/Facilities/publish`, {
        success: "done"
      }).as("publish");

      for (let serviceType of serviceTypes) {
        selectFirst(serviceType.service_type.replace(/ /g, ""));

        cy.get(`[id=menu-${serviceType.service_type.replace(/ /g, "")}]`)
          .first()
          .click();
        cy.get("[data-test=formFooter]")
          .first()
          .click();
      }

      cy.get("[data-test='saveBtn']")
        .first()
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
            facility_id: 1,
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
          facility_id: 1,
          service_id: 1
        });
      });
    });
  });
});
