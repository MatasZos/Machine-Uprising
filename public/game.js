"use strict";
(() => {
  // src/main.ts
  var SCREEN_WIDTH = 800;
  var SCREEN_HEIGHT = 600;
  var LIGHT_BLUE = "#add8e6";
  var BACKGROUND_COLOUR = LIGHT_BLUE;
  addEventListener("load", () => {
    const canvas = document.getElementById("gameCanvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const g = canvas.getContext("2d");
    g.fillStyle = BACKGROUND_COLOUR;
    g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  });
})();
