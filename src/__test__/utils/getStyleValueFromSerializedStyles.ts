import { SerializedStyles } from '@emotion/react';

export function getStyleValueFromSerializedStyles(styles: SerializedStyles, key: string) {
  const splitedStyles = styles.styles.split(`\n`).map(each => each.trim());
  const attributePair = splitedStyles.filter(each => {
    const [eachKey] = each.split(':');
    if (eachKey === key) return true;
  });

  if (typeof attributePair[0] === 'undefined') return undefined;

  const styleValue = attributePair[0].split(':')[1].replace(';', '').trim();
  return styleValue;
}
