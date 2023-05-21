import { UnauthorizedCode } from '__generated__/graphql';

export class UnauthorizedError extends Error {
  code: UnauthorizedCode;

  constructor(message: string, code: UnauthorizedCode) {
    super(message);
    this.code = code;
  }
}
