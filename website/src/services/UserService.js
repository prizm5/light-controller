import request from 'request';
import when from 'when';
import {USER_URL} from '../constants/UserConstants';
import QuoteActions from '../actions/QuoteActions';
import LoginStore from '../stores/LoginStore.js';

class QuoteService {

  nextQuote() {
    request({
      url: QUOTE_URL,
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.jwt
      }
    })
    .then(function(response) {
      QuoteActions.gotQuote(response);
    });
  }

}

export default new QuoteService()
