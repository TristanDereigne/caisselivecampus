export default async function getBackedMoney(bill_amount: number, paid_total: number): Promise<Array<{price: number, quantity: number}>> {
    let backed_money: Array<{price: number, quantity: number}> = [];

    try{
        console.log(`getBackedMoney, ${bill_amount}, ${paid_total}`);
        const response = await fetch(
            'http://localhost:2012/compute_backed_money',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bill_amount,
                    paid_total
                })
            }
        );

        backed_money = await response.json();
    }
    catch(error){console.log("FOIRÉ !!!");};

    return backed_money;
};