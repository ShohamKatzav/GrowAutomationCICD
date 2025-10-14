class PaymentAPI {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async createPayment(url, form) {
        try {
            const response = await this.apiContext.post(url,
                { form: form }
            );
            return response;
        } catch (error) {
            throw new Error(`Payment creation failed: ${error.message}`);
        }
    }

    createOrderForm(data) {
        const form = new FormData();
        form.append('pageCode', data.pageCode);
        form.append('userId', data.userId);
        form.append('sum', data.sum);
        form.append('paymentNum', data.paymentNum);
        form.append('description', data.description);
        form.append('pageField[fullName]', data.fullName);
        form.append('pageField[phone]', data.phone);
        form.append('pageField[email]', data.email);
        return form;
    }

}

module.exports = { PaymentAPI };