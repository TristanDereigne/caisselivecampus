import express from 'express';

const router = express.Router();

let cash_withdrawer_fund : Array<{price: number, quantity: number}> = [
    {price: 0.01, quantity: 1000},
    {price: 0.02, quantity: 1000},
    {price: 0.05, quantity: 1000},
    {price: 0.10, quantity: 1000},
    {price: 0.20, quantity: 1000},
    {price: 0.50, quantity: 1000},
    {price: 1.00, quantity: 1000},
    {price: 2.00, quantity: 1000},
    {price: 5.00, quantity: 1000},
    {price: 10.00, quantity: 1000},
    {price: 20.00, quantity: 1000},
    {price: 50.00, quantity: 1000},
    {price: 100.00, quantity: 1000},
    {price: 200.00, quantity: 1000},
    {price: 500.00, quantity: 1000}
];

router.post('/compute_backed_money', async (req, res) => {
    const {bill_amount, paid_total} = req.body;
    const difference = paid_total - bill_amount;

    if(difference < 0){
        return res.status(400).json({error: "Paid total is less than bill amount."});
    }
    else{
        let refund_money : Array<{price: number, quantity: number}> = [
            {price: 0.01, quantity: 0},
            {price: 0.02, quantity: 0},
            {price: 0.05, quantity: 0},
            {price: 0.10, quantity: 0},
            {price: 0.20, quantity: 0},
            {price: 0.50, quantity: 0},
            {price: 1.00, quantity: 0},
            {price: 2.00, quantity: 0},
            {price: 5.00, quantity: 0},
            {price: 10.00, quantity: 0},
            {price: 20.00, quantity: 0},
            {price: 50.00, quantity: 0},
            {price: 100.00, quantity: 0},
            {price: 200.00, quantity: 0},
            {price: 500.00, quantity: 0}
        ];

        for(let i = cash_withdrawer_fund.length - 1; i >= 0; i--){
            const money = cash_withdrawer_fund[i];
            let   rest  = difference;

            // Skipping empty fund
            if(money.quantity <= 0){continue;}

            // Skipping unusable money
            if(rest < money.price){continue;};

            // Distributing the change
            while(rest >= money.price && money.quantity > 0){
                rest -= money.price;
                refund_money[i].quantity++;
            };
        };
        return res.json({backed_money: difference});
    }
});

export default router;