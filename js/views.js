

export  const adView = (ad)=>{
    let onSale;
    if(ad.onSale === true){
        onSale = "En venta:"
    }else{
        onSale= "Ofrezco máximo:"
    }
    return ` <div class="ad">
    <strong class="ad-name">${ad.name}</strong>
    <div class="on-sale">${onSale} ${ad.price} €  </div>
    <div> Fecha de publicación ${ad.updatedAt}</div>
    <div clas="adText" style="font-style: italic; padding-top:10px;"> ${ad.adText}</div>

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