function getOneToSix(index: number): 1 | 2 | 3 | 4 | 5 | 6 {
  return ((index % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

export default getOneToSix;
