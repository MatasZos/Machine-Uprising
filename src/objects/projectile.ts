import Phaser from "phaser";

export class Projectile
    extends Phaser.GameObjects.Sprite {

    damage: number = 20;
    speed: number = 300;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number
    ) {
        super(scene, x, y, "laser");

        scene.add.existing(this);

        this.setDisplaySize(20, 4);

        // projectile exists in mainscene
        scene.events.emit(
            "projectile-created",
            this
        );
    }
    move(delta: number) {
        this.x += this.speed * (delta / 1000);
        if (this.x > 800) {
            this.destroy();

        }
    }
}