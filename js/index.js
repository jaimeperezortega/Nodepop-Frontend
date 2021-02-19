
import {adView} from "./views.js"



window.addEventListener("DOMContentLoaded", event =>{
    const loader = document.querySelector(".lds-ring");

loader.classList.add("hidden");


const adsList=[
    {
        name: " Zapatillas Salomon",
        price: 35,
        onSale: true
    },
    {
        name: " Zapatillas Salomon XTECH",
        price: 32,
        onSale: false
    },
    {
        name: " Bicicleta BH TOP",
        price: 312,
        onSale: true
    }

];

const ads= document.querySelector(".ads-list");

for(const ad of adsList){
    const adElement= document.createElement("article");
    const adHTML= adView(ad);

adElement.innerHTML = adHTML;
ads.appendChild(adElement);

}

})


