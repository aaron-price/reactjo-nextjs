{
  "name": "frontend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "jest": {
    "setupFiles": [
      "./shim.js"
    ]
  },
  "scripts": {
    "dev": "node server.js -p $PORT",
    "build": "next build",
    "heroku-postbuild": "next build",
    "start": "node server.js -p $PORT",
    "test": "NODE_ENV=test jest --no-cache && npm run lint",
    "lint": "./node_modules/.bin/eslint . --fix"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "autoprefixer": "^7.1.6",
    "body-parser": "^1.18.2",
    "bootstrap": "^4.0.0-beta",
    "cookie-parser": "^1.4.3",
    "dotenv": "^4.0.0",
    "express": "^4.16.2",
    "express-validator": "^4.3.0",
    "glob": "^7.1.2",
    "helmet": "^3.9.0",
    "ismobilejs": "^0.4.1",
    "isomorphic-fetch": "^2.2.1",
    "isomorphic-unfetch": "^2.0.0",
    "material-ui": "^0.19.4",
    "morgan": "^1.9.0",
    "next": "^4.1.4",
    "next-redux-wrapper": "^1.3.4",
    "node-sass": "^4.6.0",
    "normalize.css": "^7.0.0",
    "postcss-easy-import": "^3.0.0",
    "postcss-loader": "^2.0.8",
    "prop-types": "^15.6.0",
    "raw-loader": "^0.5.1",
    "react": "^16.0.0",
    "react-addons-css-transition-group": "^15.6.2",
    "react-addons-transition-group": "^15.6.2",
    "react-dom": "^16.0.0",
    "react-redux": "^5.0.6",
    "react-tap-event-plugin": "^3.0.2",
    "reactstrap": "^4.8.0",
    "redux": "^3.7.2",
    "redux-devtools-extension": "^2.13.2",
    "redux-thunk": "^2.2.0",
    "sass-loader": "^6.0.6",
    "styled-jsx": "^2.1.3"
  },
  "devDependencies": {
    "babel-plugin-module-resolver": "^3.0.0",
    "babel-plugin-wrap-in-js": "^1.1.1",
    "babel-eslint": "^8.0.2",
    "babel-plugin-dynamic-import-node": "^1.1.0",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "enzyme": "^3.1.1",
    "enzyme-adapter-react-16": "^1.0.4",
    "eslint": "^4.10.0",
    "eslint-plugin-react": "^7.4.0",
    "jest": "^21.2.1",
    "react-addons-test-utils": "^15.6.2",
    "react-test-renderer": "^16.0.0"
  }
}
