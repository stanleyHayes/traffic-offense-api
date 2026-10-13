# traffic-offense-api

traffic offense api is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `admins.controller`, `authentication.controller`, `dashboard.controller`, `drivers.controller`, `offenses.controller`, `vehicles.controller`, `admin.model`, `driver.model`, `offense.model`, `vehicle.model`.

## Repository layout

- `src/` — 26 tracked file(s); source examples: `src/app.js`, `src/config/config.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/traffic-offense-api.git
cd traffic-offense-api
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon src/index.js`).
- `npm run start` — runs the declared `start` script (`node src/index.js`).
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [src/app.js](src/app.js)
- [src/config/config.js](src/config/config.js)
- [src/controllers/v1/admins/admins.controller.js](src/controllers/v1/admins/admins.controller.js)
- [src/controllers/v1/authentication/authentication.controller.js](src/controllers/v1/authentication/authentication.controller.js)
- [src/controllers/v1/dashboard/dashboard.controller.js](src/controllers/v1/dashboard/dashboard.controller.js)
- [src/controllers/v1/drivers/drivers.controller.js](src/controllers/v1/drivers/drivers.controller.js)
- [src/controllers/v1/offenses/offenses.controller.js](src/controllers/v1/offenses/offenses.controller.js)
- [src/controllers/v1/vehicles/vehicles.controller.js](src/controllers/v1/vehicles/vehicles.controller.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
