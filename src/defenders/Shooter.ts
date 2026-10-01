import Phaser from "phaser";
import { Defender } from "./Defender";
import { Projectile } from "../objects/projectile";

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

        console.log("Shooter created");

        scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.shoot();
            },
            loop: true
        });
    }

    private shoot() {

        console.log("Shooter fired");

        new Projectile(
            this.scene,
            this.x + 30,
            this.y
        );
    }
}