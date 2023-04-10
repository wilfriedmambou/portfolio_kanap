//Récupération du numéro de commande depuis l'url 
function getconfirmationId(){
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id")
}
let confirmationId = getconfirmationId()

//affiche le numéro de commande 
commandNumber = document.getElementById("orderId")
commandNumber.innerText = confirmationId