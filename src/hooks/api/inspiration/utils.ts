import { CalendarFilterType } from '~/store/CalendarFilter/calendarFilter';
import { InspirationKindFilterType } from '~/store/InspirationKindFilter/inpirationKindFilter';

export function getInspirationTypeQuery(type: InspirationKindFilterType) {
  if (type === null) return '';

  return `&types=${type}`;
}

export function getCalendarFilterQuery(date: CalendarFilterType) {
  if (date[0] === null || date[1] === null) {
    return '';
  }

  const fromDate = date[0].toISOString().slice(0, -5);
  const toDate = date[1].toISOString().slice(0, -5);

  return `&createdDateTimeFrom=${fromDate}&createdDateTimeTo=${toDate}`;
}
