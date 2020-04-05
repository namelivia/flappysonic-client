# flappysonic-client [![Tag](https://img.shields.io/github/tag/namelivia/flappysonic-client.svg)](https://github.com/namelivia/flappysonic-client/releases) [![Build Status](https://travis-ci.com/namelivia/flappysonic-client.svg?branch=master)](https://travis-ci.com/namelivia/flappysonic-client) [![Test Coverage](https://api.codeclimate.com/v1/badges/2a3a3b30766e754520f1/test_coverage)](https://codeclimate.com/github/namelivia/flappysonic-client/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/2a3a3b30766e754520f1/maintainability)](https://codeclimate.com/github/namelivia/flappysonic-client/maintainability)

Flappy Bird like game featuring Sonic The Hedgehog.

Play it here: [https://flappysonic.namelivia.com](https://flappysonic.namelivia.com)

<p align="center">
  <img src="https://user-images.githubusercontent.com/1571416/78504241-1292b800-776c-11ea-9368-a6848b3290b2.png" alt="Instructions" />
</p>

This is the client part of a Flappy Bird Like game featuring Sonic the Hedgehog.
Yo can play it on: [https://flappysonic.namelivia.com](https://flappysonic.namelivia.com)

## Requeriments

* This has [createjs](https://createjs.com/) as an external dependency, this library has not been bundled.

## Installation

You can get the package from npm with `npm i flappysonic-client`

You can also build it from surce cloning the project, navigate to its root folder and execute `npm install` for installing it's dependencies, and then `npm run-script build` for building it.

## Usage

To embed this game in an html file createjs has to be loaded from its CDN first, then you can load `bundle.js` and the canvas where the game will be inserted like:
```html
<html>
    <head>
      <script src="https://code.createjs.com/1.0.0/createjs.min.js" />
      <script src='/scripts/bundle.js'/>
    </head>
    <body>
      <canvas id="gameCanvas" width="320" height="288" />
    </body>
</html>
```

## Testing

For executing the tests just execute `npm test` on the project's root folder.

## Contributing
Any suggestion, bug reports, or any other kind enhacements are welcome. Just [open an issue first](https://github.com/namelivia/flappysonic-client/issues/new) for creating a PR remember this project has linting checkings so any PR should comply with them before beign merged, this checks will be automatically applied when opening or modifying the PR's.
