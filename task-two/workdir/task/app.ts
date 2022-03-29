interface CustumType {
  name: string;
  location: string;
}

const taskOne = (passengers: number, shuffle: number) => {
  let count = 0;
  let reserve: CustumType[] = [];
  let board: CustumType[] = [];
  let locations = ["Abuja", "Benue", "Lagos", "Katsina", "Sambisa"];

  for (let i = 0; i < passengers; i++) {
    reserve.push({
      name: `passenger${i + 1}`,
      location: `${locations[i % locations.length]}`,
    });
  }
  let iterator = shuffle + 1;
  while (passengers > 4 && iterator) {
    if (passengers > 4 && passengers < 50) {
      let check = Math.trunc(passengers / 5) * 5;
      board = reserve.splice(0, check);
      passengers = passengers - check;
      count++;
      iterator--;
    } else if (passengers >= 50) {
      board = reserve.splice(0, 50);
      count++;
      iterator--;
      passengers = passengers - 50;
    }
  }
  // res = actual.slice(newE.length, passengers);
  return {
    boarded: board,
    reservation: reserve,
    count: count,
  };
};
taskOne(150, 3);
export default taskOne;
