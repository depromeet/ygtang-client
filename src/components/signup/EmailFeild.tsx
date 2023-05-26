import { ReactNode, useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';

import DropdownMenu from '../common/DropdownMenu';
import TextField from '../common/TextField';
import { feedbackMessageCss } from '../common/TextField/TextField';

const DOMAIN_VALUES = [
  'naver.com',
  'gmail.com',
  'kakao.com',
  'daum.net',
  'hanmail.net',
  '직접 입력',
] as const;

export default function EmailFeild({
  setEmail,
  feedback,
}: {
  setEmail: (value: string) => void;
  feedback: ReactNode;
}) {
  const theme = useTheme();
  const [emailId, setEmailId] = useState('');
  const [domain, setDomain] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<(typeof DOMAIN_VALUES)[number] | null>(null);

  const isDirectInput = selectedDomain === '직접 입력';

  useEffect(() => {
    if (emailId && domain) setEmail(emailId + '@' + domain);
  }, [setEmail, emailId, domain]);

  useEffect(() => {
    if (!selectedDomain || isDirectInput) {
      setDomain('');
      return;
    }
    if (!isDirectInput) setDomain(selectedDomain);
  }, [selectedDomain, isDirectInput]);

  return (
    <div>
      <div css={textFieldContainerCss}>
        <TextField
          placeholder={'이메일 아이디'}
          type="text"
          value={emailId}
          onChange={e => {
            setEmailId(e.target.value);
          }}
          required
          alertWhenFocused
        />
        <p>@</p>
        <TextField
          disabled={!isDirectInput}
          placeholder={isDirectInput || !selectedDomain ? 'email.com' : selectedDomain}
          type="text"
          value={isDirectInput ? domain : ''}
          onChange={e => {
            setDomain(e.target.value);
          }}
          required
          alertWhenFocused
        />
      </div>
      <DropdownMenu
        css={domainSelectorCss}
        values={DOMAIN_VALUES}
        value={selectedDomain}
        setValue={setSelectedDomain}
      />
      {feedback &&
        (typeof feedback === 'string' ? (
          <p css={feedbackMessageCss(theme, { alertWhenFocused: true })}>{feedback}</p>
        ) : (
          feedback
        ))}
    </div>
  );
}

const textFieldContainerCss = css`
  display: flex;
  gap: 12px;

  margin-bottom: 18px;

  & > div {
    width: 100%;
  }

  p {
    display: flex;
    align-items: center;
    height: 54px;
  }
`;

const domainSelectorCss = css``;
