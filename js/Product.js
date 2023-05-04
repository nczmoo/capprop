class Product {
  name = null;
  margin = null;
  //keywordFreq = [];
  keywords = [];
  keywordBonus = [];
  keywordChance = [];
  culture = new Culture();

  adjectives = ["Magic", "Clean", "Pure", "Heavenly",  'Corporate', "Busy", "Clever", "Jolly", "Perfect"];
  nouns = ["Cleaner", "Delight", "Widget", "Product", "Rock", "Water", "Air", "Nature" ];


  constructor(){
    this.name = this.randomName();
    this.margin = rand (5, 100);
    this.getKeywords();
  }

  getKeywords(){
    let keywords = [];
    let numOfKeywords = rand(1, this.culture.cv.length);
    for (let i = 0; i < numOfKeywords; i++){
        this.keywords.push(this.culture.randEqualCV(this.keywords));
        this.keywordBonus.push(rand(0, 100));
        this.keywordChance.push(rand(1,3));
    }
    /*
    let generating = true, numArr = [];
    while (generating){
      numArr = [];
      let sum = 0;
      for (let i = 0; i < this.numOfKeywords; i++){
        let r = rand (1, 100);
        numArr.push(r);
        sum += r;
      }
      if (sum == 100){
        generating = false;
      }
    }
    this.keywordFreq = numArr;
    */
  }


  randomName (){
    let adj = this.adjectives[rand(0, this.adjectives.length - 1)];
    let noun = this.nouns[rand(0, this.nouns.length - 1)];
    return adj + " " + noun;
  }
}
