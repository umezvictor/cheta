const modal = document.getElementById('itemModal');

window.addEventListener('click', outsideClick);

function outsideClick(e){
//TARGET must be modal
if(e.target === modal){
    modal.style.display = 'none';
}
}
