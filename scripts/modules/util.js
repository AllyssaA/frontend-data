// https://origin.geeksforgeeks.org/how-to-count-number-of-occurrences-of-repeated-names-in-an-array-of-objects-in-javascript/amp/

export function findOcc(arr, key) {
    let arr2 = [];
    arr.forEach((x) => {
      if (
        arr2.some((val) => {
          return val[key] == x[key];
        })
      ) {
        arr2.forEach((k) => {
          if (k[key] === x[key]) {
            k["amount"]++;
          }
        });
      } else {
        let a = {};
        a[key] = x[key];
        a["amount"] = 1;
        arr2.push(a);
      }
    });
    return arr2;
  }
  