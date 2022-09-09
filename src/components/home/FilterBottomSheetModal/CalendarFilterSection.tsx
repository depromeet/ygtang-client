import { css, Theme } from '@emotion/react';
import { Calendar } from 'react-calendar';

import BottomSheetModal from '~/components/common/BottomSheetModal';
import { GhostButton } from '~/components/common/Button';
import { ChevronIcon } from '~/components/common/icons';
import NavigationBar from '~/components/common/NavigationBar';
import useToggle from '~/hooks/common/useToggle';
import { useCalendarFilter } from '~/store/CalendarFilter';

export default function CalendarFilterSection() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  const { calendarFilter, onChangeCalendarFilter } = useCalendarFilter();

  return (
    <section css={sectionCss}>
      <button onClick={toggleIsOpen} css={filterButtonCss}>
        기간
        <ChevronIcon direction="right" />
      </button>

      <BottomSheetModal isShowing={isOpen} onClose={toggleIsOpen}>
        <div css={contentWrapperCss}>
          <NavigationBar
            title="기간 설정"
            onClickBackButton={toggleIsOpen}
            rightElement={<GhostButton onClick={toggleIsOpen}>완료</GhostButton>}
          />

          <div css={calendarWrapperCss}>
            <div
              css={css`
                position: absolute;
                /* 월 navigation + gap */
                margin-top: calc(30px + 16px);
                width: 100%;
                height: 36px;
                background-color: blue;
              `}
            >
              {calendarFilter[0]?.toLocaleDateString()}, {calendarFilter[1]?.toLocaleDateString()}
            </div>

            <Calendar
              css={calendarCss}
              value={calendarFilter}
              onChange={onChangeCalendarFilter}
              allowPartialRange
              locale="ko"
              calendarType="US"
              view="month"
              selectRange
              formatDay={(_, date) => date.getDate().toString()}
              tileDisabled={({ date }) => date.getDay() % 2 === 0}
              prevLabel={<ChevronIcon direction="left" />}
              nextLabel={<ChevronIcon direction="right" />}
              next2Label={null}
              prev2Label={null}
            />
          </div>
        </div>
      </BottomSheetModal>
    </section>
  );
}

const sectionCss = css`
  margin-top: 24px;
`;

const filterButtonCss = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 24px;
  color: ${theme.color.gray05};
  font-size: 16px;
  padding: 0;
`;

const contentWrapperCss = (theme: Theme) => css`
  position: relative;
  width: 100%;
  height: 474px;

  padding: ${theme.size.layoutPadding};
`;

const calendarWrapperCss = css`
  width: 100%;
  position: relative;
  margin-top: 14px;
`;

const calendarCss = (theme: Theme) => css`
  position: relative;
  height: 100%;

  // 년도, 월 선택 부분
  & .react-calendar__navigation {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    white-space: pre;
    gap: 8px;

    & button {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.color.gray05};

      font-size: 16px;
      font-weight: bold;
    }
  }

  // 캘린더 날짜 선택 wrapper
  & .react-calendar__viewContainer {
    /* 월 navigation + gap + 현재 선택창 + gap*/
    padding-top: calc(30px + 16px + 36px + 16px);
  }

  & .react-calendar__month-view {
    &__weekdays div {
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;

      color: ${theme.color.gray04};
      font-size: 18px;

      & > abbr {
        text-decoration: none;
      }
    }

    &__days button {
      width: 44px;
      height: 44px;
      padding: 0;

      &:disabled {
        color: ${theme.color.gray03};
      }
    }
  }

  & .react-calendar__tile {
    position: relative;
    color: ${theme.color.gray05};
    font-size: 18px;

    // 선택 시작과 끝
    &--rangeStart,
    &--rangeEnd {
      color: ${theme.color.gray01};

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: ${theme.color.gray05};
        z-index: -1;
      }
    }

    // 시작과 끝이 동일하지 않은, 시작과 끝 부분
    &--range:not(.react-calendar__tile--rangeBothEnds) {
      &.react-calendar__tile--rangeStart::before {
        content: '';
        position: absolute;

        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        background-color: ${theme.color.gray01};
        z-index: -2;
      }

      &.react-calendar__tile--rangeEnd::before {
        content: '';
        position: absolute;

        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background-color: ${theme.color.gray01};
        z-index: -2;
      }
    }

    // 선택 중간 요소들 (시작과 끝 미포함)
    &--range:not(.react-calendar__tile--rangeStart, .react-calendar__tile--rangeEnd) {
      &::before {
        content: '';
        position: absolute;

        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${theme.color.gray01};
        z-index: -2;
      }
    }

    // 현재 날짜
    &--now {
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: ${theme.color.gray01};
        z-index: -1;
      }
    }
  }
`;
