class Culture {
  cv = [
          "Conformity", "Diversity", "Freedom",  "Femininity", "Individualism",
          "LGBTQ",
/*
          "Masculinity", "Patriotism", "Religion", "Science",
          "Tolerance", "Tradition",
          */
        ];
  cvFreq  = [];
  cvOrderedByFreq = [];
  cvRandFreq = [];
  cvBuffer = [];
  cvSum = null;
  count = [];
  numOfCVsInBuffer = 10;
  total = 0;

  constructor(){
    let sum = 0;
    for (let i = 0; i < this.cv.length; i++){
      let randomNum = rand(10, 100);
      this.cvFreq.push(randomNum);
      sum += randomNum;
      this.count[i] = 0;
    }



    this.recalculate();
    for (let i = 0; i < this.numOfCVsInBuffer; i++ ){
      this.cvBuffer.push(this.randomCV());
    }
  }

  adjust(keyword){
    let newKeyword = this.randEqualCV([keyword]);
    let keywordID = this.cv.indexOf(keyword);
    let newKeywordID = this.cv.indexOf(newKeyword);
    if (this.cvFreq[keywordID]-- > 1){
      this.cvFreq[keywordID]--;
      this.cvFreq[newKeywordID]++;
    }
    this.recalculate();
  }


  inOrder(){

    let puttingInOrder = true, largest = null, largestID = null, bigArr = [];
    while (puttingInOrder){
      for (let i in this.count){
        //console.log(bigArr, i, !bigArr.includes(i))
        if ((largest == null || this.count[i] >= largest) && !bigArr.includes(i)){
          largest = this.count[i];
          largestID = i;
        }
      }
      if (largest != null){
        bigArr.push(largestID);
        largest = 0;
        largestID = null;
        //console.log(bigArr.length, this.count.length)
        if (bigArr.length >= this.count.length){
          puttingInOrder = false;
        }
      }

    }
    this.cvOrderedByFreq = bigArr;

  }

  poop(){
    this.cvBuffer.push(this.randomCV());
    let activeCV = this.cvBuffer.pop()
    this.count[this.cv.indexOf(activeCV)]++;
    this.total ++;
    this.inOrder();
    return activeCV;
  }




  randEqualCV(currentKeywords){
    let generating = true;
    if (currentKeywords == null){
      currentKeywords = [];
    }
    while (generating){
      let r = rand(1, this.cv.length - 1);
      if (!currentKeywords.includes(this.cv[r])){
        return this.cv[r];
      }
    }
  }

  randomCV(){
    let r = rand(1, this.cvSum);
    let selected = null;
    for (let i in this.cvRandFreq ){
      if (r < this.cvRandFreq[i]){
        selected = Number(i);
        break;
      }
    }
    return this.cv[selected];
  }

  recalculate(){
    let sumArr = []
    let sum = 0;
    for (let i in this.cvFreq){
      sum += this.cvFreq[i];
      sumArr.push(sum);
    }
    this.cvSum = sum;
    this.cvRandFreq = sumArr;


  }
}
