import { RED, LIGHT_BLUE } from './constants.ts';

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

const BACKGROUND_COLOUR = RED;

// run after page loaded
addEventListener("load", () => {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    const g = canvas.getContext("2d")!;

    g.fillStyle = BACKGROUND_COLOUR;
    g.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
});