import { ReactNode, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { TextField } from "@ygtang/ui-components";
import { useTheme, YgtangTheme } from "@ygtang/ui-styles";

import DropdownMenu from "../common/DropdownMenu";

const DOMAIN_VALUES = [
  "naver.com",
  "gmail.com",
  "kakao.com",
  "daum.net",
  "hanmail.net",
  "직접 입력",
] as const;

export default function EmailField({
  setEmail,
  feedback,
}: {
  setEmail: (value: string) => void;
  feedback: ReactNode;
}) {
  const theme = useTheme();
  const [emailId, setEmailId] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<
    (typeof DOMAIN_VALUES)[number] | null
  >(null);

  const isDirectInput = selectedDomain === "직접 입력";

  useEffect(() => {
    if (emailId && domain) setEmail(emailId + "@" + domain);
  }, [setEmail, emailId, domain]);

  useEffect(() => {
    if (!selectedDomain || isDirectInput) {
      setDomain("");
      return;
    }
    if (!isDirectInput) setDomain(selectedDomain);
  }, [selectedDomain, isDirectInput]);

  return (
    <div>
      <div css={textFieldContainerCss}>
        <TextField
          placeholder={"이메일 아이디"}
          type="text"
          value={emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
          }}
          required
          alertWhenFocused
        />
        <p>@</p>
        <TextField
          disabled={!isDirectInput}
          placeholder={
            isDirectInput || !selectedDomain ? "email.com" : selectedDomain
          }
          type="text"
          value={isDirectInput ? domain : ""}
          onChange={(e) => {
            setDomain(e.target.value);
          }}
          required
          alertWhenFocused
        />
      </div>
      <DropdownMenu
        values={DOMAIN_VALUES}
        value={selectedDomain}
        setValue={setSelectedDomain}
      />
      {feedback &&
        (typeof feedback === "string" ? (
          <p css={feedbackMessageCss(theme, { alertWhenFocused: true })}>
            {feedback}
          </p>
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

export const feedbackMessageCss = (
  theme: YgtangTheme,
  { alertWhenFocused }: { alertWhenFocused: boolean },
) => css`
  color: ${alertWhenFocused ? theme.color.alert : theme.color.gray03};
  font-size: 12px;
  font-weight: 500;
  line-height: 150%;
`;
