function lpad(str, padString, length) {
  while (str.length < length) {
    str = padString + str;
  }

  return str;
}

function binaryToByte(bin) {
  return parseInt(bin, 2);
}

function bytesToBinary(bytes) {
  return bytes.map((x) => {
    return lpad(parseInt(x, 16).toString(2), '0', 4)
  }).join('');
}

function eachSlice(arr, size) {
  var output = [];
  for (var i = 0, l = arr.length; i < l; i+= size) {
    output.push(arr.slice(i, i + size))
  }

  return output;
}

export { lpad, binaryToByte, bytesToBinary, eachSlice };
