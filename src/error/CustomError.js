class CustomError extends Error {
  constructor(error, code) {
    super(error);
    this.code = code;
  }
}
module.exports = CustomError;
