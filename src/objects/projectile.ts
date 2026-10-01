import Phaser from "phaser";

export class Projectile extends Phaser.GameObjects.Rectangle {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number
    ) {
        super(
            scene,
            x,
            y,
            15,
            6,
            0xffff00
        );

        scene.add.existing(this);

        scene.physics.add.existing(this);

        const body = this.body as Phaser.Physics.Arcade.Body;

        body.setVelocityX(300);

        scene.time.delayedCall(3000, () => {
            this.destroy();
        });
    }
}