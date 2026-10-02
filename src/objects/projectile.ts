import Phaser from "phaser";

export class Projectile extends Phaser.GameObjects.Sprite {
    damage: number = 20;
    speed: number = 300;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number
    ) {
        super(scene, x, y, "laser");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDisplaySize(20, 4);

        // Set projectile velocity
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocityX(this.speed);
        body.setAllowGravity(false);

        // Send projectile to MainScene
        scene.events.emit("projectile-created", this);

        // Remove after 3 seconds
        scene.time.delayedCall(3000, () => {
            if (this.active) {
                this.destroy();
            }
        });
    }
}