import {Guitar, GuitarStringCount, GuitarType} from '../types/guitar';

function filterByName(guitars: Guitar[], name: string) {
  if (!name) {
    return guitars;
  }
  return guitars.filter((guitar) => (
    guitar.name
      .toLowerCase()
      .includes(name.toLocaleLowerCase())
  ));
}

function filterByPrice(guitars: Guitar[], [priceMin, priceMax]: [number, number]) {
  if (priceMin === 0 || priceMax === 0) {
    return guitars;
  }

  return guitars.filter((guitar) => (
    priceMin <= guitar.price && guitar.price <= priceMax
  ));
}

function filterByStrings(guitars: Guitar[], strings: GuitarStringCount[]) {
  if (strings.length === 0) {
    return guitars;
  }

  const stringNumbers = strings.map(Number);

  return guitars.filter((guitar) => (
    stringNumbers.includes(guitar.stringCount)
  ));
}

function filterByType(guitars: Guitar[], types: GuitarType[]) {
  if (types.length === 0) {
    return guitars;
  }

  return guitars.filter((guitar) => (
    types.includes(guitar.type)
  ));
}

export {
  filterByName,
  filterByPrice,
  filterByStrings,
  filterByType
};
