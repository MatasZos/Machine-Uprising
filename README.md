# SURGE

## 1. Game Overview

### 1.1 Game Concept

SURGE is a 2D tower-defence game based on Humans VS Machines. 
The Player must defend their base (stronghold) from waves of machines by placing different human defenders on a battlefield grid

### 1.2 Genre

2D Tower Defence

### 1.3 Inspiration

The game is inspired by tower-defence games such as Plants VS Zombies.

#### 1.4 Core Gameplay

The player:
- Places defenders on the battlefield grid
- Uses energy to place defenders
- Defends against waves of machine enemies
- Uses a variety of defenders to defend different situations
- Aim is to survive increasingly difficult waves and defeat the boss

## 2 Game Design

### 2.1 Battlefield / Grid

The board/battlefield will consist of grids that are divided into multiple horizontal lines. Defenders can be placed on any available grid cell, while the enemies will enter from the opposite side and move towards the stronghold

### 2.2 Energy System / Generation

The main resource for the defenders is energy. Each defender will have a different cost of energy. The player must be able to manage the available energy and decide on which defender is more useful during each wave/situation. The energy will  spawn randomly to be picked up by the player to use, in addition there will be energy generators in order to speed up the energy process.


### 2.3 Defenders

The defenderds are human/soldiers which are used to defend the strongohld and will be placed by the player. The defenders will be stationary and will be locked to a grid cell that the player chooses. The first standard types of defenders are:
- Shooter - will attack the machines via a projectile from a distance
- Barricade - a high health wall to block enemies from moving forward
- Generator - it will generate additional energy for the player

More defenders will be developed and introduced in the progress

### 2.4 Enemies 

The enemies are the machines trying to reach the stronghold which move acrooss the battlefield towards the defenders. Different machines will have different abilities:
- Melee machine - the standard enemy that attacks the defenders at close rnage only 
- Shooter machine - attacks the defender from a far via projectiles
- Boss machine - a powerful anemey which will have increased health and damage (and possibly abilities and mechanics)

More enemies will be developed and introduced in the process 

### 2.5 Health and Damage (Stats)

Both of the defenders and enemies will have a certain amount of health. Attackers reduce health and once a units health reaches 0, they are removed from the battlefield. If a defender is removed, a new one can be placed on the grid cell. If an enemey reaches the stronghold, it will deal damage to it, and the player (objective) will lose health or progress in the game or level.

## 3 Player Input

The game will be primarily mouse control based. The player selects a defender from the toolbar provided and clicks on any available grid cell. The player will also use the mosue to interact with the menu and other game UI elements.

## 4 Main Menu

The main menu will introduce players to four Core buttons, Start Game, How to Play, Settings and Exit. The buttons are arranged vertically, the layout is simple, clear and visually appealing with the rest of the game 

## 5 Game Features

| Feature | Priority | Description |
|---|:---:|---|
| Grid System | 1 | Create the battlefield grid and individual cells used for placing defenders. |
| Toolbar | 1 | Allow the player to select the type of defender they want to place. |
| Energy System | 2 | Create a resource system used to purchase and place defenders. |
| Shooter Defender | 1 | Basic attacking human defender that shoots approaching machines. |
| Barricade Defender | 2 | Defensive unit used to block or slow enemies. |
| Generator Defender | 3 | Produces additional energy for the player. |
| Melee Enemy | 1 | Basic machine enemy that moves towards and attacks defenders at close range. |
| Shooter Enemy | 2 | Machine enemy capable of attacking defenders from a distance. |
| Boss Enemy | 3 | Strong enemy intended for later levels. |
| Health / Damage System | 1 | Allow defenders and enemies to take damage and be destroyed. |
| Input Mechanics | 1 | Allow the player to interact with the grid and place defenders. |
| Multiple Levels | 3 | Add additional levels with increasing difficulty. |
| Level Complete Screen | 3 | Display a completion screen when the player successfully finishes a level. |

## 6 Development Priorities
The main features required to create the basic playable version of SURGE:
 - Grid System
 - Toolbar
 - Shooter Defender
 - Melee Enemy
 - Health/Damage System
 - Input Mechanics


## 7 Technology

- Typescript
- IDE ( Visual Studio Code / Celbridge)
