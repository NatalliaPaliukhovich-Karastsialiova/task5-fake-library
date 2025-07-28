exports.times = (n, rng, fn) => {
  if (n < 0) throw new Error("The first argument cannot be negative.");
  return (arg) => {
    const intPart = Math.floor(n);
    for (let i = 0; i < intPart; i++) {
      arg = fn(arg);
    }

    const fraction = n % 1;
    if (rng() < fraction) {
      arg = fn(arg);
    }

    return arg;
  };
};
