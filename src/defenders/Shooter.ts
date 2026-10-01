import Phaser from "phaser";
import { Defender } from "./Defender";

export class Shooter extends Defender {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string
    ) {
        super(scene, x, y, texture);

        this.health = 100;
        this.damage = 20;
    }
}