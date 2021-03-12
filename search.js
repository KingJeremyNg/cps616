/*
Consider a 2D array of integers, so that elements in each row are sorted. The elements of each
column are sorted as well. Both rows and columns are sorted in increasing order. Propose a
divide and concur approach to find whether a specific value is in the array. Analysis the time
complexity of your approach.
*/

function search(arr, num) {
    const row = arr.length;
    const col = arr[0].length;
    const mid_i = Math.floor(row / 2);
    const mid_j = Math.floor(col / 2);
    let ans;
    if (arr[mid_i][mid_j] === num) return { i: mid_i, j: mid_j };       // Return i and j if num is the midpoint
    else if (num < arr[mid_i][mid_j]) {                                 // Search quartile 1, 2, 3
        for (let i = 0; i < mid_i; i++) {                               // Search quartile 1, 2
            ans = searchQuartile(i, 0, col - 1);
            if (ans) return ans;
        }
        for (let i = mid_i; i < row; i++) {                             // Search quartile 3
            ans = searchQuartile(i, 0, mid_j - 1);
            if (ans) return ans;
        }
    }
    else if (num > arr[mid_i][mid_j]) {                                 // Search quartile 2, 3, 4
        for (let i = 0; i < mid_i; i++) {                               // Search quartile 3, 4
            ans = searchQuartile(i, mid_i, col - 1);
            if (ans) return ans;
        }
        for (let i = mid_i; i < row; i++) {                             // Search quartile 2
            ans = searchQuartile(i, mid_i, col - 1);
            if (ans) return ans;
        }
    }
    function searchQuartile(i, start, end) {
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

arr.forEach(row => {
    row.forEach(element => {
        console.log(search(arr, element), element);
    })
});
