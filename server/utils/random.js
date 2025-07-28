exports.times = (n, rng, fn) => {
  if (n < 0) throw new Error("The first argument cannot be negative.");
    return (arg) => {
      for(let i = Math.floor(n); i--;) arg = fn(arg);
        return rng() < n % 1 ? fn(arg) : arg;
  };
};
