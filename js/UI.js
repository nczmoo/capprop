class UI{

  constructor(){
    this.populateAd();
  }
  displayAd(productName, ad, adID){
    let html = '';
    let adReturn = "<span class='ms-3'>($" + (ad.income - ad.cost).toFixed(2) + ")</span>"
    if (ad.income - ad.cost < 0){
      adReturn = "<span class='text-danger ms-3'>(-$" + (ad.income - ad.cost).toFixed(2) + ")</span>"
    } else if (ad.income - ad.cost > 0){
      adReturn = "<span class='text-success ms-3'>(+$" + (ad.income - ad.cost).toFixed(2) + ")</span>"
    }
    html += "<div class='ms-3'><button id='delete-" + adID
      + "' class='btn-danger btn deleteAd ms-3 form-control'>delete</button></div>"
      + "<div class='ms-3'>Targeted Keyword: <span class='text-secondary'>"
      + ad.targetedKeyword + "</span> Budget: <span class='text-secondary'>$"
      + ad.budget + "</span></div>"
      + "<div class='ms-3'>Cost: <span class='text-secondary'>" + ad.cost.toFixed(2)
      + "</span> Income: <span class='text-secondary'>" + ad.income.toFixed(2) + "</span>"
      + adReturn + "</div>"
      + "<div class='ms-3 mb-3'>Time Running: " + this.formatTime(ad.started) + "</div>"
      return html;
  }
  displayAds(){
    let html = "";
    for (let product of game.products){
      if (game.areThereAds(product.name)){
        html += "<div class='fw-bold'>" + product.name + "</div>";
        for (let adID in game.ads){
          if (game.ads[adID].product == product.name){
            html += this.displayAd(product.name, game.ads[adID], adID);
          }
        }
      }


    }
    $("#adListing").html(html);
  }

  displayCVTicker(){
    $("#cvTicker").html(game.active);
    $("#cvTicker").addClass('fw-bold');
    setTimeout(function(){
      $("#cvTicker").removeClass('fw-bold')
    }, 500);
  }

  displayCVStats(){
    let html = "";
    for (let i of game.culture.cvOrderedByFreq){
      if (game.culture.count[i] > 0){
        html += "<div>" + game.culture.cv[i] + ": "
          + Math.round(game.culture.count[i] / game.culture.total * 100) + "%</div>";
      }
    }
    $("#cvStats").html(html);
    $("#cvCount").html(game.culture.total);
  }

  formatTime(unixTime){
    let diff = Date.now() - unixTime;
    diff /= 1000;
    return diff;
  }

  hide(id){
    $("#" + id).addClass('d-none');
    $("#show-" + id).removeClass('d-none');
    $("#hide-" + id).addClass('d-none');
  }

  populateAd(){
    let html = '';
    for (let i in game.culture.cv){
      html += "<input type='checkbox' id='pv-" + i + "' name='pv' value='"
        + i + "'  class='ms-3 me-1'><label for='pv-" + i + "'>"
        + game.culture.cv[i] + "</label>";
    }
    $("#pvSelect").html(html);

    html = "";
    for (let i in game.products){
      html += "<input type='checkbox' id='product-" + i + "' name='product' value='"
        + i + "'  class='ms-3 me-1' checked><label for='product-" + i + "' >"
        + game.products[i].name + "(" + game.products[i].margin + "%)</label>";
      //html += "<input value='" + i + "'>" + game.products[i].name + " (" + game.products[i].margin +"%)</option>";
    }
    $("#productSelect").html(html);
  }

  refresh(){
    this.displayCVTicker();
    this.displayCVStats();
    this.displayAds();
    $("#money").html("$" + game.money.toLocaleString())
  }

  show(id){
    $("#" + id).removeClass('d-none');
    $("#show-" + id).addClass('d-none');
    $("#hide-" + id).removeClass('d-none');
  }

}
