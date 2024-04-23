function checkDifference(a, b) {
  if (a.length != b.length) {
    return "Data tidak match";
  }

  let counter = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) {
      counter++;
    }
  }

  return counter;
}

const a = "01010000";
const b = "00010100";

const result = checkDifference(a, b);

console.log(result);
