class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'HttpError';
    this.code = code;
  }
}

export { HttpError };
