interface AuthTokenResponseInterface {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireDate: string;
}

interface CheckSignupResponseInterface {
  message: string;
  data: boolean;
}

interface CheckEmailCerificateResponseInterface {
  message: string;
  data: boolean;
}
