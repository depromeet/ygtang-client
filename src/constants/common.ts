export const PUBLIC_ROUTES = [
  '/login',
  '/password',
  '/signup',
  '/signup/sent-email',
  '/signup/email-verified',
  '/signup/information',
  '/onboard',
  '/password/sent-email',
  '/password/verified',
];

export const ADD_ROUTES = ['/add/image', '/add/text', '/add/link'];

export const IS_PRODUCTION = process.env.APP_ENV === 'production';

export const COOKIE_REFRESH = 'ygt_refresh';

export const CONNECT_EMAIL = 'yeonggamt@gmail.com';

export const MODAL_TYPE = {
  addTag: 'addTag',
  editTag: 'editTag',
  inspirationView: 'inspirationView',
  tag: 'tag',
};

export const POLICY_URL = {
  PRIVACY: 'https://slashpage.com/ygtang/7vgjr4m1rkpdk2dwpy86',
  // NOTE: Terms of service 줄여서 TOS라고 많이 쓴다고하네요!
  TOS: 'https://slashpage.com/ygtang/ndvwx728g8vdxm3z6jpg ',
  FEEDBACK: 'https://slashpage.com/ygtang/ndvwx728gewqgm3z6jpg',
};

export const WEBVIEW_MESSAGE_TYPE = {
  CreatedInspiration: 'CreatedInspiration',
  ClosedInspiration: 'ClosedInspiration',
};
