class Game {
  active = null;
  ads = [];
  culture = new Culture();
  loop = null;
  money = 1000000;
  numOfProducts = 3;
  products = [];
  constructor(){
    this.start();
    for (let i = 0; i < this.numOfProducts; i++){
      this.products.push(new Product);
    }
  }


  areThereAds(productName){
    for (let ad of this.ads){
      if (ad.product == productName){
        return true;
      }
    }
    return false;
  }

  calculateAds(){
    for (let ad of this.ads){


      if (ad.targetedKeyword == this.active){
        this.money -= Number(ad.budget);
        ad.cost += Number(ad.budget);
        if (this.didItMakeMoney(ad.productID, ad.targetedKeyword)){
          this.culture.adjust(ad.targetedKeyword);
          let income = ad.cost * ( 1 + (this.products[ad.productID].margin * .01))
            + ad.cost * ( 1 + (this.products[ad.productID].keywordBonus[this.products[ad.productID].keywords.indexOf(ad.targetedKeyword)] * .01));
          console.log(ad.cost, income);
          ad.income += income;
          this.money += income;
        }
      }


    }
  }

  createAd( cost){
    for (let product of $("[name=product]:checked")){
      let productID = $("#" + product.id).val();
      for (let pv of $("[name=pv]:checked")){
        let keywordID = $("#" + pv.id).val();
        if (!this.isThisADuplicateAd(this.products[productID].name, this.culture.cv[keywordID])){
          this.ads.push(new Ad(this.products[productID].name, productID,
            this.culture.cv[keywordID], cost));
        }
      }
    }
  }

  deleteAd(adID){
    this.ads.splice(adID, 1);
  }

  didItMakeMoney(productID, keyword){
    let product = this.products[productID];
    //return product.keywords.includes(keyword);

    if (!product.keywords.includes(keyword)){
      return false;
    }

    let chance =  rand (1, product.keywordChance[productID]);
    console.log(chance);
    return chance == 1;
  }


  isThisADuplicateAd(product, keyword){
    for (let ad of this.ads){
      if (ad.product == product && ad.targetedKeyword == keyword){
        return true;
      }
    }
    return false;
  }
  looping(){
    game.active = game.culture.poop();
    game.calculateAds();
    ui.refresh();

  }





  start(){
    this.loop = setInterval(this.looping, 1000);
  }

  stop (){
      clearInterval (this.loop);
      this.loop = null;
  }
}
