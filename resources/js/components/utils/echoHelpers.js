import Echo from 'laravel-echo'

export const echoInit = (token) => {

  window.Pusher = require('pusher-js');

  window.Echo = new Echo({
      broadcaster: 'pusher',
      key: process.env.MIX_PUSHER_APP_KEY,
      wsHost: window.location.hostname,
      wsPort: 6001,
      disableStats: true,
      forceTLS: false
  });

  window.Echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + token
  window.Echo.options.auth = {
    headers: {
        Authorization: 'Bearer ' + token,
    },
  }

  window.Echo.join('chat');

}