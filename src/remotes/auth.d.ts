interface AuthTokenResponseInterface {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireDate: string;
  };
}

interface AuthEmailStatusInterface {}
