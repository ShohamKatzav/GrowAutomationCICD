const { test, expect, request } = require("@playwright/test");
const { PaymentAPI } = require('../utils/PaymentAPI');
const orderData = JSON.parse(JSON.stringify(require('../utils/orderData.json')));
const paymentData = JSON.parse(JSON.stringify(require('../utils/paymentData.json')));
const { PaymentConfirmationPage } = require('../page-objects/PaymentConfirmationPage');

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const paymentAPI = new PaymentAPI(apiContext);
  const form = paymentAPI.createForm(orderData);
  response = await paymentAPI.createPayment(orderData.url, form);
});

test('API payment', async ({ page }) => {
  await expect(response.ok()).toBeTruthy();
  const resultData = await response.json();
  const paymentUrl = resultData.data.url;
  const paymentConfirmationPage = new PaymentConfirmationPage(page);
  await paymentConfirmationPage.navigateToPaymentPage(paymentUrl);

  await paymentConfirmationPage.fillPaymentDetails(paymentData.validCard);
  await expect(paymentConfirmationPage.getPersonalIdInputLocator()).toBeDisabled();
  const confirmationMessage = await paymentConfirmationPage.submitPayment();
  await expect(confirmationMessage).toContainText("חיוב בוצע בהצלחה");
});