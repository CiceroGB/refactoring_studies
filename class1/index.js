const axios = require('axios');

axios.get('https://www.webmotors.com.br/api/search/car?url=https://www.webmotors.com.br/carros/estoque?&actualPage=3&order=1&showMenu=false&showCount=true&showBreadCrumb=false&testAB=true&returnUrl=false')
    .then(resp => {

        console.log(resp);
    });