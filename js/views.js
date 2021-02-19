

export  const adView = (ad)=>{
    let onSale;
    if(ad.onSale === true){
        onSale = "En venta"
    }else{
        onSale= "Compro"
    }
    return ` <div class="ad">
    <strong class="ad-name">${ad.name}</strong>
    <div class="on-sale">${onSale} </div>
    <div class="price">${ad.price} €</div>

</div> <hr>`;

}