/*
CPS 616 Assignment 3 Question 1
Jeremy Ng
500882192
*/

/*
Suppose there exist n ropes. They have different length. The goal is to connect them so that they
become one piece. The cost of connecting rope 1 and rope 2 equals to the sum of the length of
rope 1 and rope 2, plus 1. Bring a greedy algorithm which connect all n ropes with the
minimum cost.
*/

/*
To solve the above problem, I connect the 2 smallest ropes and accumulate the cost.
Then I remove the 2 ropes from the array.
I then put the newly created rope back into the array.
I follow this until I am left with 1 rope in my array and return the cost variable.
*/

function connectRope(arr) {
    let cost = 0;
    while (arr.length !== 1) {
        let min1 = Math.min(...arr);        // ...arr is a spread operator
        arr.splice(arr.indexOf(min1), 1);   // splice(index, num) returns a subarray and removes the elements from the original array.
        let min2 = Math.min(...arr);
        arr.splice(arr.indexOf(min2), 1);
        arr.push(min1 + min2);              // Add the new rope back into arr
        cost += min1 + min2 + 1;
    }
    return cost;
}

arr = [1, 2, 3, 4, 5];
console.log(connectRope(arr));