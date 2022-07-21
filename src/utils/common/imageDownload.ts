interface Props {
  href: string;
}

export async function imageDownload({ href }: Props) {
  const imageResponse = await fetch(href);
  const imageBlob = await imageResponse.blob();
  const imageObjectUrl = window.URL.createObjectURL(imageBlob);

  console.log(imageObjectUrl);

  const element = document.createElement('a');
  element.href = imageObjectUrl;

  const imageName = new Date().getTime();
  const imageExtension = href.split('.').at(-1);
  element.download = `${imageName}.${imageExtension}`;

  document.body.appendChild(element);

  element.dispatchEvent(new MouseEvent('click'));

  document.body.removeChild(element);

  window.URL.revokeObjectURL(imageObjectUrl);
}
