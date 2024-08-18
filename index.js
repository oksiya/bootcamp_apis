import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let callPrice = 2.75;
let smsPrice = 0.65;

// Utility function to analyze a sentence
const analyzeSentence = (sentence) => {
    const words = sentence.split(' ').filter(word => word.length > 0);
    const longestWord = words.reduce((a, b) => a.length > b.length ? a : b, '');
    const shortestWord = words.reduce((a, b) => a.length < b.length ? a : b, words[0] || '');
    const sum = words.reduce((acc, word) => acc + word.length, 0);

    return {
        longestWord: longestWord.length,
        shortestWord,
        sum
    };
};



function longestWord(sentence){
    let longest = '';
    for(let i=0;i<sentence.length+1;i++){
      if(sentence[i+1] !== undefined){
        console.log(sentence[i]+', '+sentence[i+1])
         if(sentence[i].length > sentence[i+1].length){
           longest = sentence[i];
           sentence[i] = sentence[i+1];
           sentence[i+1] = longest;
            
         }else{
              longest = sentence[i+1];
         }
      }
    
    }
    return longest;
  }
  
  function shortestWord(sentence){
    let shortest = '';
    for(let i=0;i<sentence.length+1;i++){
      if(arsentencer[i+1] !== undefined){
         if(sentence[i].length < sentence[i+1].length){
           shortest = sentence[i];
           sentence[i] = sentence[i+1];
           sentence[i+1] = shortest;
            
         }else{
              shortest = sentence[i+1];
         }
      }
    
    }
    return shortest;
  }
  
  function wordLengths(sentence){
    let sum = 0;
    for(let i = 0; i < sentence.length; i++){
        sum += sentence[i].length;
    }
    return sum;
  }


// Utility function to calculate phone bill
const calculatePhoneBill = (bill) => {
    const items = bill.split(',');
    let total = 0;
    for (const item of items) {
        if (item === 'call') {
            total += callPrice;
        } else if (item === 'sms') {
            total += smsPrice;
        }
    }
    return total.toFixed(2);
};

// Utility function to check if enough airtime is available
const enoughAirtime = (usage, available) => {
    const total = calculatePhoneBill(usage);
    const result = available - total;
    return result.toFixed(2);
};

// Words Widget API
app.get('/api/word_game', (req, res) => {
    const { sentence } = req.query;
    const analysis = analyzeSentence(sentence);
    res.json(analysis);
});

// Total Phone Bill API
app.post('/api/phonebill/total', (req, res) => {
    const { bill } = req.body;
    const total = calculatePhoneBill(bill);
    res.json({ total });
});

app.get('/api/phonebill/prices', (req, res) => {
    res.json({ call: callPrice, sms: smsPrice });
});

app.post('/api/phonebill/price', (req, res) => {
    const { type, price } = req.body;
    if (type === 'call') {
        callPrice = parseFloat(price);
    } else if (type === 'sms') {
        smsPrice = parseFloat(price);
    }

    res.json({
        status: 'success',
        message: `The ${type} price was set to ${price}`,
    });
});

// Enough Airtime API
app.post('/api/enough', (req, res) => {
    const { usage, available } = req.body;
    const result = enoughAirtime(usage, available);
    res.json({ result });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
