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

describe("Adds User", () => {
  const FRONTEND_URL = "http://localhost:3000";
  const errors = {
    name: "Name must be at least 7 characters",
    username: "Username must be at least 6 characters",
    backend: {
      username: "User already exists",
      email: "Email already exists"
    },
    email: "Enter a valid email address",
    password: {
      length: "Atleast 8 characters long",
      combo:
        "Weak password, The password must be a combination of numbers, letters , and special characters"
    },
    confirmPassword: {
      length: "Atleast 8 characters long",
      combo: "Passwords do not match"
    },
    empty: "You can't leave this field blank"
  };

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

  context("Validates input in front-end", () => {
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
  });
  context("Validates input in back-end", () => {
    it("Validate Form", () => {
      cy.server({
        status: 422
      });
      cy.route(
        "POST",
        `http://127.0.0.1:4000//api/clients/createUser`,
        "fixture:add_user_error.json"
      ).as("error");

      type("name", "kuunika malawi");

      type("username", "kuunikauser");

      type("email", "kuunika@gmail.com");

      selectFirst("role");

      type("password", "1password#");

      type("confirmPassword", "1password#");

      cy.get("[data-test=addUserButton1]").click();

      cy.wait("@error");
      cy.get("@error").then(() => {
        cy.get(`[data-test=fieldErrorusername]`)
          .first()
          .should("be.visible")
          .contains(errors.backend.username);

        cy.get(`[data-test=fieldErroremail]`)
          .first()
          .should("be.visible")
          .contains(errors.backend.email);
      });

      cy.get("[data-test='addUserModal']");
    });
  });
  context("Adds User", () => {
    it("Successfully Adds User", () => {
      cy.wait(60 * 30);
      cy.server({
        status: 200
      });
      cy.route(
        "POST",
        `http://127.0.0.1:4000//api/clients/createUser`,
        "fixture:add_user_success.json"
      ).as("add");

      cy.get("[data-test=addUserButton1]").click();

      cy.wait("@add");
      cy.get("@add").then(xhr => {
        const { data } = xhr.request.body;
        cy.expect(data.username).to.equal("kuunikauser");
        cy.expect(data.firstname).to.equal("kuunika");
        cy.expect(data.lastname).to.equal("malawi");
        cy.expect(data.email).to.equal("kuunika@gmail.com");
      });
    });
  });
});
