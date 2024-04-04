function sum(a, b) {
  if (a && b) {
    return a + b;
  }

  throw new Error('Invalid arguments');
}

// sum(1); // Error: Invalid arguments

try {
  console.log(sum(2));
} catch (err) {
  console.log('Error occured'); // Error occured; the app doesn't crash
  //   console.log(err); // Error: Invalid arguments
}
