import { test, expect, request } from '@playwright/test';
const { PaymentAPI } = require('../utils/PaymentAPI');
const { PaymentConfirmationPage } = require('../page-objects/PaymentConfirmationPage');
const { orderData, url } = JSON.parse(JSON.stringify(require('../utils/orderData.json')));
const { validCard } = JSON.parse(JSON.stringify(require('../utils/paymentData.json')));

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const paymentAPI = new PaymentAPI(apiContext);
  const form = paymentAPI.createOrderForm(orderData);
  response = await paymentAPI.createPayment(url, form);
});

test('API @happy payment', async ({ page }) => {
  await expect(response.ok()).toBeTruthy();
  const resultData = await response.json();
  const paymentUrl = resultData.data.url;
  const paymentConfirmationPage = new PaymentConfirmationPage(page);
  await paymentConfirmationPage.navigateToPaymentPage(paymentUrl);

  await paymentConfirmationPage.fillPaymentDetails(validCard);
  await expect(paymentConfirmationPage.getPersonalIdInputLocator()).toBeDisabled();
  const confirmationMessage = await paymentConfirmationPage.submitPayment();
  await expect(confirmationMessage).toContainText("חיוב בוצע בהצלחה");
});