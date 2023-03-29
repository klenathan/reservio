export default class UnauthenticatedError extends Error {
  name: string = "UNAUTHENTICATED";
  constructor(message: string) {
    super(message);
  }
}
