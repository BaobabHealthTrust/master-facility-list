/// <reference types="Cypress" />

const type = (fieldName, value) => {
  cy.get(`input[name=${fieldName}]`)
    .first()
    .click()
    .clear()
    .type(value)
    .blur();
};

describe("Adds OIC User", () => {
  const FRONTEND_URL = "http://localhost:3000";

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  context("Navigates to the add form", () => {
    it("Navigates to the users page", () => {
      cy.login(credentials);
      cy.visit(FRONTEND_URL);
      cy.get("[data-test='menuUsers']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/users`);
      });
    });
    it("Shows user add modal", () => {
      cy.get("[data-test='addUserButton']").click();
      cy.get("[data-test='addUserModal']");
    });
  });

  context("Adds OIC User", () => {
    let oicId = null;
    it("Successfully Adds OIC User", () => {
      cy.server({
        status: 200
      });
      cy.route(
        "POST",
        `http://127.0.0.1:4000//api/clients/createUser`,
        "fixture:add_user_success.json"
      ).as("add");
      type("name", "kuunika malawi");

      type("username", "kuunikauser");

      type("email", "kuunika@gmail.com");

      cy.fetch_user_groups().then(res => {
        const oicIndex = res
          ? res.findIndex(r => r.name === "officer_in_charge")
          : -1;

        if (oicIndex > -1) {
          oicId = res[oicIndex].id;
          cy.get(`[data-test='role']`)
            .first()
            .click();
          cy.get(`[id=menu-role] ul li`)
            .eq(oicIndex)
            .click();
        }
      });

      type("password", "1password#");

      type("confirmPassword", "1password#");

      cy.get("[data-test=addUserButton1]").click();

      cy.wait("@add");
      cy.get("@add").then(xhr => {
        const { data } = xhr.request.body;
        cy.expect(data.username).to.equal("kuunikauser");
        cy.expect(data.firstname).to.equal("kuunika");
        cy.expect(data.lastname).to.equal("malawi");
        cy.expect(data.email).to.equal("kuunika@gmail.com");
        cy.expect(data.role).to.equal(oicId);
      });
    });
  });
});
