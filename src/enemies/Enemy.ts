import Phaser from "phaser";

export class Enemy extends Phaser.GameObjects.Sprite {

    health: number;
    speed: number;
    damage: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        scene.add.existing(this);

        this.health = 100;
        this.speed = 50;
        this.damage = 10;
    }

    takeDamage(amount: number) {
        this.health -= amount;

        if (this.health <= 0) {
            this.destroy();
        }
    }

    move(delta: number) {
        this.x -= this.speed * (delta / 1000);
    
    }
}