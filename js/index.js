

const loader = document.querySelector(".lds-ring");

loader.classList.add("hidden");


for(let i=0; i<20; i++){
    const ad= document.createElement("article");
    const adHTML= ` <div class="ad">
    <strong class="ad-name">Zapatillas Salomon</strong>
    <div class="on-sale">Vendo</div>
    <div class="price">65 €</div>

</div>`;

ad.innerHTML = adHTML;
const adsList= document.querySelector(".ads-list");
adsList.appendChild(ad);

}
