import Phaser from "phaser";

export class Enemy extends Phaser.GameObjects.Sprite {

    health: number;
    speed: number;
    damage: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string
    ) {
        super(scene, x, y, texture);

        scene.add.existing(this);

        // Give enemy a physics body
        scene.physics.add.existing(this);

        this.setDisplaySize(60, 60);

        this.health = 100;
        this.speed = 50;
        this.damage = 10;
    }

    takeDamage(amount: number) {

        this.health -= amount;

        console.log("Enemy health:", this.health);

        if (this.health <= 0) {
            this.destroy();
        }
    }

    move(delta: number) {
        this.x -= this.speed * (delta / 1000);
    }
}