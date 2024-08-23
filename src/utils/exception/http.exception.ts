class HTTPException extends Error {
  code: number;
  cause: any;

  constructor(code: number, message: string, cause?: any) {
    super(message);
    this.code = code;
    this.cause = cause;
  }
}

export default HTTPException;
