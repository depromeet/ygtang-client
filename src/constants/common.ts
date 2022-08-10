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
  PRIVACY: 'https://gifted-puffin-352.notion.site/94ac34de4c97467fb1f21a8bbed26eab',
  // NOTE: Terms of service 줄여서 TOS라고 많이 쓴다고하네요!
  TOS: 'https://gifted-puffin-352.notion.site/e75b7f51da7944508f37071f5345cc46',
};

export const WEBVIEW_MESSAGE_TYPE = {
  CreatedInspiration: 'CreatedInspiration',
  ClosedInspiration: 'ClosedInspiration',
};
