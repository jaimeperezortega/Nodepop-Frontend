

export  const adView = (ad)=>{
    let onSale;
    if(ad.onSale === true){
        onSale = "En venta:"
    }else{
        onSale= "Ofrezco:"
    }
    return ` <div class="ad">
    <strong class="ad-name">${ad.name}</strong>
    <div class="on-sale">${onSale}  </div>
    <div class="price">${ad.price} €</div>

</div> <hr>`;

}


export const errorView = (errorMessage) => {
    return `<article class="message is-danger">
      <div class="message-header">
        <p>Error</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        ${errorMessage}
      </div>
    </article>`
  }