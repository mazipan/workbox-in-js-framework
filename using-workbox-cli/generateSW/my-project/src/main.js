import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(reg => {
      console.log('Service Worker has been registered');
    })
    .catch(e =>
      console.error('Error during service worker registration:', e)
    );
} else {
  console.warn('Service Worker is not supported');
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
