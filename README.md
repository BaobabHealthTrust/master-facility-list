# Master Health Facility Register
At its very core, the MFL is a comprehensive database of all the Health Facilities in the country (Malawi).  From Private Hospitals to Village Clinics, the system keeps track of resources, utilities and services available in each one of these facilities just to mention a few.

This project is the first deliverable under the [Kuunika Data For Action](http://www.kuunika.org/) Initiative and aims at serving the general users, District Health Officers and any other stakeholders in the Malawi Healthcare Sector.  Additionally, the facilities and their information will be available via a REST API for other services and systems to consume, such as [Baoabab Health Trust](http://baobabhealth.org/) Electronic Management Record Systems (EMRs) or the District Health Information System (DHIS).

# Dependancies
- NodeJS > v7.12
- PostgresSQL > v9.4

# Setup
The project is generated by [LoopBack](http://loopback.io), a rapid API development framework.  For more information, see the Loopback documentation.  There is a `client-src` directory that has a [create-react-app](https://github.com/facebookincubator/create-react-app) setup from which the User Interface will be built.  The idea is to build static files from `create-react-app` into the `client` folder so that the API and front-end can run on the same node server.

# Contributing
Once you clone (or eventually pull) the project, run `npm install` to install dependancies.  You should then run `npm test` to ensure that all the tests are passing before making any modification.  When working on the API, you will mostly use the Loopback _Model Generator_, as well as make changes to files in `common/models`.  When working on the Front-end, you will be modifying files in `client-src`.  Make sure to add tests for every generated model, covering the major enpoints and relationships that will be hit via the API.  From the root, running `npm start` will start the API on port 3000.  From client-src, running `npm start` will start the server on port 3001 (after a prompt, since 3000 would have been made busy).  Tests are not mandatory for the React Project, but highly encouraged.

Remember, any changes to the master can only be effected following a successful pull request on a feature branch.

Enjoy, and feel free to contact [jeremiahchienda@baobabhealth.org](mailto://jeremiahchienda@baobabhealth.org)