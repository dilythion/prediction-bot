// amount of money you have
const money = 206500; 

// estimated probability of the first option winning
const odds = 12 / 69;

// total amounts bet on both options
const bets = {
  yes: 828000,
  no: 1000000
}

// expected amount of money you will have gained by the time the next prediction happens
const income = 3000; 

const valuation = (bet, bets, odds) => {
  return odds * Math.log((money + bet / (bet + bets[0]) * bets[1] + income) / money) + (1 - odds) * Math.log((money - bet + income) / money);
}
const profit = (bet, bets, odds) => {
  return odds * bet / (bet + bets[0]) * bets[1] - (1 - odds) * bet;
}

for (const option of [0, 1]) {
  let highestValuation = 0;
  let highestValuationBet = 0;

  for (const bet of Array.from(Array(Math.min(money, 250000) + 1).keys())) {
    let value;
    if (option === 0) {
      value = valuation(bet, [bets.yes, bets.no], odds);
    } else {
      value = valuation(bet, [bets.no, bets.yes], 1 - odds);
    }

    if (value > highestValuation) {
      highestValuation = value;
      highestValuationBet = bet;
    }
  }

  if (option === 0) {
    console.log(`Bet $${highestValuationBet} on option one to make $${Math.floor(profit(highestValuationBet, [bets.yes, bets.no], odds))} in average profits!`);
  } else {
    console.log(`Bet $${highestValuationBet} on option two to make $${Math.floor(profit(highestValuationBet, [bets.no, bets.yes], 1 - odds))} in average profits!`);
  }
}