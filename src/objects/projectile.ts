import Phaser from "phaser";

export class Projectile extends Phaser.GameObjects.Sprite {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number
    ) {
        super(
            scene,
            x,
            y,
            "laser"
        );

        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.setDisplaySize(20, 4);

        const body = this.body as Phaser.Physics.Arcade.Body;

        body.setVelocityX(300);

        scene.time.delayedCall(3000, () => {
            this.destroy();
        });
    }
}