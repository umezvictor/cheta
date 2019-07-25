//handle push event
self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push received...');
  self.registration.showNotification(data.title, {
    body: 'A gentle reminder',
     icon: 'http://image.ibb.com/frYOFd/tmlogo.png'
  });
});