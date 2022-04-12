// amount of money you have
const money = 181500; 

// estimated probability of the first option winning
const odds = 11 / 46;

// total amounts bet on both options
const bets = {
  yes: 1100000,
  no: 2000000
}

const valuation = (bet, bets, odds) => {
  return odds * Math.log((money + bet / (bet + bets[0]) * bets[1]) / money) + (1 - odds) * Math.log((money - bet) / money);
}
const profit = (bet, bets, odds) => {
  return odds * bet / (bet + bets[0]) * bets[1] - (1 - odds) * bet;
}

let highestValuation = 0;
let highestValuationBet = 0;
for (const bet of Array.from(Array(((money < 250000) ? money : 250000) + 1).keys())) {
  if (valuation(bet, [bets.yes, bets.no], odds) > highestValuation) {
    highestValuation = valuation(bet, [bets.yes, bets.no], odds);
    highestValuationBet = bet;
  }
}

console.log(`Bet $${highestValuationBet} on option one to make $${Math.floor(profit(highestValuationBet, [bets.yes, bets.no], odds))} in average profits!`);

highestValuation = 0;
highestValuationBet = 0;
for (const bet of Array.from(Array(((money < 250000) ? money : 250000) + 1).keys())) {
  if (valuation(bet, [bets.no, bets.yes], 1 - odds) > highestValuation) {
    highestValuation = valuation(bet, [bets.no, bets.yes], 1 - odds);
    highestValuationBet = bet;
  }
}

console.log(`Bet $${highestValuationBet} on option two to make $${Math.floor(profit(highestValuationBet, [bets.no, bets.yes], 1 - odds))} in average profits!`);