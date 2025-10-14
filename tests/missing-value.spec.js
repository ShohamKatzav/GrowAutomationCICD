import { test, expect, request } from '@playwright/test';
const { PaymentAPI } = require('../utils/PaymentAPI');
const { orderData, url } = JSON.parse(JSON.stringify(require('../utils/orderData.json')));

let paymentAPI;
let response;

test.beforeEach(async () => {
  const apiContext = await request.newContext();
  paymentAPI = new PaymentAPI(apiContext);
});


test('API @missing sum payment', async () => {
  const { sum, ...orderWithoutSum } = orderData;
  const form = paymentAPI.createOrderForm(orderWithoutSum);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  console.log(message);
  await expect(message.includes("לא ניתן לשלם בסכום הנמוך מ- 0")).toBeTruthy();
});

test('API @missing userId payment', async () => {
  const { userId, ...orderWithoutUserId } = orderData;
  const form = paymentAPI.createOrderForm(orderWithoutUserId);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  console.log(message);
  await expect(message.includes("פרמטר קוד זיהוי אינו תקין userId")).toBeTruthy();
});

test('API @missing paymentNum payment', async () => {
  const { paymentNum, ...orderWithoutPaymentNum } = orderData;
  const form = paymentAPI.createOrderForm(orderWithoutPaymentNum);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  console.log(message);
  await expect(message.includes("תשלומים")).toBeTruthy();
});

test('API @missing fullname payment', async () => {
  const { fullName, ...orderWithoutFullName } = orderData;
  const form = paymentAPI.createOrderForm(orderWithoutFullName);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  console.log(message);
  await expect(message.includes("לא נשלח שם וטלפון")).toBeTruthy();
});

test('API @missing phone payment', async () => {
  const { phone, ...orderWithoutPhone } = orderData;
  const form = paymentAPI.createOrderForm(orderWithoutPhone);
  response = await paymentAPI.createPayment(url, form);
  await expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const message = result.err.message;
  console.log(message);
  await expect(message.includes("לא נשלח שם וטלפון")).toBeTruthy();
});

