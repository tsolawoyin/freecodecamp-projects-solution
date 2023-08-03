const currency = {
    "ONE HUNDRED": 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    ONE: 1,
    QUARTER: 0.25,
    DIME: 0.1,
    NICKEL: 0.05,
    PENNY: 0.01,
}
  
function checkCashRegister(price, cash, cid) {
    const currencyQty = new Map,
        availableCash = new Map,
        change = cash - price
    // create a map of currency to the qty in whole number
    for (let [curr, amt] of cid.reverse()) {
        let qty = Math.floor( amt / currency[curr] )
        currencyQty.set(curr, qty)
    } 
    // create a map of currency to the cash availabe
    for (let [curr, amt] of cid.reverse()) {
        availableCash.set(curr, amt)
    } 


    let changeInfo = calcChange(change, currencyQty, availableCash)

    let isChangeLeft = checkCID(changeInfo.cid)

    return changeStatus(changeInfo, isChangeLeft, cid)
    
}
  
function changeStatus({change, listOfChange, cid}, isChangeLeft, oldCID) {
    if (change <= 0 && !isChangeLeft) {
        return {status: "CLOSED", change: oldCID}
    } else if (change > 0) {
        return {status: "INSUFFICIENT_FUNDS", change: []}
    } else if (change <= 0 && isChangeLeft) {
        return {status: "OPEN", change: listOfChange}
    }
}
  
function checkCID(cid) {
    return ![...cid.values()].every(e => e == 0)
}
  
function calcChange(change, currQty, cid) {
    const listOfChange = []
    
    for (let curr of Object.keys(currency)) {
        if (isValid(change, currency[curr])) {
            let theoriticalChange = Math.floor(change / currency[curr]) // possible amount we might give out if we have enough change in that currency
            // the next thing we will do normally is look up the drawer to see if we have enough change in said currency
            let amountInDrawer = currQty.get(curr)

            // this line gives out the change and update should update the cid as well. 
            if (theoriticalChange <= amountInDrawer) {
                change = (change - (theoriticalChange * currency[curr])).toFixed(2)
                listOfChange.push([curr, theoriticalChange * currency[curr]])
                let remainingCash = cid.get(curr) - (theoriticalChange * currency[curr])
                cid.set(curr, remainingCash)
            } else if(theoriticalChange > amountInDrawer) {
                change = (change - (amountInDrawer * currency[curr])).toFixed(2)
                listOfChange.push([curr, amountInDrawer * currency[curr]])
                let remainingCash = cid.get(curr) - (amountInDrawer * currency[curr])
                cid.set(curr, remainingCash)
            }
        } 
    }
    
    return {change, listOfChange, cid}
}
  
function isValid(change, curr) {
    return Math.floor(change / curr) >= 1
}
  
// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);


// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])

// checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])


checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  