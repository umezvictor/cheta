//this eventlistener handles the push event
//this file is referenced in default serviceWorker.js
self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push received...');
  //data.title is the payload in the subscribe route in server.js at the backend
  self.registration.showNotification(data.title, {
    body: 'A gentle reminder'
     });
});