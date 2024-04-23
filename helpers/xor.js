function xorArrays(a, b, c) {
  if (!c) {
    if (a.length !== b.length) {
      throw new Error("Panjang array harus sama");
    }
    let result = [];
    for (let i = 0; i < a.length; i++) {
      result.push(parseInt(a[i], 16) ^ parseInt(b[i], 16));
    }

    return result.map((x) => x.toString(16).toUpperCase());
  }

  if (a.length !== b.length || b.length !== c.length) {
    throw new Error("Panjang array harus sama");
  }

  let result = [];
  for (let i = 0; i < a.length; i++) {
    result.push(parseInt(a[i], 16) ^ parseInt(b[i], 16) ^ parseInt(c[i], 16));
  }

  return result.map((x) => x.toString(16).toUpperCase());
}

// Contoh penggunaan
let arrayA = ["46", "4C", "49", "4B"];
let arrayB = ["55", "55", "43", "4B"];
// let arrayC = ["02", "00", "00", "00"];

// let result = xorArrays(arrayA, arrayB, arrayC);
let result = xorArrays(arrayA, arrayB);
console.log("Hasil xor: ", result);

// function xorHexValues(hexStrings) {
//   // Ubah nilai heksadesimal menjadi nilai desimal
//   const decimalValues = hexStrings.map((hex) => parseInt(hex, 16));

//   // Lakukan operasi XOR pada nilai desimal
//   let result = 0;
//   for (let value of decimalValues) {
//     result ^= value;
//   }

//   // Ubah nilai hasil XOR kembali ke dalam bentuk heksadesimal
//   const xorResult = result.toString(16).toUpperCase();

//   return xorResult;
// }

// const hexStrings = ["C6", "8D", "AF", "A2"];
// const xorResult = xorHexValues(hexStrings);
// console.log(xorResult);
