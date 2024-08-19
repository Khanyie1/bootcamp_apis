// import axios from 'axios';
document.addEventListener("alpine:init", () => {
    Alpine.data('data', () => {
        return {
            bill: '',
            result: null,
            type: '',
            callPrice: 2.75,
            smsPrice: 0.65,
            updateResult: null,
            
            async calculateTotal() {
                try {
                    const response = await axios.post('http://localhost:3008/api/Khanyie/phonebill/total', {
                        bill: this.bill
                    });
                    this.result = response.data;
                } catch (error) {
                    console.error(error);
                }
            },

            async updatePrices() {
                try {
                    const response = await axios.post('http://localhost:3008/api/Khanyie/phonebill/price', {
                        type: this.type,
                        price: this.callPrice
                    });
                    this.updateResult = response.data;
                    
                    const response2 = await axios.post('http://localhost:3008/api/Khanyie/phonebill/price', {
                        type: this.type,
                        price: this.smsPrice
                    });
                    this.updateResult = response2.data;
                } catch (error) {
                    console.error(error);
                }
            },

            sentence: '',
            sentenceResult: null,

            async analyzeSentence() {
                try {
                    const response = await axios.get(`http://localhost:3008/api/Khanyie/word_game?sentence=${this.sentence}`);
                    this.sentenceResult = response.data;
                } catch (error) {
                    console.error(error);
                }
            },

            usage: '',
            available: 0,
            result2: null,

            async checkAirtime() {
                try {
                    const response = await axios.post('http://localhost:3008/api/Khanyie/enough', {
                        usage: this.usage,
                        available: this.available
                    });
                    this.result2 = response.data;
                } catch (error) {
                    console.error(error);
                }
            }
        }
    });
});
