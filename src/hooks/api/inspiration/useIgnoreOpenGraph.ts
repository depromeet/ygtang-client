import { OpenGraph } from '~/components/inspiration/LinkView';

const INSTAGRAM_ORIGIN = 'www.instagram.com';
const FACEBOOK_ORIGIN = 'www.facebook.com';
const IGONRE_OPEN_GRAPH_HOSTS = [INSTAGRAM_ORIGIN, FACEBOOK_ORIGIN];

const SUCCESS_CODE = 200;

export default function useIgnoreOpenGraph() {
  const checkIgonreOpenGraphHost = (_url: string) => {
    try {
      const { host } = new URL(_url);
      return IGONRE_OPEN_GRAPH_HOSTS.includes(host);
    } catch {
      return false;
    }
  };
  const makeURLOpenGraph = (_url: string): OpenGraph | undefined => {
    const { origin, hostname } = new URL(_url);
    return {
      description: '',
      siteName: hostname,
      title: origin,
      url: _url,
      code: SUCCESS_CODE,
    };
  };

  return {
    checkIgonreOpenGraphHost,
    makeURLOpenGraph,
  };
}
