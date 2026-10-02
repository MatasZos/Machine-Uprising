import Phaser from "phaser";
import { Defender } from "./Defender";
import { Projectile } from "../objects/projectile";

export class Shooter extends Defender {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
    ) {
        super(scene, x, y, "shooter");

        this.setDisplaySize(60,60);

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
            this.x + 25,
            this.y - 2
        );
    }
}