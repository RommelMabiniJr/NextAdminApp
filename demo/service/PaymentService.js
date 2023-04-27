// 
export const PaymentService = {
    async getPaymentsSmall() {
        const res = await fetch('/demo/data/payments-small.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data;
    },
};
