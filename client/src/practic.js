// let machines = [2, 3, 2];
// let goal = 10;

// let start = 1;
// let end = 15;

// const checkMachines = (mid) => {
//   let count = 0;
//   for (let i = 0; i < machines.length; i++) {
//     count += Math.floor(mid / machines[i]);
//   }
//   if (count >= goal) {
//     return true;
//   } else {
//     return false;
//   }
// };

// let ans;
// while (start <= end) {
//   let mid = start + (end - start) / 2;
//   mid = Math.floor(mid);
//   //   console.log("mid", mid);
//   if (checkMachines(mid)) {
//     end = mid - 1;
//     ans = mid;
//   } else {
//     start = mid + 1;
//   }
// }
// console.log(ans);

function rotatematrix(m, n, mat) {
  let row = 0,
    col = 0;
  let prev, curr;

  while (row < m && col < n) {
    if (row + 1 == m || col + 1 == n) break;

    prev = mat[row + 1][col];

    for (let i = col; i < n; i++) {
      curr = mat[row][i];
      mat[row][i] = prev;
      prev = curr;
    }
    row++;

    for (let i = row; i < m; i++) {
      curr = mat[i][n - 1];
      mat[i][n - 1] = prev;
      prev = curr;
    }
    n--;

    if (row < m) {
      for (let i = n - 1; i >= col; i--) {
        curr = mat[m - 1][i];
        mat[m - 1][i] = prev;
        prev = curr;
      }
    }
    m--;

    if (col < n) {
      for (let i = m - 1; i >= row; i--) {
        curr = mat[i][col];
        mat[i][col] = prev;
        prev = curr;
      }
    }
    col++;
  }
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      row.push(mat[i][j]);
    }
    console.log(...row);
  }
}

// let a = [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12],
//   [13, 14, 15, 16],
// ];

let a = [
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [1, 2, 3, 4],
];

rotatematrix(4, 4, a);
