import { ReactNode, useRef } from 'react';
import { css, Theme } from '@emotion/react';
import { motion, Variants } from 'framer-motion';

import { EditIcon, ImageIcon, LinkIcon } from '~/components/common/icons';
import InternalLink from '~/components/common/InternalLink';
import { defaultEasing } from '~/constants/motions';
import useInternalRouter, { RouterPathType } from '~/hooks/common/useInternalRouter';
import { useUploadedImg } from '~/store/UploadedImage';

export default function AppendTooltip() {
  const { uploadImg, uploadedImg } = useUploadedImg();
  const { push } = useInternalRouter();
  const imgInputRef = useRef<HTMLInputElement>(null);

  const openInputFile = () => {
    if (!imgInputRef.current) return;
    imgInputRef.current.click();
  };

  const getBase64 = (file: Blob, onload: (file: unknown) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => onload(reader.result);
    reader.onerror = error => console.log(error);
  };

  const imgInputUploader = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target;

    if (files) {
      const formData = new FormData();
      formData.append('file', files[0]);
      getBase64(files[0], result => {
        if (typeof result === 'string') uploadImg(result);
      });

      uploadedImg && push('/add/image');
    }
  };

  return (
    <motion.div css={wrapperCss} variants={tooltipVariants}>
      <AnchorElement href="/add/text" icon={<EditIcon />} title="글" />
      <AnchorElement
        href="/add/image"
        onClick={openInputFile}
        icon={<ImageIcon />}
        title="이미지"
      />
      <AnchorElement href="/add/link" icon={<LinkIcon />} title="링크" />
      <input
        ref={imgInputRef}
        css={imgInputCss}
        onChange={imgInputUploader}
        type="file"
        accept="image/*, .jpg,.png,.bmp,.gif,.tif,.webp,.heic,.jpeg,.tiff,.heif"
      />
    </motion.div>
  );
}

const wrapperCss = (theme: Theme) => css`
  position: fixed;
  right: 16px;
  bottom: 134px;

  width: 128px;
  padding: 10px 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.background};
`;

interface AnchorElementProps {
  href: RouterPathType;
  icon: ReactNode;
  title: string;
  onClick?: VoidFunction;
}

function AnchorElement({ href, onClick, icon, title }: AnchorElementProps) {
  if (onClick) {
    return (
      <a css={anchorCss} onClick={onClick}>
        {icon}
        <span>{title}</span>
      </a>
    );
  }

  return (
    <InternalLink href={href}>
      <a css={anchorCss}>
        {icon}
        <span>{title}</span>
      </a>
    </InternalLink>
  );
}

const anchorCss = (theme: Theme) => css`
  width: 100%;
  height: 48px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${theme.color.gray05};

  &:not(:last-child) {
    border-bottom: solid 1px ${theme.color.gray01};
  }
`;

const tooltipVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.85,
    transition: { duration: 0.35, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.85,
    transition: { duration: 0.35, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
};

const imgInputCss = css`
  display: none;
`;
