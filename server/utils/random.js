exports.times = (n, rng, fn) => {
  if (n < 0) throw new Error("The first argument cannot be negative.");
    return (arg) => {
      for(let i = Math.round(n); i--;) arg = fn(arg);
        if (n % 1 !== 0 && rng() < n % 1) arg = fn(arg);
      return arg;
  };
};
