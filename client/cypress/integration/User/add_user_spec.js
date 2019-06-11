/// <reference types="Cypress" />
describe("Adds User", () => {
  const FRONTEND_URL = "http://localhost:3000";
  const errors = {
    firstname: "firstname must be at least 3 characters",
    lastname: "lastname must be at least 3 characters",
    username: "username must be at least 6 characters",
    backend: {
      username: "User already exists",
      email: "Email already exists"
    },
    email: "enter a valid email address",
    password: {
      length: "atleast 8 characters long",
      combo:
        "Weak password, The password must be a combination of numbers, letters , and special characters"
    },
    confirmPassword: {
      length: "Atleast 8 characters long",
      combo: "Passwords do not match"
    }
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
      cy.get("#nav-mobile li a[href='/users']").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/users`);
      });
    });
    it("Shows user update modal", () => {
      cy.get("button[icon='add']").click();
      cy.get("div[class='modal open']");
    });
  });

  context("Validates input in front-end", () => {
    it("Validates firstname", () => {
      cy.get("div[class='modal open']")
        .find("label")
        .first()
        .click();

      cy.get("div[class='modal open']")
        .find("input[name='firstname']")
        .click()
        .clear()
        .type("ku")
        .blur();

      cy.get(`label[data-error='${errors.firstname}']`)
        .first()
        .should("be.visible");
    });
    it("Validates lastname", () => {
      cy.get("div[class='modal open']")
        .find("label")
        .eq(1)
        .click();

      cy.get("div[class='modal open']")
        .find("input[name='lastname']")
        .click()
        .clear()
        .type("ma")
        .blur();

      cy.get(`label[data-error='${errors.lastname}']`)
        .first()
        .should("be.visible");
    });

    it("Validates username", () => {
      cy.get("div[class='modal open']")
        .find("label")
        .eq(2)
        .click();

      cy.get("div[class='modal open']")
        .find("input[name='username']")
        .click()
        .clear()
        .type("kuuni")
        .blur();

      cy.get(`label[data-error='${errors.username}']`)
        .first()
        .should("be.visible");
    });
    it("Validates email", () => {
      cy.get("div[class='modal open']")
        .find("label")
        .eq(3)
        .click();

      cy.get("div[class='modal open']")
        .find("input[name='email']")
        .click()
        .clear()
        .type("kuunikagmail.com")
        .blur();
      cy.get(`label[data-error='${errors.email}']`)
        .first()
        .should("be.visible");
    });

    it("Validates password", () => {
      cy.get("div[class='modal open']")
        .find("label")
        .eq(4)
        .click();

      cy.get("div[class='modal open']")
        .find("input[name='password']")
        .click()
        .clear()
        .type("1234")
        .blur();

      cy.get(`label[data-error='${errors.password.length}']`)
        .first()
        .should("be.visible");
    });

    it("Validates password confirm", () => {
      cy.get("div[class='modal open']")
        .find("label")
        .eq(5)
        .click();

      cy.get("div[class='modal open']")
        .find("input[name='confirmPassword']")
        .click()
        .clear()
        .type("password8#")
        .blur();

      cy.get(`label[data-error='${errors.confirmPassword.combo}']`)
        .first()
        .should("be.visible");
    });
    it("Form not submitted", () => {
      cy.get("div[class='modal open']")
        .find("div[class='modal-footer']")
        .find("button")
        .eq(1)
        .click();

      cy.get("div[class='modal open']");
    });
  });
  context("Validates input in back-end", () => {
    it("Validate Form", () => {
      cy.server({
        status: 422
      });
      cy.route(
        "POST",
        `http://127.0.0.1:4000//api/Clients/createAdmin`,
        "fixture:add_user_error.json"
      ).as("error");

      cy.get("div[class='modal open']")
        .find("input[name='firstname']")
        .click()
        .clear()
        .type("kuunika");

      cy.get("div[class='modal open']")
        .find("input[name='lastname']")
        .click()
        .clear()
        .type("malawi");

      cy.get("div[class='modal open']")
        .find("input[name='username']")
        .click()
        .clear()
        .type("kuunikauser");

      cy.get("div[class='modal open']")
        .find("input[name='email']")
        .click()
        .clear()
        .type("kuunika@gmail.com");

      cy.get("div[class='modal open']")
        .find("label")
        .eq(4)
        .click();

      cy.get("div[class='modal open']")
        .find("input[name='password']")
        .click()
        .clear()
        .type("password8#");

      cy.get("div[class='modal open']")
        .find("label")
        .eq(5)
        .click();

      cy.get("div[class='modal open']")
        .find("input[name='confirmPassword']")
        .click()
        .clear()
        .type("password8#");

      cy.get("div[class='modal open']")
        .find("div[class='modal-footer']")
        .find("button")
        .eq(1)
        .click();

      cy.wait("@error");
      cy.get("@error").then(() => {
        cy.get(`label[data-error='${errors.backend.username}']`)
          .first()
          .should("be.visible");

        cy.get(`label[data-error='${errors.backend.email}']`)
          .first()
          .should("be.visible");
      });

      cy.get("div[class='modal open']");
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
        `http://127.0.0.1:4000//api/Clients/createAdmin`,
        "fixture:add_user_success.json"
      ).as("add");

      cy.get("div[class='modal open']")
        .find("div[class='modal-footer']")
        .find("button")
        .eq(1)
        .click();

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
