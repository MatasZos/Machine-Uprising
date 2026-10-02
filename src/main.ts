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
  private projectiles: Projectile[] = [];
  private defenders: Shooter[] = [];

  constructor() {
    super('MainScene');
  }

  preload() {
    // Assets
    this.load.image("shooter","assets/defenders/shooterdefender.png");

    this.load.image("enemy","assets/enemies/meleerobot.png");

    this.load.image("laser","assets/effects/projectile.png" );
  }

  private drawGrid() {
    const graphics = this.add.graphics();

    graphics.lineStyle(2,0xffffff,0.5);

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const x = GRID_X + col * CELL_SIZE;
        const y = GRID_Y + row * CELL_SIZE;

        graphics.strokeRect( x, y, CELL_SIZE,CELL_SIZE
        );
      }
    }
  }

  private drawToolbar() {
    const toolbarX = 100;
    const toolbarY = 20;

    const button = this.add.rectangle(toolbarX,toolbarY,150,40,0x333333 );

    const label = this.add.text(toolbarX,toolbarY,"Shooter",{
        fontSize: "18px",
        color: "#ffffff"
      }
    );

    button.setInteractive({
      useHandCursor: true
    });

    button.on("pointerdown", () => {
      this.selectedDefender = "shooter";
      label.setColor("#00ff00");
    });
  }

  private handleGridClick(
    pointer: Phaser.Input.Pointer
  ) {

    // Convert mouse position into grid position
    const col = Math.floor(
      (pointer.x - GRID_X) / CELL_SIZE
    );

    const row = Math.floor(
      (pointer.y - GRID_Y) / CELL_SIZE
    );

    // Ignore clicks outside grid
    if (
      row < 0 ||row >= GRID_ROWS ||col < 0 ||col >= GRID_COLS) {
      return;
    }

    const cell =this.grid.getCell(row, col);

    // Dont allow two defenders in the same cell
    if (!cell.isEmpty()) {
      return;
    }

    // Nothing selected
    if (this.selectedDefender === null) {
      return;
    }

    // Centre of selected grid cell
    const defenderX =GRID_X +col * CELL_SIZE +CELL_SIZE / 2;

    const defenderY =GRID_Y +row * CELL_SIZE +CELL_SIZE / 2;

    // Create shooter
    const defender = new Shooter(this,defenderX,defenderY);

    // Store shooter in grid
    this.grid.placeHuman(row,col,defender);

    defender.setData("gridRow", row);
    defender.setData("gridCol", col);

    this.defenders.push(defender);
  }

  private spawnEnemy() {

    // Pick random lane
    const row = Phaser.Math.Between(0,GRID_ROWS - 1);

    const enemyX =GRID_X +GRID_COLS * CELL_SIZE +50;

    const enemyY = GRID_Y +row * CELL_SIZE +CELL_SIZE / 2;

    // Create enemy
    const enemy = new Enemy(this,enemyX,enemyY,"enemy");

    this.enemies.push(enemy);
  }

  // Check whether a projectile has hit an enemy
  private handleProjectileEnemyCollision() {

    for (const projectile of this.projectiles) {

      // Ignore destroyed projectiles
      if (!projectile.active) {
        continue;
      }

      for (const enemy of this.enemies) {

        // Ignore destroyed enemies
        if (!enemy.active) {
          continue;
        }

        // Check whether their rectangles overlap
        const hit =
          Phaser.Geom.Intersects.RectangleToRectangle(
            projectile.getBounds(),
            enemy.getBounds()
          );

        if (hit) {

          //Damage enemy 
          enemy.takeDamage(projectile.damage);

          // Remove projectile
          projectile.destroy();

          break;
        }
      }
    }
  }

  private handleEnemyDefenderCollision() {

  for (const enemy of this.enemies) {

    if (!enemy.active) {
      continue;
    }

    for (const defender of this.defenders) {

      if (!defender.active) {
        continue;
      }

      const hit =
        Phaser.Geom.Intersects.RectangleToRectangle(
          enemy.getBounds(),
          defender.getBounds()
        );

      if (hit) {

        // Remember which grid cell this defender is in
        const row = defender.getData("gridRow");
        const col = defender.getData("gridCol");

        // Kill defender when enemy touches it
        defender.takeDamage(100);

        // Clear the grid cell
        this.grid.removeOccupant(row, col);

        // Remove dead defender from our list
        this.defenders = this.defenders.filter(
          d => d !== defender
        );
        
        break;
      }
    }
  }
}

  create() {
    // Create grid
    this.grid = new Grid(GRID_ROWS,GRID_COLS);

    // Store projectiles created by shooters
    this.events.on(
      "projectile-created",
      (projectile: Projectile) => {
        this.projectiles.push(projectile);

      }
    );

    // Draw game
    this.drawGrid();
    this.drawToolbar();

    // Grid clicking
    this.input.on(
      "pointerdown",
      this.handleGridClick,
      this
    );

    this.spawnEnemy();

    this.time.addEvent({
      delay: 3000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    });
  }

  update(
    _time: number,
    delta: number
  ) {
    // Move enemies
    for (const enemy of this.enemies) {
      if (enemy.active) {
        enemy.move(delta);
      }
    }

    // Move projectiles
    for (const projectile of this.projectiles) {
      if (projectile.active) {
        projectile.move(delta);
      }
    }
    // Check projectile/enemy collisions
    this.handleProjectileEnemyCollision();
    
    // Check enemy/defender collisions
    this.handleEnemyDefenderCollision();
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1b1b1b',
  parent: 'game-container',

  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },

  scene: [MainScene]
});