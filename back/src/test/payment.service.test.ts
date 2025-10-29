import { test, expect, describe, beforeEach } from 'vitest';

import { computeBackedMoneyLogic, resetFund } from '../services/payment.service';

beforeEach(() => {
    resetFund();
});

describe('computeBackedMoneyLogic', () => {

    test('Bill 10, Paid 20 -> should return one 10 bill', () => {
        
        const bill = 10;
        const paid = 20;

        const expectedChange = [ 
            {price: 0.01, quantity: 0}, {price: 0.02, quantity: 0},
            {price: 0.05, quantity: 0}, {price: 0.1, quantity: 0},
            {price: 0.2, quantity: 0}, {price: 0.5, quantity: 0},
            {price: 1, quantity: 0}, {price: 2, quantity: 0},
            {price: 5, quantity: 0}, 
            {price: 10, quantity: 1},
            {price: 20, quantity: 0}, {price: 50, quantity: 0},
            {price: 100, quantity: 0}, {price: 200, quantity: 0},
            {price: 500, quantity: 0},
        ];
        
        const result = computeBackedMoneyLogic(bill, paid);
        
        expect(result).toEqual(expectedChange);
    });

    test('Bill 20, Paid 10 -> should throw "Paid total is less than bill amount."', () => {
        
        const bill = 20;
        const paid = 10;
        
        const action = () => computeBackedMoneyLogic(bill, paid);
        
        expect(action).toThrow("Paid total is less than bill amount.");
    });
});