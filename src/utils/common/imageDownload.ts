interface Props {
  href: string;
}

export async function imageDownload({ href }: Props) {
  const imageResponse = await fetch(href);
  const imageBlob = await imageResponse.blob();
  const imageObjectUrl = window.URL.createObjectURL(imageBlob);

  const element = document.createElement('a');
  element.href = imageObjectUrl;

  const imageName = new Date().getTime();
  const imageExtension = href.split('.').at(-1); // 업로드시와 동일한 확장자
  element.download = `${imageName}.${imageExtension}`;
  element.click();

  window.URL.revokeObjectURL(imageObjectUrl);
}
