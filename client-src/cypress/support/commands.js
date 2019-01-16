// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import settings from "../../src/settings";

Cypress.Commands.add("login", credentials => {
  const END_POINT = `${settings.hostname}/api/`;
  const RESOURCE = `Clients/login/`;
  const URL = `${END_POINT}${RESOURCE}`;
  cy.request("POST", URL, credentials).then(resp => {
    const token = resp.body.id;
    const userId = resp.body.userId;

    const USER_RESOURCE = `Clients/${userId}`;

    const header = {
      Authorization: `${token}`
    };

    const USER_URL = `${END_POINT}${USER_RESOURCE}`;
    cy.request({url: USER_URL, headers: header}).then(resp => {
      const firstName = resp.body.firstname;
      cy.window().then(win => {
        win.sessionStorage.setItem("token", token);
        win.sessionStorage.setItem("firstname", firstName);
      });
    });
  });
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
