

export  const adView = (ad)=>{

  let deleteButtonHTML = '';
  if (ad.canBeDeleted) {
    deleteButtonHTML = '<button class="button is-danger is-pulled-right">Borrar</button>';
  }

  let imgHTML = "";
  if(ad.image){
    imgHTML = `<div class ="image"> <img src="${ad.image}"></div>`
  }
    let onSale;
    if(ad.onSale === true){
        onSale = "En venta:"
    }else{
        onSale= "Ofrezco máximo:"
    }
    return ` <a href = "/"><div class="ad">
    <strong class="ad-name" style="font-size:20px; color:black;">${ad.name}</strong>
    <div class="on-sale" style="color:green"; padding-top:10px;">${onSale} ${ad.price} €  </div>
    
    ${imgHTML}</a>
    ${deleteButtonHTML}

    
  
</div> <hr>`;

};

export  const adViewLandingPage = (ad)=>{
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