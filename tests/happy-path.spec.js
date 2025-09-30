// @ts-check
import { test, expect } from '@playwright/test';

test('API payment', async ({ request, page }) => {

  const url = "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess"

  const form = new FormData();
  form.set('pageCode', 'e19e0b687744');
  form.set('userId', '52e95954cd5c1311');
  form.set('sum', '1');
  form.set('paymentNum', '1');
  form.set('description', 'ORDER123');
  form.set('pageField[fullName]', 'שם מלא');
  form.set('pageField[phone]', '0523292847');
  form.set('pageField[email]', 'shohamkatzav95@gmail.com');
  const response = await request.post(url, {
    form
  });

  expect(response.ok()).toBeTruthy();
  const result = await response.json();
  const paymentUrl = result.data.url;
  await page.goto(paymentUrl);
  await expect(page.locator(".payments-description span").first()).toContainText("סה״כ לתשלום");

  const iframe = page.frameLocator("[class*='product-open']");
  await iframe.locator("#card-number").fill("4580458045804580");
  const yearDropDown = iframe.locator("select#expYear");
  await yearDropDown.selectOption("2030");
  const monthDropDown = iframe.locator("select#expMonth");
  await monthDropDown.selectOption("03");
  await iframe.locator("#cvv").fill("123");
  const idInput = iframe.locator("#personal-id");
  await expect(idInput).toBeDisabled();
  await iframe.locator("[type='submit']").click();

  const confirmationMessage = page.locator(".product");
  await expect(confirmationMessage).toContainText("חיוב בוצע בהצלחה");
});