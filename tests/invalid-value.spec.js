import { test, expect, request } from '@playwright/test';
const { PaymentAPI } = require('../utils/PaymentAPI');
const { orderData, url } = JSON.parse(JSON.stringify(require('../utils/orderData.json')));

let paymentAPI;
let response;

test.beforeEach(async () => {
  const apiContext = await request.newContext();
  paymentAPI = new PaymentAPI(apiContext);
});

test.describe.configure({ mode: 'parallel' });

test('API @invalid sum payment', async () => {
  const invalidSumOrder = { ...orderData, sum: 0 };
  const form = paymentAPI.createOrderForm(invalidSumOrder);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  await expect(message?.includes("לא ניתן לשלם בסכום הנמוך מ- 0")).toBeTruthy();
});

test('API @invalid userId payment', async () => {
  const invalidUserIdOrder = { ...orderData, userId: "-" };
  const form = paymentAPI.createOrderForm(invalidUserIdOrder);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  await expect(message?.includes("פרמטר קוד זיהוי אינו תקין userId")).toBeTruthy();
});

test('API @invalid paymentNum payment', async () => {
  const invalidPaymentNumOrder = { ...orderData, paymentNum: 0 };
  const form = paymentAPI.createOrderForm(invalidPaymentNumOrder);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  await expect(message?.includes("תשלומים")).toBeTruthy();
});

test('API @invalid fullname payment', async () => {
  const invalidFullnameOrder = { ...orderData, fullName: "" };
  const form = paymentAPI.createOrderForm(invalidFullnameOrder);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  await expect(message?.includes("שם וטלפון או שאינו תקין")).toBeTruthy();
});

test('API @invalid phone payment', async () => {
  const invalidPhoneOrder = { ...orderData, phone: "abc" };
  const form = paymentAPI.createOrderForm(invalidPhoneOrder);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  await expect(message?.includes("שם וטלפון או שאינו תקין")).toBeTruthy();
});

