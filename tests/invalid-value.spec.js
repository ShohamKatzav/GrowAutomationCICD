// @ts-check
import { test, expect } from '@playwright/test';

test('API payment', async ({ request }) => {

  const url = "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess"

  const form = new FormData();
  form.set('pageCode', 'e19e0b687744');
  form.set('userId', '52e95954cd5c1311');
  form.set('sum', '0');
  form.set('paymentNum', '1');
  form.set('description', 'ORDER123');
  form.set('pageField[fullName]', 'שם מלא');
  form.set('pageField[phone]', '0523292847');
  form.set('pageField[email]', 'shohamkatzav95@gmail.com');
  const response = await request.post(url, {
    form
  });

  const result = await response.json();
  const message = result.err.message;
  await expect(message).toEqual("לא ניתן לשלם בסכום הנמוך מ- 0");
});