export default async function getBackedMoney(bill_amount: number, paid_total: number): Promise<Array<{price: number, quantity: number}>> {
    let backed_money: Array<{price: number, quantity: number}> = [];

    try{
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
        const data = await response.json();
        backed_money = data.backed_money;
    }
    catch(error){console.error("Erreur backend", error);};


    return backed_money;
};