import './App.css'
import { createResource, createSignal, For, Show } from 'solid-js';
import getBackedMoney from './services/payment';

function App(){
    const [paidTotal, setPaidTotal]     = createSignal(0);
    const [billAmount, setBillAmount]   = createSignal(0);
    const [paymentData, setPaymentData] = createSignal();
    
    function addToPaidTotal(amount: number){setPaidTotal(paidTotal() + amount);};
    function resetPaidTotal(){setPaidTotal(0);};
    function handleSubmit(e: Event){
        e.preventDefault();
        // setBillAmount(billAmount());
        setPaymentData({bill:billAmount(), payment:paidTotal()})
    };
    
    async function submitPayment(data){

        if (!data) return;
        const backedMoneyResponse = await getBackedMoney(data.bill, data.payment);
        return backedMoneyResponse;

    };

    const [backedMoney] = createResource(() => paymentData(), submitPayment);


    return(<div class='flex flex-col gap-12'>
        <h1 class='text-3xl text-white font-bold'>Caisse enregistreuse simulator 1995</h1>
        <div class='flex flex-col gap-2'>
            <h2 class='text-xl text-white font-semibold mb-2'>Somme à régler</h2>
            <form action="" onSubmit={handleSubmit}>
                <input
                    id="cyBillInput"
                    type="number"
                    class='p-2 rounded-md text-black w-full mb-4'
                    placeholder='Montant à régler'
                    value={billAmount()}
                    onInput={(e) => setBillAmount(parseFloat(e.currentTarget.value))}
                />
                <h2 class='mt-4 text-xl text-white font-semibold mb-2'>Règlement en espèce</h2>
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
                        <button id="cy10EurBtn" type="button" onClick={() => addToPaidTotal(10)}>10 euros</button>
                        <button id="cy20EurBtn" type="button" onClick={() => addToPaidTotal(20)}>20 euros</button>
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
                        <button id="cyValidateBtn" type="submit">Valider</button>
                        <button type="reset" onClick={() => resetPaidTotal()}>Annuler</button>
                    </div>
                </div>
                <div id='backed-money-summary' class='mt-4'>
                    <Show when={!backedMoney.loading} fallback={
                        <>
                            <h2 class='text-xl text-white font-semibold mb-2 mt-4'>Monnaie à rendre</h2>
                            <p>Chargement...</p>
                        </>
                    }>
                        <h2 class='text-xl text-white font-semibold mb-2 mt-4'>Monnaie à rendre</h2>
                        <For each={backedMoney()} fallback={<div class='text-white'>En attente</div>}>
                            {(item) => <p class='item text-white'>{item.price} * {item.quantity}</p>}
                        </For>
                    </Show>
                    <Show when={backedMoney.error}>
                        <>
                            <p class='text-red-500 text-xl font-semibold'> Erreur, le client a peut-être donné trop d'argent </p>
                        </>
                    </Show>
                </div>
            </form>
        </div>
        
    </div>)
}

export default App