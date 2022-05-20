import { useState } from 'react';
import { css, Theme } from '@emotion/react';

import { CTAButton, GhostButton } from '~/components/common/Button';
import { Indicator, SnapCarousel } from '~/components/common/SnapCarousel';
import { OnboardContent } from '~/components/onboard';
import { ONBOARD_IMAGE } from '~/constants/assets';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { fullViewHeight } from '~/styles/utils';

export default function Onboard() {
  const { onClickCTA, onClickSignUp } = useOnboardRouter();
  const [carouselWrapperRef, setCarouselWrapperRef] = useState<HTMLDivElement | null>(null);

  return (
    <article css={wrapperCss}>
      <div css={onboardContentWrapperCss}>
        <SnapCarousel.Wrapper ref={setCarouselWrapperRef}>
          <SnapCarousel.Item>
            <OnboardContent
              imgSrc={ONBOARD_IMAGE[0]}
              title="거기, 영감 있나요?"
              description="혹시, 여기저기서 수집한 영감들이<br/>어딘가에 흩어져 있지 않나요?"
            />
          </SnapCarousel.Item>
          <SnapCarousel.Item>
            <OnboardContent
              imgSrc={ONBOARD_IMAGE[1]}
              title="마음껏 추가하세요."
              description="글, 사진, 링크로 된 영감을 모을 수 있어요."
            />
          </SnapCarousel.Item>
          <SnapCarousel.Item>
            <OnboardContent
              imgSrc={ONBOARD_IMAGE[2]}
              title="나의 영감이 Tang!"
              description="언제든 찾아볼 수 있도록 나만의 태그를 추가하고,<br/> 메모를 남겨보세요. 그리고, Tang!"
            />
          </SnapCarousel.Item>
        </SnapCarousel.Wrapper>

        <div css={indicatorWrapperCss}>
          <Indicator wrapperRef={carouselWrapperRef} />
        </div>
      </div>

      <CTAButton onClick={onClickCTA}>시작하기</CTAButton>
      <div css={signUpTextWrapperCss}>
        계정이 없으신가요?{' '}
        <GhostButton size={'small'} onClick={onClickSignUp}>
          빠르게 가입하기
        </GhostButton>
      </div>
    </article>
  );
}

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  min-height: ${fullViewHeight()};
`;

const onboardContentWrapperCss = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const indicatorWrapperCss = css`
  margin-top: 45px;
  margin-bottom: 40px;
`;

const signUpTextWrapperCss = (theme: Theme) => css`
  margin-top: 28px;
  margin-bottom: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  color: ${theme.color.gray04};
  font-weight: ${theme.font.weight.regular};
  font-size: 10px;
  line-height: 150%;
`;

function useOnboardRouter() {
  const router = useInternalRouter();

  const onClickCTA = () => {
    router.push('/login');
  };

  const onClickSignUp = () => {
    router.push('/signup');
  };

  return { onClickCTA, onClickSignUp };
}
