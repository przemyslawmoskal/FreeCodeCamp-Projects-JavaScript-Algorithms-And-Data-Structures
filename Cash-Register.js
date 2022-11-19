function checkCashRegister(price, cash, cid) {

  let denomArray = [
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

  let denomAndCidArr = denomArray.map((element, index) => [element[0], element[1], reversedCid[index][1]]);

  const minDenom = denomAndCidArr.reduce((first, second) =>  first[1] < second[1] ? first[1] : second[1]);

  let cidSum = denomAndCidArr.reduce((result, currentValue) => result + currentValue[2], 0);

  let change = cash - price;

  if(change > cidSum) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }

  if(change == cidSum) {
    let returnObj = denomAndCidArr.map((element) => [element[0], element[2]]).reverse();
    return {status: "CLOSED", change: returnObj};
  }

  let returnObj = [];

  for(let i = 0; i < denomAndCidArr.length; i++) {
    let currentDenomName = denomAndCidArr[i][0];
    let currentDenomVal = denomAndCidArr[i][1];
    let currentDenomSum = denomAndCidArr[i][2].toFixed(2);
    if(currentDenomVal > change || currentDenomSum == 0) {
      continue;
    }
    let currentDenomBillsInCashReg = Math.round(currentDenomSum/currentDenomVal);
    let currentBillsGivenToClient = 0;
    while(currentDenomVal <= change) {
      --currentDenomBillsInCashReg;
      ++currentBillsGivenToClient;
      let valueOfCurrentBillsGivenToClient = (currentDenomVal * currentBillsGivenToClient).toFixed(2);
      currentDenomSum = (currentDenomVal * currentDenomBillsInCashReg).toFixed(2);
      change = parseFloat((change - currentDenomVal).toFixed(2));
      if((currentDenomSum == 0) || (change == 0) || (change < currentDenomVal)) {
        returnObj.push([currentDenomName, parseFloat(valueOfCurrentBillsGivenToClient)]);
        if((currentDenomSum == 0) && (change != 0) && currentDenomVal == minDenom) {
          return {status: "INSUFFICIENT_FUNDS", change: []};
        }
        if(change === 0) {
          return {status: "OPEN", change: returnObj};
        }
        break;
      }
    }
  }
  return {status: "OPEN", change: returnObj};
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
