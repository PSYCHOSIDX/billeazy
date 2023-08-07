function generateAmount(tariffCategory, tension, readingDifference, sanctionedLoad, rates) {

    let amount = 0;
  
    if (tariffCategory == "domestic") {
  
      if (tension == "lt") {
  
        amount = 20 * sanctionedLoad;
  
        if (readingDifference <= 100) {
  
          amount += (rates.slab1 + rates.fppca1) * readingDifference;
  
        } else if (readingDifference <= 200) {
  
          amount += (rates.slab1 + rates.fppca1) * 100 + (rates.slab2 + rates.fppca2) * (readingDifference - 100);
  
        } else if (readingDifference <= 300) {
  
          amount += (rates.slab1 + rates.fppca1) * 100 + (rates.slab2 + rates.fppca2) * 100 + (rates.slab3 + rates.fppca3) * (readingDifference - 200);
  
        } else if (readingDifference <= 400) {
  
          amount += (rates.slab1 + rates.fppca1) * 100 + (rates.slab2 + rates.fppca2) * 100 + (rates.slab3 + rates.fppca3) * 100 + (rates.slab4 + rates.fppca4) * (readingDifference - 300);
  
        } else {
  
          amount += (rates.slab1 + rates.fppca1) * 100 + (rates.slab2 + rates.fppca2) * 100 + (rates.slab3 + rates.fppca3) * 100 + (rates.slab4 + rates.fppca4) * 100 + (rates.slab5 + rates.fppca5) * (readingDifference - 400);
  
        }
  
      } else {
  
        amount = 110 * sanctionedLoad;
  
        amount += (rates.slab1 + rates.fppca1) * readingDifference;
  
      }
  
    } else if (tariffCategory == "commercial") {
  
      if (tension == "lt") {
  
        amount = 70 * sanctionedLoad;
  
        if (readingDifference <= 100) {
  
          amount += (rates.slab1 + rates.fppca1) * readingDifference;
  
        } else if (readingDifference <= 200) {
  
          amount += (rates.slab1 + rates.fppca1) * 100 + (rates.slab2 + rates.fppca2) * (readingDifference - 100);
  
        } else if (readingDifference <= 400) {
  
          amount += (rates.slab1 + rates.fppca1) * 100 + (rates.slab2 + rates.fppca2) * 100 + (rates.slab3 + rates.fppca3) * (readingDifference - 200);
  
        } else {
  
          amount += (rates.slab1 + rates.fppca1) * 100 + (rates.slab2 + rates.fppca2) * 100 + (rates.slab3 + rates.fppca3) * 200 + (rates.slab4 + rates.fppca4) * (readingDifference - 400);
  
        }
  
      } else {
  
        amount = 250 * sanctionedLoad;
  
        amount += (rates.slab1 + rates.fppca1) * readingDifference
  
      }
  
    } else {
      if (tension == "lt") {
        amount = 50 * sanctionedLoad;
  
        if (readingDifference <= 500) {
  
          amount += (rates.slab1 + rates.fppca1) * readingDifference;
  
        } else {
  
          amount += (rates.slab1 + rates.fppca1) * 500 + (rates.slab2 + rates.fppca2) * (readingDifference - 500);
  
        }
  
      } else {
  
        amount = 275 * sanctionedLoad;
  
        amount += (rates.slab1 + rates.fppca1) * readingDifference;
  
      }
    }
  
    // setAmount(amount);
  
    return amount;
  
  }

export {generateAmount}