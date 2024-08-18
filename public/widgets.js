document.addEventListener('alpine:init', () => {
    Alpine.data('bootcampWidgets', () => ({
        sentence: '',
        wordStats: {},
        bill: '',
        phoneBillTotal: null,
        usage: '',
        available: null,
        airtimeResult: null,
        callPrice: 2.75,
        smsPrice: 0.65,

        async fetchWordStats() {
            try {
                const response = await fetch(`http://localhost:3000/api/word_game?sentence=${encodeURIComponent(this.sentence)}`);
                const data = await response.json();
                this.wordStats = data;
            } catch (error) {
                console.error('Error fetching word stats:', error);
            }
        },

        async calculatePhoneBill() {
            try {
                const response = await fetch('http://localhost:3000/api/phonebill/total', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ bill: this.bill }),
                });
                const data = await response.json();
                this.phoneBillTotal = data.total;
            } catch (error) {
                console.error('Error calculating phone bill:', error);
            }
        },

        async setPrice(type) {
            try {
                const price = type === 'call' ? this.callPrice : this.smsPrice;
                const response = await fetch('http://localhost:3000/api/phonebill/price', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ type, price }),
                });
                const data = await response.json();
                console.log(data.message);
            } catch (error) {
                console.error(`Error setting ${type} price:`, error);
            }
        },

        async checkAirtime() {
            try {
                const response = await fetch('http://localhost:3000/api/enough', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usage: this.usage, available: this.available }),
                });
                const data = await response.json();
                this.airtimeResult = data.result;
            } catch (error) {
                console.error('Error checking airtime:', error);
            }
        },
    }));
});
