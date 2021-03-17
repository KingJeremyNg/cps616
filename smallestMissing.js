/*
CPS 616 Assignment 3 Question 1
Jeremy Ng
500882192
*/

/*
Given a sorted array, the goal is to find the smallest missing element in the array using Divide
and Concur approach. All elements of the array are non-negative, and non-equivalent integers.
*/

/*
To solve the above problem, I used a binary search approach since my array is already sorted.
*/

/**
 * @param {number[]} arr
 * @returns {number}
 */
function smallestMissing(arr) {
    // If arr.length - 1 is the same as the last element
    // Then that means arr is continuous from 0...arr.length - 1.
    // Therefore my smallest missing element is arr.length
    if (arr.length - 1 === arr[arr.length - 1]) return arr.length;
    function binarySearch(arr, left, right) {
        if (left > right) return left;                  // Base case
        let mid = Math.floor((left + right) / 2);
        // If mid === arr[mid] then the left side is continuous from 0...mid
        // Therefore our smallest missing number is on the right.
        if (mid === arr[mid]) {
            return binarySearch(arr, mid + 1, right);
        }
        // If mid !== arr[mid] then the left side is not continuous from 0...mid
        // Therefore our smallest missing number is on the left.
        else {
            return binarySearch(arr, left, mid - 1);
        }
    }
    return binarySearch(arr, 0, arr.length - 1);
}

let arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arr2 = [0, 2, 4, 6, 8, 10];
let arr3 = [0, 5, 10];
let arr4 = [0, 1, 2, 3, 4, 5, 10];

console.log(smallestMissing(arr1));
console.log(smallestMissing(arr2));
console.log(smallestMissing(arr3));
console.log(smallestMissing(arr4));
