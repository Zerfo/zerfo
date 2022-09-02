module.exports = {
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-env', {
      modules: false,
      loose: true
    }],
    "@babel/preset-typescript",
  ],
};
