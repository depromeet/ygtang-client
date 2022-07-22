import { getMobileDetect } from '~/hooks/common/useUserAgent/useUserAgent';

interface Props {
  href: string;
}

export async function imageDownload({ href }: Props) {
  const { isMobile } = getMobileDetect(navigator.userAgent);

  if (isMobile()) {
    downloadImageWhenMobile({ href });
    return;
  }

  downloadImageWhenNotMobile({ href });
}

function downloadImageWhenMobile({ href }: Props) {
  const element = document.createElement('a');
  element.href = href;

  element.download = getImageNameAndExtension({ href });

  element.click();
}

async function downloadImageWhenNotMobile({ href }: Props) {
  const element = document.createElement('a');
  const imageResponse = await fetch(href, { mode: 'cors', cache: 'no-cache' });
  const imageBlob = await imageResponse.blob();
  const imageObjectUrl = window.URL.createObjectURL(imageBlob);
  element.href = imageObjectUrl;

  element.download = getImageNameAndExtension({ href });

  element.click();

  window.URL.revokeObjectURL(imageObjectUrl);
}

function getImageNameAndExtension({ href }: Props) {
  const imageName = new Date().getTime();
  const imageExtension = href.split('.').at(-1);

  return `${imageName}.${imageExtension}`;
}
