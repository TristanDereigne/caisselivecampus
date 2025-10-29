const getInitialFund = () => [
    {price: 0.01, quantity: 1000}, {price: 0.02, quantity: 1000},
    {price: 0.05, quantity: 1000}, {price: 0.10, quantity: 1000},
    {price: 0.20, quantity: 1000}, {price: 0.50, quantity: 1000},
    {price: 1.00, quantity: 1000}, {price: 2.00, quantity: 1000},
    {price: 5.00, quantity: 1000}, {price: 10.00, quantity: 1000},
    {price: 20.00, quantity: 1000}, {price: 50.00, quantity: 1000},
    {price: 100.00, quantity: 1000}, {price: 200.00, quantity: 1000},
    {price: 500.00, quantity: 1000}
];

let cash_withdrawer_fund = getInitialFund();

export function resetFund() {
    cash_withdrawer_fund = getInitialFund();
}

export function computeBackedMoneyLogic(bill_amount: number, paid_total: number) {

    let difference = parseFloat((paid_total - bill_amount).toFixed(2));

    if(difference < 0){
        throw new Error("Paid total is less than bill amount.");
    }

    const refund_money = getInitialFund().map(item => ({ ...item, quantity: 0 }));

    for(let i = cash_withdrawer_fund.length - 1; i >= 0; i--){
        const money = cash_withdrawer_fund[i];
        
        if (difference < money.price || money.quantity <= 0) {
            continue;
        }

        const potentialQuantity = Math.floor(difference / money.price);

        const quantityToGive = Math.min(potentialQuantity, money.quantity);

        if (quantityToGive > 0) {
            difference -= quantityToGive * money.price;
            difference = parseFloat(difference.toFixed(2));

            refund_money[i].quantity = quantityToGive;

            cash_withdrawer_fund[i].quantity -= quantityToGive;
        }

        if(difference === 0) {
            break;
        }
    }
    
    if (difference > 0) {
        console.warn(`Impossible de rendre la monnaie exacte. Reste: ${difference}`);
    }

    return refund_money;
}