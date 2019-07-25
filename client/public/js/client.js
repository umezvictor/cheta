

const publicVapidKey = 'BDMXC0kSXBrhnb0eJKsAP-nQMMNr9eLi97fnZw-jrB6Ys2ndUroWsjcScM0kqaL0aoQDLbyucM2uqIAE3I6TYYE';


//check for service worker
if('serviceWorker' in navigator){
    send().catch(err => console.error(err));

}

//register serviceworker, register push, send push
async function send(){
    //console.log('registering sw');

    //register sw
    const register = await navigator.serviceWorker.register('/custom-service-worker.js', {
        scope: '/'
    });
   // console.log('sw registered');

    //register push
    //console.log('registring push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)

    });
   // console.log('push registered');

    //send push notification  
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });  

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
  