//Récupération de contenu du local storage dans un tableau 
const orderedProducts = JSON.parse(window.localStorage.getItem("productToCart"));
//récupération d'un produit depuis l'API par son id 
async function getOneProduct(productId){
    const options = {method: 'get'}; 
    const result = await fetch(`http://localhost:3000/api/products/${productId}`, options);
    return await result.json()
}
// Afficher des produits dans le paniers
async function init(){
    orderedProducts.forEach(product => {
        let productFromAPI = getOneProduct(product.id);
        productFromAPI.then((value)=>{
            var produit = value 

            img.setAttribute("src", produit.imageUrl )
            h2.innerHTML = produit.name
            pPrice.innerHTML = produit.price*product.quantity + " €"

            product.name = produit.name
            product.price = produit.price
            product.imageUrl = produit.imageUrl
            product.altTxt = produit.altTxt
            window.localStorage.setItem("productToCart", JSON.stringify(orderedProducts))
        })

        const cartItems = document.getElementById("cart__items"); 
        const cartItem = document.createElement("article")
        cartItem.classList.add("cart__item")
        cartItem.setAttribute("data-id", product.id)
        cartItem.setAttribute("data-color", product.color)
        
        const divCartItemImg = document.createElement("div")
        divCartItemImg.classList.add("cart__item__img")
    
        const img = document.createElement("img")
        
        img.setAttribute("alt", product.altTxt)
        

        const itemContent = document.createElement("div")
        itemContent.classList.add("cart__item__content")
    
        const contentDescription = document.createElement("div")
        contentDescription.classList.add("cart__item__content__description")
    
        const h2 = document.createElement("h2")
        
        const pColor = document.createElement("p")
        pColor.innerHTML = product.color 
    
        const pPrice = document.createElement("p")
        
        const contentSettings = document.createElement("div")
        contentSettings.classList.add("cart__item__content__settings")
    
        const settingsQuantity = document.createElement("div")
        settingsQuantity.classList.add("cart__item__content__settings__quantity")
    
        const Qte = document.createElement("p")
        Qte.innerHTML = "Qté : " 
    
        const input = document.createElement("input")
        input.setAttribute("type", "number")
        input.setAttribute("name", "itemQuantity")
        input.classList.add("itemQuantity")
        input.setAttribute("min", 1)
        input.setAttribute("max", 100)
        input.setAttribute("value", product.quantity)
        input.addEventListener("change", (NewQuantity) => {
            product.quantity = NewQuantity.target.value
            pPrice.innerHTML = product.price*product.quantity + " €"
            total(product)
            window.localStorage.setItem("productToCart", JSON.stringify(orderedProducts))
        })
    
        const settingsDelete = document.createElement("div")
        settingsDelete.classList.add("cart__item__content__settings__delete")
    
        const deleteItem = document.createElement("p")
        deleteItem.innerHTML = "Supprimer" 
        deleteItem.addEventListener("click", () => {
            let index = orderedProducts.indexOf(product)
            orderedProducts.splice(index, 1)
            pPrice.innerHTML = product.price*product.quantity + " €"
            total(product)
            cartItems.removeChild(cartItem)
            alert("Ce produit à bien été supprimé !")
            window.localStorage.setItem("productToCart", JSON.stringify(orderedProducts))
        })
        
        cartItems.appendChild(cartItem)
        cartItem.appendChild(divCartItemImg)
        divCartItemImg.appendChild(img)
        cartItem.appendChild(itemContent)
        itemContent.appendChild(contentDescription)
        contentDescription.appendChild(h2)
        contentDescription.appendChild(pColor)
        contentDescription.appendChild(pPrice)
        itemContent.appendChild(contentSettings)
        contentSettings.appendChild(settingsQuantity)
        settingsQuantity.appendChild(Qte)
        settingsQuantity.appendChild(input)
        contentSettings.appendChild(settingsDelete)
        settingsDelete.appendChild(deleteItem)

    });
}
async function total(){
    // calcule de la quantity total des produits 
    let quantityArray = orderedProducts.map(product => {return Number(product.quantity)})    
    let sumQuantity = quantityArray.reduce((accumulator, currentValue) =>{
        return accumulator + currentValue
    }, 0)

    let totalQuantity = document.getElementById("totalQuantity")
    totalQuantity.textContent = sumQuantity 

    // calcule du prix total des produits  
    let sumPrice =0;           
    for(let product of orderedProducts){
        let produit = await getOneProduct(product.id);
        sumPrice = sumPrice + product.quantity*produit.price
    }
    let totalPrice = document.getElementById("totalPrice")
    totalPrice.textContent = sumPrice
}
total()
init()
function formVerif (){
// vérification du prénom 
    let firstName = document.getElementById("firstName")
    firstName.addEventListener("change", ()=>{
        nameVerif(this)
    })
  
// Vérification du NOM 
    let lastName = document.getElementById("lastName")
    lastName.addEventListener("change", ()=>{
        lastNameVerif(this)
    })
    
// vérification de l'adresse 
    let address = document.getElementById("address")
    address.addEventListener("change", ()=>{
        addressVerif(this)
    })
    
// vérification de la ville 
    let city = document.getElementById("city")
    city.addEventListener("change", ()=>{
        cityVerif(this)
    })
    

// Vérification de l'adresse mail 
    let email = document.getElementById("email")
    email.addEventListener("change", ()=> {
        emailVerif(this)
    })
    
    
}
formVerif()
//fonctions de vérifications des champs du formulaire avec les RegEx 
function nameVerif(){
    let firstName = document.getElementById("firstName")
    let firstNameRegExp = new RegExp('^[A-Za-z éèçàùâôûê]+$','g')
    let fistNameMsgErr = document.getElementById("firstNameErrorMsg")
    let testFirstName = firstNameRegExp.test(firstName.value)
    if(testFirstName){
        fistNameMsgErr.textContent =""
        return true
    }
    else{
        fistNameMsgErr.textContent ="Saisie invalide"
        return false
    }
}
function cityVerif(){
        let city = document.getElementById("city")
        let cityRegExp = new RegExp('^[A-Za-z éèçàùâôûê._ -]+$','g')
        let cityMsgErr = document.getElementById("cityErrorMsg")
        let testcity = cityRegExp.test(city.value)
        
        if(testcity){
            cityMsgErr.textContent =""
            return true
        }
        else{
            cityMsgErr.textContent ="Saisie invalide"
            return false
        }
    }
