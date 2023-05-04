class Ad{
  budget = 0;
  cost = 0;
  income = 0;
  product = null;
  productID = null;

  started = null;
  targetedKeyword = null;


  constructor(product, productID, keyword, budget){

    this.targetedKeyword = keyword;
    this.budget = budget;
    this.product = product;
    this.productID = productID;
    this.started = Date.now();
  }


}
