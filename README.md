# AquaPonic - Iot Module API

This application is used to manage IoT modules that take measurements of water parameters in aquaponic culture.
This app was created using **Vite + React.js + React Router**.

<p align="center">
<img src="./front-end/src/assets/mainApp.png" height= "200%" alt="Main app screenshot">
</p>

## Table of contents

- [Features](#Features)
- [Technologies](#technologies)
- [Screenshots](#screenshots)

## Features

### 1. Module list page

The main page of the application displays all available modules in the form of a list with their parameters.

The list of modules is retrieved by endpoint **GET /modules**

### 2. Module details page

After clicking on the appropriate item in the list of all modules, the user is transferred to the details page of the selected module

The module data are retrieved by endpoint **GET /modules/:id**

### 3. Ability to edit the module

On the module details page the user has the possibility to change the module parameters.

- After clicking the button 'EDIT PARAMETERS' the fields with the possibility to edit the parameters name, description, targetTemperature will appear.
- It is not possible to edit an unavailable module.
- The data entered are subject to validation before being sent to the API.Field validation is performed according to the rules:
     - name - character string, not empty
     - description - a string of characters, not empty
     - targetTemperature - number, between 0 and 40

The endpoint **PATCH /modules/:id** is used to edit the module

### 4. Display of current temperature value

The current water temperature measured by the module is displayed on -the module list and the module details page together with other parameters.

- The temperature is retrieved from the WebSocket server at localhost:3001.
- The package npm socket.io-client was used to communicate via WebSocket.
- The displayed temperature is updated in real time when a message is received from the WebSocket server.
- If the temperature is within ±0.5°C the targetTemperature, value is displayed in green, otherwise in red.

### 5. Display of historical temperature data

A chart was added to the module details page with the possibility of viewing historical data for the module.

- The Chart.js library was used to display the chart
- The user can select the time range (1 day, 2 days, 7 days, 10 days, 30 days) and mode ("hourly" or "daily")
- Historical data is retrieved by endpoint **GET /modules/:id/history** with the query parameters start, stop and mode.
- The start and stop parameters are in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) and the allowed mode values are 'hourly' or 'daily'.

## Technologies

<p align="left">
<a href="https://react.dev/"><img src="./front-end/src/assets/React-icon.png" style="width:32px; height:32px;" alt="React icon"></a>
<a href="https://vitejs.dev/"><img src="./front-end/src/assets/vite.svg" style="width:32px; height:32px;" alt="React icon"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="./front-end/src/assets/js_icon.svg" style="width:32px; height:32px;" alt="JS icon"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS?retiredLocale=pl"><img src="./front-end/src/assets/css3_icon.svg" style="width:32px; height:32px;" alt="Css icon"></a>

## Screenshots

### Main page

<p align="center">
  <img src="./front-end/src/assets/mainApp.png" style="width:320px;" alt="MainApp screenshot">
</p>

### Module details

<p align="center">
  <img src="./front-end/src/assets/moduleDetails.png" style="width:320px;" alt="Module details screenshot">
</p>

### Module edit

<p align="center">
  <img src="./front-end/src/assets/moduleEdit.png" style="width:320px;" alt="Module edit screenshot">
</p>

## Installation

To run this project, you must have the following dependencies installed:

- Git (https://git-scm.com)

```bash

git clone https://github.com/lilunia/AquaPonic.git
npm install
npm run dev

```
