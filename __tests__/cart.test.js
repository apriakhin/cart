// @ts-check

import {
  test,
  expect,
  beforeEach,
  describe,
  it,
} from '@jest/globals';
import cart from '../index.js';

beforeEach(() => {
  cart.items = [];
  cart.total = 0;
  cart.isPromo = false;
});

describe('addItem', () => {
  it('add one item', () => {
    cart.addItem('apple', 100, 2);
    expect(cart.items[0].name).toBe('apple');
    expect(cart.items[0].price).toBe(100);
    expect(cart.items[0].quantity).toBe(2);
    expect(cart.total).toBe(200);
  });

  it('add two same items', () => {
    cart.addItem('apple', 100, 2);
    cart.addItem('apple', 100, 3);
    expect(cart.items[0].name).toBe('apple');
    expect(cart.items[0].price).toBe(100);
    expect(cart.items[0].quantity).toBe(5);
    expect(cart.items[1]).toBeUndefined();
    expect(cart.total).toBe(500);
  });

  it('add two different items', () => {
    cart.addItem('apple', 100, 2);
    cart.addItem('orange', 150, 1);
    expect(cart.items[0].name).toBe('apple');
    expect(cart.items[0].price).toBe(100);
    expect(cart.items[0].quantity).toBe(2);
    expect(cart.items[1].name).toBe('orange');
    expect(cart.items[1].price).toBe(150);
    expect(cart.items[1].quantity).toBe(1);
    expect(cart.total).toBe(350);
  });
});

test('removeItem', () => {
  cart.addItem('apple', 100, 2);
  cart.addItem('orange', 150, 1);
  cart.addItem('lemon', 50, 3);
  cart.removeItem('apple');
  expect(cart.items.length).toBe(2);
  expect(cart.total).toBe(300);
});

test('updateQuantity', () => {
  cart.addItem('apple', 100, 2);
  cart.addItem('orange', 150, 1);
  cart.addItem('lemon', 50, 3);
  cart.updateQuantity('orange', 3);
  expect(cart.items[1].quantity).toBe(3);
  expect(cart.total).toBe(800);
});

test('clearCart', () => {
  cart.addItem('apple', 100, 2);
  cart.addItem('orange', 150, 1);
  cart.addItem('lemon', 50, 3);
  cart.clearCart();
  expect(cart.items.length).toBe(0);
  expect(cart.total).toBe(0);
});

describe('applyDiscount', () => {
  it('promocode is valid', () => {
    cart.addItem('apple', 100, 2);
    cart.addItem('orange', 150, 1);
    cart.addItem('lemon', 50, 3);
    cart.applyDiscount('HEXLET');
    expect(cart.isPromo).toBeTruthy();
    expect(cart.total).toBe(450);
  });

  it('promocode is invalid', () => {
    cart.addItem('apple', 100, 2);
    cart.addItem('orange', 150, 1);
    cart.addItem('lemon', 50, 3);
    cart.applyDiscount('HEXET');
    expect(cart.isPromo).toBeFalsy();
    expect(cart.total).toBe(500);
  });

  it('add item after apply promocode', () => {
    cart.addItem('apple', 100, 2);
    cart.addItem('orange', 150, 1);
    cart.applyDiscount('HEXLET');
    cart.addItem('lemon', 50, 3);
    expect(cart.isPromo).toBeTruthy();
    expect(cart.total).toBe(450);
  });
});
