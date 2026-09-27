// Base defender class
import Phaser from "phaser";

export class Defender extends Phaser.GameObjects.Sprite {

    health: number;
    damage: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        scene.add.existing(this);

        this.health = 100;
        this.damage = 20;
    }

    takeDamage(amount: number) {
        this.health -= amount;

        if (this.health <= 0) {
            this.destroy();
        }
    }
}