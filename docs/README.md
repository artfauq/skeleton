# Documentation

## Getting started

### Prerequisites

[Node.js](https://nodejs.org/en/) and [Gulp](https://gulpjs.com/) are required to run the application.

- Visit [this page](https://nodejs.org/en/download/) for Node.js download instructions
- Once Node.js is installed, open a terminal and run the following to install Gulp globally:

`$ npm i -g gulp`

### Installation

Navigate to the project's directory:

`$ cd <project name>`

Install the required dependencies:

`$ npm install`

### Development

Start a local development server with the following command:

`$ npm run dev`

This will fire up a local web server at [`http://localhost:3000/`](http://localhost:3000) and watch for changes in your source files allowing the browser to reload automatically.

### Build

Compile the application sources to a production-ready `dist/` folder with:

`$ npm run build`

### Production

Run the compiled application from the `dist/` folder with:

`$ npm run start`

### Deploy

If your application is available as a GitHub repository, it is possible to publish the compiled sources to [GitHub Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/).

To compile the project's sources and push it to a `gh-pages` branch, run:

`$ npm run deploy`

This command uses internally the `npm run build` command and the [gh-pages](https://www.npmjs.com/package/gh-pages) npm package.
