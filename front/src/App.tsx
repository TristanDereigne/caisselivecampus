import './App.css'
import { createEffect, createResource, createSignal, For } from 'solid-js';
import getBackedMoney from './services/payment';

function App(){
    const [paidTotal, setPaidTotal]     = createSignal(0);
    const [billAmount, setBillAmount]   = createSignal(0);
    
    function addToPaidTotal(amount: number){setPaidTotal(paidTotal() + amount);};
    function resetPaidTotal(){setPaidTotal(0);};
    function handleSubmit(e: Event){
        e.preventDefault();
        // setBillAmount(billAmount());
        submitPayment();
    };
    async function submitPayment(){
        let backed_money : Array<{price: number, quantity: number}> = await getBackedMoney(billAmount(), paidTotal());

        return backed_money;
    };

    const [backedMoney] = createResource(() => [billAmount, paidTotal], submitPayment);

    createEffect(() => {console.log(`Bill amount updated : ${billAmount()}.`);});

    return(<>
        <h1 class='text-3xl text-white font-bold'>Caisse enregistreuse simulator 1995</h1>
        <br/>
        <h2 class='text-xl text-white font-semibold mb-2'>Somme à régler</h2>
        <form action="" onSubmit={handleSubmit}>
            <input
                type="number"
                class='p-2 rounded-md text-black w-full mb-4'
                placeholder='Montant à régler'
                value={billAmount()}
                onInput={(e) => setBillAmount(parseFloat(e.currentTarget.value))}
            />
            <h2 class='text-xl text-white font-semibold mb-2'>Règlement en espèce</h2>
            <div class='flex flex-col gap-2'>
                <div class='flex flex-row gap-2'>
                    <button type="button" onClick={() => addToPaidTotal(0.01)}>1 cent</button>
                    <button type="button" onClick={() => addToPaidTotal(0.02)}>2 cents</button>
                    <button type="button" onClick={() => addToPaidTotal(0.05)}>5 cents</button>
                </div>
                <div class='flex flex-row gap-2'>
                    <button type="button" onClick={() => addToPaidTotal(0.1)}>10 cents</button>
                    <button type="button" onClick={() => addToPaidTotal(0.2)}>20 cents</button>
                    <button type="button" onClick={() => addToPaidTotal(0.5)}>50 cents</button>
                </div>
                <div class='flex flex-row gap-2'>
                    <button type="button" onClick={() => addToPaidTotal(1)}>1 euro</button>
                    <button type="button" onClick={() => addToPaidTotal(2)}>2 euros</button>
                    <button type="button" onClick={() => addToPaidTotal(5)}>5 euros</button>
                </div>
                <div class='flex flex-row gap-2'>
                    <button type="button" onClick={() => addToPaidTotal(10)}>10 euros</button>
                    <button type="button" onClick={() => addToPaidTotal(20)}>20 euros</button>
                    <button type="button" onClick={() => addToPaidTotal(50)}>50 euros</button>
                </div>
                <div class='flex flex-row gap-2'>
                    <button type="button" onClick={() => addToPaidTotal(100)}>100 euros</button>
                    <button type="button" onClick={() => addToPaidTotal(200)}>200 euros</button>
                    <button type="button" onClick={() => addToPaidTotal(500)}>500 euros</button>
                </div>
                <div class='flex flex-row gap-2 w-full'>
                    <button class='text-black bg-white'>
                        Total : {paidTotal().toFixed(2)} euros
                    </button>
                    <button type="submit">Valider</button>
                    <button type="reset" onClick={() => resetPaidTotal()}>Annuler</button>
                </div>
            </div>
            <div id='backed-money-summary' class='text-white'>
                <h2 class='text-xl text-white font-semibold mb-2 mt-4'>Monnaie à rendre</h2>
                <For each={backedMoney() ? backedMoney()! : []} fallback={<div>Loading...</div>}>
                    {(item) => <p>{item.price} * {item.quantity}</p>}
                </For>
            </div>
        </form>
    </>)
}

export default App