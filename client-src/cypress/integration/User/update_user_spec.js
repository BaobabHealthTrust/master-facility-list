/// <reference types="Cypress" />
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
    cy.get("#nav-mobile li a[href='/users']").click();
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
      cy.get("table tbody .MuiTableRow-root-32")
        .eq(userIndex)
        .click();

      cy.get("button[test-id='updateUserBtn']").click();

      cy.get("div[class='modal open']");
    });
  });
  it("Failes to Update User", () => {
    cy.server({
      status: 422
    });

    cy.route(
      "PATCH",
      `http://127.0.0.1:4000/api/Clients/${user.id}`,
      "fixture:update_user_error.json"
    ).as("error");

    cy.get("div[class='modal open']")
      .find("input[name='firstname']")
      .clear()
      .type("kuunika");

    cy.get("div[class='modal open']")
      .find("input[name='lastname']")
      .clear()
      .type("malawi");

    cy.get("div[class='modal open']")
      .find("input[name='username']")
      .clear()
      .type("kuunikauser");

    cy.get("div[class='modal open']")
      .find("input[name='email']")
      .clear()
      .type("kuunika@gmail.com");

    cy.get("div[class='modal open']")
      .find("div[class='modal-footer']")
      .find("button")
      .eq(1)
      .click();
    cy.wait("@error");

    cy.get("@error").then(xhr => {
      const { body } = xhr.request;
      cy.expect(body.username).to.equal("kuunikauser");
      cy.get("label[data-error='Email already exists']");
    });
  });

  it("Successfully Updates User", () => {
    cy.wait(60 * 30);
    cy.server({
      status: 200
    });
    cy.route(
      "PATCH",
      `http://127.0.0.1:4000/api/Clients/${user.id}`,
      "fixture:add_user_success.json"
    ).as("update");

    cy.get("div[class='modal open']")
      .find("input[name='firstname']")
      .clear()
      .type("kuunika");

    cy.get("div[class='modal open']")
      .find("input[name='lastname']")
      .clear()
      .type("malawi");

    cy.get("div[class='modal open']")
      .find("input[name='username']")
      .clear()
      .type("kuunikauser");

    cy.get("div[class='modal open']")
      .find("input[name='email']")
      .clear()
      .type("kuunika@gmail.com");

    cy.get("div[class='modal open']")
      .find("div[class='modal-footer']")
      .find("button")
      .eq(1)
      .click();
    cy.wait("@update");

    cy.get("@update").then(xhr => {
      const { body } = xhr.request;
      cy.expect(body.username).to.equal("kuunikauser");
      cy.expect(body.firstname).to.equal("kuunika");
      cy.expect(body.lastname).to.equal("malawi");
      cy.expect(body.email).to.equal("kuunika@gmail.com");
    });
  });
});
