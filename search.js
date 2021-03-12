/*
CPS 616 Assignment 3 Question 1
Jeremy Ng
500882192
*/

/*
Consider a 2D array of integers, so that elements in each row are sorted. The elements of each
column are sorted as well. Both rows and columns are sorted in increasing order. Propose a
divide and concur approach to find whether a specific value is in the array. Analysis the time
complexity of your approach.
*/

/*
Below I made a program that solves the above problem by using a divide and conquer approach.
I Found that the value that I am searching for can only be in 3 of 4 quartiles based on a midpoint.
Time complexity of my program is:
    = 7 + m/2 * (n Log n + 2) + m/2 * (n/2 Log n/2 + 2)
Time complexity of my searchQuartile function is (n Log n).
I am always searching 2 quartiles at the same time and 1 quartile separately.
Assuming that m = n then we have:
    = 7 + n/2 * (n Log n + 2) + n/2 * (n/2 Log n/2 + 2)
    = 7 + (n^2)/2 * Log n + n + (n^2)/4 log n/2 + n
    = 7 + 2n + (n^2)/2 * Log n + (n^2)/4 log n/2
Therefore my final time complexity is O(n Log n)
*/

function search(arr, num) {
    const row = arr.length;
    const col = arr[0].length;
    const mid_i = Math.floor(row / 2);
    const mid_j = Math.floor(col / 2);
    if (arr[mid_i][mid_j] === num) return { i: mid_i, j: mid_j };   // Return i and j if num is equal to the midpoint
    let ans;
    if (num < arr[mid_i][mid_j]) {                                  // Search quartile 1, 2, 3
        for (let i = 0; i < mid_i; i++) {                           // Search quartile 1, 2
            ans = searchQuartile(i, 0, col - 1);
            if (ans) return ans;
        }
        for (let i = mid_i; i < row; i++) {                         // Search quartile 3
            ans = searchQuartile(i, 0, mid_j - 1);
            if (ans) return ans;
        }
    }
    if (num > arr[mid_i][mid_j]) {                                  // Search quartile 2, 3, 4
        for (let i = mid_i; i < mid_i; i++) {                       // Search quartile 3, 4
            ans = searchQuartile(i, 0, col - 1);
            if (ans) return ans;
        }
        for (let i = 0; i < row; i++) {                             // Search quartile 2
            ans = searchQuartile(i, mid_j, col - 1);
            if (ans) return ans;
        }
    }
    function searchQuartile(i, start, end) {                        // Function to search for num by cutting array into halves each step
        while (start < end) {
            let mid = Math.floor((start + end) / 2);
            if (arr[i][mid] < num) start = mid + 1;
            else if (arr[i][mid] > num) end = mid - 1;
            else if (arr[i][mid] === num) return { i: i, j: mid };
        }
        if (start === end && arr[i][start] === num) return { i: i, j: start };
    }
}

arr = [[10, 20, 30, 40],
[12, 22, 32, 42],
[14, 24, 34, 44],
[16, 26, 36, 46]];

// Searching each element in arr
arr.forEach(row => {
    row.forEach(element => {
        console.log(search(arr, element), element);
    })
});
