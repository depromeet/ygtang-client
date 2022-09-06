import { atom } from 'recoil';

type CalendarElementType = Date | null;

export type CalendarFilterType = [CalendarElementType, CalendarElementType];

export const calendarFilterState = atom<CalendarFilterType>({
  key: 'calendarFilterState',
  default: [null, null],
});
