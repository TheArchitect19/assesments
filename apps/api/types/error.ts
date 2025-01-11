type EmailError = 'Email Send Failed';

type UnExpectedError =
  | 'Unauthorized'
  | 'Forbidden'
  | 'Not Found'
  | 'Internal Server Error'
  | 'Something went Wrong'
  | 'User Not Found';

  type AuthError =
  | 'Wrong Creds'
  | 'No Account Found'
  | 'Account Already Exists'
  | 'Signup Failed'
  | 'Login Failed';

  type TokenError =
  | 'Token Error'
  | 'Token Expired'
  | 'Token Invalid'
  | 'Token Missing';

export type IErrorMessage = EmailError | UnExpectedError | AuthError | TokenError;
