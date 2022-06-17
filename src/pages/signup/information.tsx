import { useState } from 'react';
import { css, Theme } from '@emotion/react';

import { CTABottomButton } from '~/components/common/Button';
import DropdownMenu from '~/components/common/DropdownMenu';
import NavigationBar from '~/components/common/NavigationBar';
import usePutExtraInformation from '~/hooks/api/sign-up/usePatchExtraInformation';
import { fullViewHeight } from '~/styles/utils';

const GENDER_VALUES = ['남자', '여자', '기타'] as const;
const GENDER_REQUEST_VALUES = { 남자: 'MALE', 여자: 'FEMALE', 기타: 'ETC' } as const;

const AGE_VALUES = ['20세 미만', '20~24세', '25~29세', '30~34세', '35세 이상'] as const;
const AGE_REQUEST_VALUES = {
  '20세 미만': 'UNDER_20S',
  '20~24세': 'EARLY_20S',
  '25~29세': 'LATE_20S',
  '30~34세': 'EARLY_30S',
  '35세 이상': 'OLDER_35',
} as const;

const JOB_VALUES = [
  '디자인, 예술',
  'IT, 개발, 데이터',
  '마케팅, 광고, 기획',
  '경영, 비즈니스, 영업',
  'HR, CS',
  '교육',
  '기타',
] as const;

export default function Information() {
  const [gender, setGender] = useState<typeof GENDER_VALUES[number] | null>(null);
  const [age, setAge] = useState<typeof AGE_VALUES[number] | null>(null);
  const [job, setJob] = useState<string | null>(null);

  const { mutate } = usePutExtraInformation();

  const isDisabledCTAButton = !Boolean(gender && age && job);

  const onClickCTA = () => {
    if (!gender || !job || !age) return;

    mutate({
      gender: GENDER_REQUEST_VALUES[gender],
      age: AGE_REQUEST_VALUES[age],
      job,
    });
  };

  return (
    <main css={mainCss}>
      <NavigationBar title="회원가입" />
      <p css={introTextWrapper}>마지막 단계입니다!</p>
      <section css={sectionCss}>
        <DropdownMenu label="성별" values={GENDER_VALUES} value={gender} setValue={setGender} />
        <DropdownMenu label="나이" values={AGE_VALUES} value={age} setValue={setAge} />
        <DropdownMenu label="관심 직무" values={JOB_VALUES} value={job} setValue={setJob} />
      </section>

      <CTABottomButton onClick={onClickCTA} disabled={isDisabledCTAButton}>
        Start Tang!
      </CTABottomButton>
    </main>
  );
}

const mainCss = css`
  height: ${fullViewHeight()};
  display: flex;
  flex-direction: column;
`;

const sectionCss = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const introTextWrapper = (theme: Theme) => css`
  white-space: pre;
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.gray05};
  font-size: 18px;
  line-height: 150%;
  margin-top: 40px;
  margin-bottom: 32px;
`;