function lastNameVerif(){
        let lastName = document.getElementById("lastName")
        let lastNameRegExp = new RegExp('^[A-Za-z éèçàùâôûê ]+$','g')
        let lastNameMsgErr = document.getElementById("lastNameErrorMsg")
        let testlastName = lastNameRegExp.test(lastName.value)
        
        if(testlastName){
            lastNameMsgErr.textContent =""
            return true
        }
        else{
            lastNameMsgErr.textContent ="Saisie invalide"
            return false
        }
    }
    function addressVerif(){
        let address = document.getElementById("address")
        let addressRegExp = new RegExp('^[0-9 ]+[A-Za-z éèçàùâôûê ]+$','g')
        let addressMsgErr = document.getElementById("addressErrorMsg")
        let testaddress = addressRegExp.test(address.value)
        
        if(testaddress){
            addressMsgErr.textContent =""
            return true
        }
        else{
            addressMsgErr.textContent ="Saisie invalide"
            return false
        }
    }

function emailVerif(){
        let email = document.getElementById("email")
        let emailRegExp = new RegExp('^[A-Za-z0-9._-]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
        let emailMsgErr = document.getElementById("emailErrorMsg")
        let testEmail = emailRegExp.test(email.value)
        if (testEmail){
            emailMsgErr.textContent = ""
            return true
        }
        else{
            emailMsgErr.textContent= "Veuillez entrer une adresse mail valide s'il vous plaît ! "
            return false
        }
    }

//Passer la commande 
let commander = document.getElementById("order")
commander.addEventListener("click", async (e)=>{
    e.preventDefault()
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const address = document.getElementById("address").value
    const city = document.getElementById("city").value
    const email = document.getElementById("email").value
    const contact = {}
    const products = orderedProducts.map(product => product.id)

    const orderForm = {
        contact, products
    }
    console.log(orderForm)
    if(nameVerif() && lastNameVerif() && addressVerif() && cityVerif() && emailVerif() && products.length>0){
        contact.firstName = firstName
        contact.lastName = lastName
        contact.address = address
        contact.city = city
        contact.email = email 

        const options = {method: 'POST', body: JSON.stringify(orderForm), headers: {
            "content-Type": "application/json",
        }}; 
        const result = await fetch(`http://localhost:3000/api/products/order`, options);

        const commande = await result.json()

        localStorage.clear()
        window.location.replace(`confirmation.html?id=${commande.orderId}`)
    }
    else {
        alert("Assurez vous de bien remplir le formulaire avant de passer votre commande !")
    }

})

