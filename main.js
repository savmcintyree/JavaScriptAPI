const apiUrl = 'http://api.coinlayer.com/api/live';
const accessKey = '5e4a4e98607c94c045e742d8c27e666f';

function fetchCryptoPrices() {
  const url = `${apiUrl}?access_key=${accessKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      
      if (data.success) {
        const prices = data.rates;
        const cryptoPricesElement = document.getElementById('crypto-prices');
        const searchInput = document.getElementById('search-input');

        
        cryptoPricesElement.innerHTML = '';

        
        const filteredCryptos = Object.keys(prices).filter(crypto =>
          crypto.toLowerCase().includes(searchInput.value.toLowerCase())
        );

        
        filteredCryptos.forEach(crypto => {
          const cryptoCard = document.createElement('div');
          cryptoCard.classList.add('crypto-card');

          const cryptoName = document.createElement('h3');
          cryptoName.textContent = crypto;

          const cryptoPrice = document.createElement('p');
          cryptoPrice.textContent = `Price: ${prices[crypto].toFixed(2)}`;

          cryptoCard.appendChild(cryptoName);
          cryptoCard.appendChild(cryptoPrice);
          cryptoPricesElement.appendChild(cryptoCard);
        });
      } else {
        console.error(data.error.type);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

let timeout;
document.getElementById('search-input').addEventListener('input', () => {
  clearTimeout(timeout);
  timeout = setTimeout(fetchCryptoPrices, 500);
});


fetchCryptoPrices();
