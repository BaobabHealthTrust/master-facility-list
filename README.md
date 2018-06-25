# Master Health Facility Register

At its very core, the MFL is a comprehensive database of all the Health Facilities in the country (Malawi). From Private Hospitals to Village Clinics, the system keeps track of resources, utilities and services available in each one of these facilities just to mention a few.

This project is the first deliverable under the [Kuunika Data For Action](http://www.kuunika.org/) Initiative and aims at serving the general users, District Health Officers and any other stakeholders in the Malawi Healthcare Sector. Additionally, the facilities and their information will be available via a REST API for other services and systems to consume, such as [Baoabab Health Trust](http://baobabhealth.org/) Electronic Management Record Systems (EMRs) or the District Health Information System (DHIS).

# Dependancies

* NodeJS > v7.12
* MySQL v5.5

# Setup

The project is generated by [LoopBack](http://loopback.io), a rapid API development framework. For more information, see the Loopback documentation. There is a `client-src` directory that has a [create-react-app](https://github.com/facebookincubator/create-react-app) setup from which the User Interface will be built. The idea is to build static files from `create-react-app` into the `client` folder so that the API and front-end can run on the same node server.

# Installation

## Step 1

Clone this repository into your local directory, i.e. `git clone https://github.com/BaobabHealthTrust/master-facility-list my-local-master-facility-list`

## Step 2

Navigate into your local directory, i.e. `cd my-local-facility-list`, and Install all the dependancies for the main (backend project), i.e. `npm install`

## Step 3

Run the tests and make sure they are all passing, i.e. `npm test`. If they are not passing, please check whether your environment has got the dependancies listed above installed.

## Step 4

Navigate into the source code directory for the front-end application, i.e. `cd client-src` and install dependencies in there, i.e. `npm install`

## Step 5

Navigate back into the root directory of the project, i.e. `cd ..` and set the NODE_ENV to staging, i.e. `export NODE_ENV=staging`. This notifies loopback that you are in the staging environment.


## Step 6

Modify the .env.example file and make sure it reflects your MySQL Database Settings. Create a .env file with the contents of your .env.example file, i.e. `mv .env.example .env`

## Step 7

At this point you will need to run the migration command to migrate the loopback models into your MySQL instance.  To do that, globally install the loopback migration tool, `npm i -g loopback-migration-tool` and then run `lb-migration migrate` to complete the migration.
`

## Step 7

Run the fake data generation scripts to populate your database with seed data, in the following order:

### `node seeds/zone-district.js`

### `node seeds/facility-dependency.js`

### `node seeds/facility-fake-data.js 1000` where 1000 is the number of fake facilities you would like to generate

## Step 8

Once the fake data has been successfully generated, you are now ready to start the backend server by running `node .`

## Step 9

Make sure to navigate to the `client-src/src` directory and modify `settings.example.js` to your preferences. If you want to run the front end locally, then set the hostname in that file to `localhost:3000` or whatever will be generated from your previous step. If you would like the front-end to connect to a backend hosted remotely, you may set the url to that remote backend url. Next, move the settings into a `settings.js` file as follows, `mv settings.example.js settings.js`.

## Step 10

You are now ready to start the front end application as follows, `npm start` (while in `client-src` directory)

# Contribution

Once you have followed the installation step, you are ready to contribute to the source code. When working on the API, you will mostly use the Loopback _Model Generator_, as well as make changes to files in `common/models`.  When working on the Front-end, you will be modifying files in `client-src`. Make sure to add tests for every generated model, covering the major enpoints and relationships that will be hit via the API. From the root, running `npm start` will start the API on port 3000. Tests are not mandatory for the React Project, but highly encouraged.

## Reporting Issues

If you have noticed a bug, you can open an issue in [github web](https://github.com/BaobabHealthTrust/master-facility-list/issues) and attempt to fix (see below), otherwise we will do our best to look at it.

## Fixing Issues

From the issue list, you can select an issue, and create a branch in your local directory describing the issue you are fixing. Once the issue is fixed and all the tests are running, you can publish your local branch to the repository. From there, you may open a pull request describing how you have solved the issue. Remember to explicity say which issue number it solves, i.e. "solves issue #41" so that the issue is automatically closed upon merge

## Adding Features

If you have any features to add, please follow the instructions in the previous step to create a new feature branch and publish it to the remote repository upon completion of the feature. Every additional feature on the backend must have tests to go along with it.

Enjoy, and feel free to contact [jeremiahchienda@baobabhealth.org](mailto://jeremiahchienda@baobabhealth.org)
