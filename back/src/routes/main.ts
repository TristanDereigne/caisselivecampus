import express from 'express';
import { computeBackedMoneyLogic } from '../services/payment.service';

const router = express.Router();

router.post('/compute_backed_money', async (req, res) => {
    const {bill_amount, paid_total} = req.body;

    try {
        const backed_money = computeBackedMoneyLogic(bill_amount, paid_total);
        return res.status(200).json({backed_money: backed_money});
    } catch (error) {
        if (error.message === "Paid total is less than bill amount.") {
            return res.status(400).json({error: error.message});
        }
        return res.status(500).json({error: "An unexpected error occurred."});
    }
});

export default router;