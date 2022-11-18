function checkCashRegister(price, cash, cid) {

  let currencyArray = [
    ["ONE HUNDRED", 100], 
    ["TWENTY", 20], 
    ["TEN", 10], 
    ["FIVE", 5], 
    ["ONE", 1], 
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
    ]

  let reversedCid = cid.reverse();

  let mapped = currencyArray.map((element, index) => [element[0], element[1], reversedCid[index][1]]
  );

  let cidSum = mapped.reduce(
  (result, currentValue) => result + currentValue[2], 0);

  let changeToGiveToClient = cash - price;

  if(changeToGiveToClient > cidSum) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }

  if(changeToGiveToClient == cidSum) {
    let returnObj = mapped.map((element) => [element[0], element[2]]).reverse();
    return {status: "CLOSED", change: returnObj};
  }

  let returnObj = [];

  for(let i = 0; i < mapped.length; i++) {
    let nameOfcurrentNominal = mapped[i][0];
    let currentNominal = mapped[i][1];
    let sumOfCurrentNominal = mapped[i][2].toFixed(2);
    if(currentNominal > changeToGiveToClient || sumOfCurrentNominal == 0) {
      continue;
    }
    let numberOfCurrentBillsInCashRegister = Math.round(sumOfCurrentNominal/currentNominal);
    let currentBillsGivenToClient = 0;
    while(currentNominal <= changeToGiveToClient) {
      --numberOfCurrentBillsInCashRegister;
      ++currentBillsGivenToClient;
      let valueOfCurrentBillsGivenToClient = (currentNominal * currentBillsGivenToClient).toFixed(2);
      sumOfCurrentNominal = (currentNominal * numberOfCurrentBillsInCashRegister).toFixed(2);
      changeToGiveToClient = parseFloat((changeToGiveToClient - currentNominal).toFixed(2));
      if((sumOfCurrentNominal == 0) || (changeToGiveToClient == 0) || (changeToGiveToClient < currentNominal)) {
        returnObj.push([nameOfcurrentNominal, parseFloat(valueOfCurrentBillsGivenToClient)]);
        if((sumOfCurrentNominal == 0) && (changeToGiveToClient != 0) && currentNominal == 0.01) {
          return {status: "INSUFFICIENT_FUNDS", change: []};
        }
        if(changeToGiveToClient === 0) {
          return {status: "OPEN", change: returnObj};
        }
        break;
      }
    }
  }
  return {status: "OPEN", change: returnObj};
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
