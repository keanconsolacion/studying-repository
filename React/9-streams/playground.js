// Original function given in the question.
function solution(A) {
  var N = A.length;
  var result = 0;
  var i, j;
  for (i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
      if (A[i] == A[j]) {
        result = Math.max(result, Math.abs(i - j)); //math.max returns the bigger num
      }
    }
  }
  return result;
}

/** ANSWER BELOW */

/**
 * What the function does:
 *  returns the largest number of indexes in-between two of a same element inside the array.
 */

/**
 * Updated Complexity:
 *  This solution has better time complexity as it has a O(n) complexity rather than the original
 *  function given that has O(n^2) complexity.
 */

function solutionAnswer(array) {
  var result = 0;
  var firstIndexList = {};
  for (var i = 0; i < array.length; i++) {
    if (firstIndexList[array[i]] == undefined) {
      firstIndexList[array[i]] = i;
    } else {
      const distance = i - firstIndexList[array[i]];
      if (distance > result) result = distance;
    }
  }
  return result;
}

//Same function but with comments
function solutionAnswer2(array) {
  var result = 0; // The largest number of indexes in-between two of a same element inside the array.
  var firstIndexList = {}; // Every element's first index with be stored here with the Key as the element value, and Value as its index.
  for (var i = 0; i < array.length; i++) {
    // Only loops once, thus having O(n) complexity.
    if (firstIndexList[array[i]] == undefined) {
      // Stores element value and index if it's not yet in firstIndexList
      firstIndexList[array[i]] = i;
    } else {
      // This block runs if the array element value is already in firstIndexList.
      const distance = i - firstIndexList[array[i]]; // Calculates the number of indexes between the value's first index to this index
      if (distance > result) result = distance; // Replaces the result var value with distance if it is bigger than the previous one.
    }
  }
  return result;
}

const testData = [4, 6, 2, 2, 6, 6, 1];
const testData2 = [
  4, 6, 2, 2, 6, 6, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 12, 23, 12, 3, 6,
];

console.log(solution(testData));
console.log(solutionAnswer(testData));

console.log(solution(testData2));
console.log(solutionAnswer(testData2));
