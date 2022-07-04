import { format } from 'date-fns'
import { addDays } from 'date-fns';

export function convertToDateBR(date: Date) {
  const dateFormated = format(new Date(date), 'dd-MM-yyyy');
  return dateFormated;
}

export function DateNow() {
  const dateNow = addDays(new Date().getTime(), -1);
  const dateNowFormated = format(dateNow, 'MM-dd-yyyy');
  return new Date(dateNowFormated);
}