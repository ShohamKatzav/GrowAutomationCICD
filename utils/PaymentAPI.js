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

    createForm(data) {
        const form = new FormData();
        form.set('pageCode', data.pageCode);
        form.set('userId', data.userId);
        form.set('sum', data.sum);
        form.set('paymentNum', data.paymentNum);
        form.set('description', data.description);
        form.set('pageField[fullName]', data.fullName);
        form.set('pageField[phone]', data.phone);
        form.set('pageField[email]', data.email);
        return form;
    }


}

module.exports = { PaymentAPI };