class PaymentConfirmationPage {
    constructor(page) {
        this.page = page;
        this.paymentFormFrame = page.frameLocator("[class*='product-open']");
        this.cardNumberInput = this.paymentFormFrame.locator("#card-number");
        this.expYearSelect = this.paymentFormFrame.locator("select#expYear");
        this.expMonthSelect = this.paymentFormFrame.locator("select#expMonth");
        this.cvvInput = this.paymentFormFrame.locator("#cvv");
        this.personalIdInput = this.paymentFormFrame.locator("#personal-id");
        this.submitButton = this.paymentFormFrame.locator("[type='submit']");
        this.confirmationMessage = page.locator(".product");
    }

    async navigateToPaymentPage(paymentUrl) {
        await this.page.goto(paymentUrl);
    }

    async fillPaymentDetails(card) {
        await this.cardNumberInput.fill(card.number);
        await this.expYearSelect.selectOption(card.exp_year);
        await this.expMonthSelect.selectOption(card.exp_month);
        await this.cvvInput.fill(card.cvc);
    }

    async submitPayment() {
        await this.submitButton.click();
        return this.confirmationMessage;
    }

    getPersonalIdInputLocator() {
        return this.personalIdInput;
    }
}

module.exports = { PaymentConfirmationPage };