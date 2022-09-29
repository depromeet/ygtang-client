import { OnChangeDateRangeCallback } from 'react-calendar';
import { useRecoilState } from 'recoil';

import { calendarFilterState } from './calendarFilter';

export function useCalendarFilter() {
  const [calendarFilter, setCalendarFilter] = useRecoilState(calendarFilterState);

  const onChangeCalendarFilter: OnChangeDateRangeCallback = (value: [Date] | [Date, Date]) => {
    if (value.length === 1) {
      setCalendarFilter([value[0], null]);
      return;
    }

    if (value[0].toDateString() === value[1].toDateString()) {
      setCalendarFilter([null, null]);
      return;
    }

    setCalendarFilter(value);
  };

  return { calendarFilter, onChangeCalendarFilter };
}
