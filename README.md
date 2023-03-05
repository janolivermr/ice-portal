# ICE Portal

Scriptable App script for Deutsch Bahn ICE Portal Info Widgets

![Screenshot of the Widget](screenshot.jpeg)

## Installation

The project is written in TypeScript, you will need to compile it to JS to se it in the Scriptable app.
Install the dependencies by running `npm install`.

To build the code, run `tsup`, then run `npm run assemble` to create the JS file including the comment
used by Scriptable to use the correct colour and icon.

## Assets

The project uses several image files which you need to acquire separately, including the DB logo and the ICE/IC train logos

You can find the DB logo pack on [DB Marketingportal](https://marketingportal.extranet.deutschebahn.com/marketingportal/Basiselemente/Logo).
Scroll all the way to the bottom, where you will find a download button.
You will only need the file `DB_logo_red_1000px_rgb.png` from the ZIP Archive.

You can find the train brand logos for ICE and IC on Wikipedia:
- [ICE Logo](https://de.wikipedia.org/wiki/Datei:ICE-Logo.svg)
- [IC Logo](https://de.wikipedia.org/wiki/Datei:IC-Logo.svg)

Download the 640x350px PNG version.

Save all 3 files into the Scriptable documents folder, together with the compiled JavaScript file  `dist/speed.js`.
