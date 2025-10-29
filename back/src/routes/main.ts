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
    console.log("bill", bill_amount, "paid_total", paid_total)
    let difference = paid_total - bill_amount;

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
            if(money) {
            let   rest  = difference;

            console.log("fond de caisse restant", cash_withdrawer_fund)
            console.log("ligne de fond de caisse", cash_withdrawer_fund[i])
            console.log("reste avant calcule", rest)

            // Skipping empty fund
            if(money.quantity <= 0){console.log("plus d'argent sur la ligne");continue;}

            // Skipping unusable money
            if(rest < money.price){console.log(rest, "reste inférieur à la ligne de", money.price);continue;};

            // Distributing the change
            while(rest >= money.price && money.quantity > 0){
                rest -= money.price;
                difference = rest;
                refund_money[i].quantity++;
                cash_withdrawer_fund[i].quantity--;
            };
            console.log("reste restant après calcul", rest);
            if(rest == 0) {break;}
            }

            console.log("combien on rends pour l'instant",refund_money[i])
        };
        
        console.log("monnaie à rendre", refund_money)

        return res.status(200).json({backed_money: refund_money});
    }
});

export default router;