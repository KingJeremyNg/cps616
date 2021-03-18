/*
CPS 616 Assignment 4 Question 1
Jeremy Ng
500882192
*/

// Solve 0-1 knapsack problem using dynamic programming.

/*
To solve the above problem, I used an iterative bottom-up dynamic programming approach.
*/

/**
 * @param {number[]} values
 * @param {number[]} weights
 * @param {number} capacity
 * @returns {number}
 */
function knapsackDP(values, weights, capacity) {
    let n = values.length;
    let dp = new Array(n + 1).fill(0);              // Initiating a new DP array with size n * capacity
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(capacity + 1).fill(0);
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= capacity; j++) {
            if (weights[i - 1] > j) {               // Weight of current item is too big
                dp[i][j] = dp[i - 1][j];            // throw away knapsack completely and
            }                                       // keep successful knapsack from previous row
            else {
                // Add the new item into a knapsack and compare its total value to above knapsack in DP array
                let newKnapsack = dp[i - 1][j - weights[i - 1]] + values[i - 1];
                dp[i][j] = Math.max(dp[i - 1][j], newKnapsack);
            }
        }
    }
    // dp.forEach((row) => {
    //     console.log(...row);
    // })
    return dp[n][capacity];     // The solution is the last element of the dp array
}

let values = [1, 2, 1, 2, 2];
let weights = [3, 8, 4, 2, 5];
console.log(knapsackDP(values, weights, 10));
