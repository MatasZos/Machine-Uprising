import Phaser from 'phaser';
import { Grid } from "./grid/Grid";
import { Shooter } from "./defenders/Shooter";
import { Enemy } from "./enemies/Enemy";
import { Projectile } from "./objects/projectile";

const GRID_ROWS = 5;
const GRID_COLS = 8;
const CELL_SIZE = 75;

const GRID_X = 100;
const GRID_Y = 100;

class MainScene extends Phaser.Scene {
  private grid!: Grid;
  private selectedDefender: string | null = null;
  private enemies: Enemy[] = [];

  // Physics groups
  private projectileGroup!: Phaser.Physics.Arcade.Group;
  private enemyGroup!: Phaser.Physics.Arcade.Group;

  constructor() {
    super('MainScene');
  }

  preload() {
    // Assets
    this.load.image("shooter", "assets/defenders/shooterdefender.png");
    this.load.image("enemy", "assets/enemies/meleerobot.png");
    this.load.image("laser", "assets/effects/projectile.png");
  }

  private drawGrid() {
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffffff, 0.5);

    // Draw cells
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const x = GRID_X + col * CELL_SIZE;
        const y = GRID_Y + row * CELL_SIZE;

        graphics.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
      }
    }
  }

  private drawToolbar() {
    const toolbarX = 100;
    const toolbarY = 20;

    // Shooter button
    const button = this.add.rectangle(toolbarX, toolbarY, 150, 40, 0x333333);
    const label = this.add.text(toolbarX, toolbarY, "Shooter", {
      fontSize: "18px",
      color: "#ffffff"
    });

    button.setInteractive({ useHandCursor: true });

    button.on("pointerdown", () => {
      this.selectedDefender = "shooter";
      label.setColor("#00ff00");
    });
  }

  private handleGridClick(pointer: Phaser.Input.Pointer) {
    // Get grid position
    const col = Math.floor((pointer.x - GRID_X) / CELL_SIZE);
    const row = Math.floor((pointer.y - GRID_Y) / CELL_SIZE);

    // Ignore outside grid
    if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) {
      return;
    }

    const cell = this.grid.getCell(row, col);

    // Cell already used
    if (!cell.isEmpty()) {
      return;
    }

    // No defender selected
    if (this.selectedDefender === null) {
      return;
    }

    // Cell centre
    const defenderX = GRID_X + col * CELL_SIZE + CELL_SIZE / 2;
    const defenderY = GRID_Y + row * CELL_SIZE + CELL_SIZE / 2;

    // Create shooter
    const defender = new Shooter(this, defenderX, defenderY);

    this.grid.placeHuman(row, col, defender);
  }

  private spawnEnemy() {
    // Random lane
    const row = Phaser.Math.Between(0, GRID_ROWS - 1);

    const enemyX = GRID_X + GRID_COLS * CELL_SIZE + 50;
    const enemyY = GRID_Y + row * CELL_SIZE + CELL_SIZE / 2;

    // Create enemy
    const enemy = new Enemy(this, enemyX, enemyY, "enemy");

    this.enemies.push(enemy);
    this.enemyGroup.add(enemy);
  }

  create() {
    // Create grid
    this.grid = new Grid(GRID_ROWS, GRID_COLS);

    // Physics groups
    this.projectileGroup = this.physics.add.group({
  runChildUpdate: false
});

this.enemyGroup = this.physics.add.group({
  runChildUpdate: false
});

    // Add new projectiles
    this.events.on("projectile-created", (projectile: Projectile) => {
      this.projectileGroup.add(projectile);
    });

    // Projectile hits enemy
    this.physics.add.overlap(
      this.projectileGroup,
      this.enemyGroup,
      (projectileObject, enemyObject) => {
        const projectile = projectileObject as Projectile;
        const enemy = enemyObject as Enemy;

        // Damage enemy
        enemy.takeDamage(projectile.damage);

        // Remove projectile
        projectile.destroy();
      }
    );

    this.drawGrid();
    this.drawToolbar();

    // Grid clicks
    this.input.on("pointerdown", this.handleGridClick, this);

    // First enemy
    this.spawnEnemy();

    // Spawn enemies
    this.time.addEvent({
      delay: 3000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    });
  }

  update(_time: number, delta: number) {
    // Move enemies
    for (const enemy of this.enemies) {
      if (enemy.active) {
        enemy.move(delta);
      }
    }
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1b1b1b',
  parent: 'game-container',

  // Arcade physics
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },

  scene: [MainScene]
});