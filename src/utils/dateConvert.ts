import { format } from 'date-fns'

import { addDays } from 'date-fns';

export function convertToDateBR(date: Date) {
  console.log(date);

  const dateFormated = format(new Date(date), 'dd-MM-yyyy');

  console.log(dateFormated);

  return dateFormated;
}

export function DateNow() {
  const dateNow = addDays(new Date().getTime(), -1);

  const dateNowFormated = format(dateNow, 'MM-dd-yyyy');

  console.log(dateNowFormated);

  return new Date(dateNowFormated);
}