

export  const adView = (ad)=>{

  let deleteButtonHTML = '';
  if (ad.canBeDeleted) {
    deleteButtonHTML = '<button class="button is-danger is-pulled-right">Borrar</button>';
  }

  // const viewDetailButton = '<button class="view-detail-button button is-link is-pulled-left">Ver Detalle</button>';

  let imgHTML = "";
  if(ad.image){
    imgHTML = `<div class ="image"> <img src="${ad.image}"></div>`
  }
    let onSale;
    if(ad.onSale === true){
        onSale = "<div class='venta'>En venta:"
    }else{
        onSale= "<div class='compra'>Ofrezco máximo:"
    }

    //<a href = "/ficha-anuncio.html"> </a>
    return ` <div class="ad-wrapper">
    <strong class="ad-name" style="font-size:20px; color:black;">${ad.name}</strong>
    <div class="on-sale"  padding-top:10px;">${onSale} ${ad.price} €  </div>
    
    
    ${imgHTML}
    ${deleteButtonHTML}
    

    
  
</div> <hr>`;

};

export  const adDetailedInfo = (ad)=>{
 
 

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
    return ` <div class="ad">
    <div class="publish-date"><b> Fecha de publicación:</b> ${ad.updatedAt} </div>
    <strong class="ad-name" style="font-size:20px; color:black;">${ad.name}</strong>
    <div class="on-sale" style="color:green"; padding-top:10px;">${onSale} ${ad.price} €  </div>
    <div class="ad-text">${ad.adText} </div>
    
    
    ${imgHTML}
   
   
    

    
  
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