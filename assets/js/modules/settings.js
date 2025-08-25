export const characters = {
  angel: {
    src: './assets/img/heroes/01-angel.webp',
    attackCount: 1,
    defenseCount: 2,
    attack: 10,
    defense: 10,
    fortune: 30,
    health: 150,
  },
  archer: {
    src: './assets/img/heroes/02-archer.webp',
    attackCount: 1,
    defenseCount: 2,
    attack: 20,
    defense: 10,
    fortune: 50,
    health: 150,
  },
  alchemist: {
    src: './assets/img/heroes/03-alchemist.webp',
    attackCount: 1,
    defenseCount: 2,
    attack: 20,
    defense: 10,
    fortune: 30,
    health: 150,
  },
  knight: {
    src: './assets/img/heroes/04-knight.webp',
    attackCount: 1,
    defenseCount: 2,
    attack: 20,
    defense: 10,
    fortune: 30,
    health: 150,
  },
};

export const enemies = [
  {
    src: './assets/img/enemies/01-demon.webp',
    name: 'Asgaroth',
    attackCount: 1,
    defenseCount: 1,
    attack: 10,
    defense: 10,
    fortune: 10,
    health: 100,
  },
  {
    src: './assets/img/enemies/02-succub.webp',
    name: 'Lilith',
    attackCount: 1,
    defenseCount: 2,
    attack: 20,
    defense: 10,
    fortune: 50,
    health: 70,
  },
  {
    src: './assets/img/enemies/03-necromant.webp',
    name: 'Xanatos',
    attackCount: 2,
    defenseCount: 1,
    attack: 20,
    defense: 10,
    fortune: 30,
    health: 150,
  },
];

export const attackZones = {
  head: 0,
  neck: 0,
  body: 0,
  belly: 0,
  legs: 0,
};

export const defenceZones = {
  head: 0,
  neck: 0,
  body: 0,
  belly: 0,
  legs: 0,
};

export const enemyAttackZones = {
  head: 0,
  neck: 0,
  body: 0,
  belly: 0,
  legs: 0,
};

export const enemyDefenceZones = {
  head: 0,
  neck: 0,
  body: 0,
  belly: 0,
  legs: 0,
};

export const zones = ['head', 'neck', 'body', 'belly', 'legs'];
