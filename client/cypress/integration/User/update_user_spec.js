/// <reference types="Cypress" />

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

describe("Updates User", () => {
  const FRONTEND_URL = "http://localhost:3000";
  var userIndex;
  var user = null;
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });
  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  it("Navigates to the users page", () => {
    cy.login(credentials);
    cy.visit(FRONTEND_URL);
    cy.get("[data-test='menuUsers']").click();
    cy.location().should(loc => {
      expect(loc.href).to.equal(`${FRONTEND_URL}/users`);
    });
  });

  it("Shows user update modal", () => {
    cy.fetch_users().then(res => {
      // get random user index
      userIndex =
        res.length >= 10
          ? Math.floor(Math.random() * 9)
          : Math.floor(Math.random() * (res.length - 1));
      user = res[userIndex];

      cy.get("button[data-test='updateUserBtn']")
        .eq(userIndex)
        .click();

      cy.get("[data-test='updateUserModal']");
    });
  });
  it("Failes to Update User", () => {
    cy.server({
      status: 422
    });

    cy.route(
      "PATCH",
      `http://127.0.0.1:4000/api/clients/*/updateUser`,
      "fixture:update_user_error.json"
    ).as("error");

    it("Validates Name", () => {
      type("name", "ku");

      cy.get(`[data-test=fieldErrorname]`)
        .first()
        .should("be.visible")
        .contains(errors.name);
    });

    it("Validates username", () => {
      type("username", "kuuni");

      cy.get(`[data-test=fieldErrorusername]`)
        .first()
        .should("be.visible")
        .contains(errors.username);
    });
    it("Validates email", () => {
      type("email", "kuunika.com");

      cy.get(`[data-test=fieldErroremail]`)
        .first()
        .should("be.visible")
        .contains(errors.email);
    });

    it("Validates password", () => {
      type("password", "1234");

      cy.get(`[data-test=fieldErrorpassword]`)
        .first()
        .should("be.visible")
        .contains(errors.password.length);

      type("password", "12345678");

      cy.get(`[data-test=fieldErrorpassword]`)
        .first()
        .should("be.visible")
        .contains(errors.password.combo);
    });

    it("Validates password confirm", () => {
      type("confirmPassword", "1password#");

      cy.get(`[data-test=fieldErrorconfirmPassword]`)
        .first()
        .should("be.visible")
        .contains(errors.confirmPassword.combo);
    });
    it("Form not submitted", () => {
      cy.get("[data-test='addUserButton1']").click();

      cy.get("[data-test='addUserModal']");
    });

    cy.get("[data-test=saveUserBtn]").click();
    cy.wait("@error");

    cy.get("@error").then(xhr => {
      const { body } = xhr.request;

      cy.get("[data-test='fieldErroremail']")
        .should("be.visible")
        .contains("Email already exists");
    });
  });

  it("Successfully Updates User", () => {
    cy.wait(60 * 30);
    cy.server({
      status: 200
    });
    cy.route(
      "PATCH",
      `http://127.0.0.1:4000/api/clients/*/updateUser`,
      "fixture:add_user_success.json"
    ).as("update");
    type("name", "kuunika malawi");
    selectFirst("role");

    cy.get("[data-test=saveUserBtn]").click();
    cy.wait("@update");

    cy.get("@update").then(xhr => {
      const { body } = xhr.request;
      cy.fetch_user_groups().then(groups => {
        cy.expect(body.data.firstname).to.equal("kuunika");
        cy.expect(body.data.lastname).to.equal("malawi");
        cy.expect(body.data.role).to.equal(groups[0].id);
      });
    });
  });
});
