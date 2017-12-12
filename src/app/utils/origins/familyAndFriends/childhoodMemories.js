import Roll from 'roll';

export function childhoodMemories(charismaModifier) {
  const roll = new Roll();
  const childhoodMemoriesRoll = roll.roll('3d6');
  const childhoodMemoriesTotal = childhoodMemoriesRoll.result + charismaModifier;

  if (childhoodMemoriesTotal <= 3) {
    return '3';
  }

  if (childhoodMemoriesTotal === 4 || childhoodMemoriesTotal === 5) {
    return '45';
  }

  if (childhoodMemoriesTotal >= 6 && childhoodMemoriesTotal <= 8) {
    return '68';
  }

  if (childhoodMemoriesTotal >= 9 && childhoodMemoriesTotal <= 12) {
    return '912';
  }

  if (childhoodMemoriesTotal >= 13 && childhoodMemoriesTotal <= 15) {
    return '1315';
  }

  if (childhoodMemoriesTotal === 16 || childhoodMemoriesTotal === 17) {
    return '1617';
  }

  if (childhoodMemoriesTotal >= 18) {
    return '18';
  }
};