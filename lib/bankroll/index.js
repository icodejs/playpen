const numeral = require('numeral');

function getBusinessDatesCount(startDate, endDate, dayEnded) {
  const curDate = startDate;
  let count = 0;

  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (!(dayOfWeek === 6 || dayOfWeek === 0)) {
      count++;
    }
    curDate.setDate(curDate.getDate() + 1);
  }
  return dayEnded ? count : count - 1;
}

function getStartDate(start) {
  const now = new Date();
  const [hours, minutes, seconds] = start.split(':');
  now.setHours(parseInt(hours || 0, 10));
  now.setMinutes(parseInt(minutes || 0, 10));
  now.setSeconds(parseInt(seconds || 0, 10));
  return now;
}

function bankRoll(data) {
  const today = getStartDate(String(data.startTime));
  const oneMin = 1000 * 60;
  const now = new Date();
  const minutesElapsed = Math.round(now - today) / oneMin;
  const endOfDay = getStartDate(String(data.endTime));
  const wagePerMinute = data.rate / ((endOfDay - today) / oneMin);
  const earnedToday = minutesElapsed * wagePerMinute;
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const dayEnded = today.getHours() >= 17;
  const daysPassed = getBusinessDatesCount(startDate, today, dayEnded);
  const vat = 1.2;
  const earnedSoFar = daysPassed * data.rate * vat;
  const time = now.toTimeString();
  const format = '0,0.00';

  return {
    today: numeral(earnedToday).format(format),
    month: numeral(earnedToday + earnedSoFar).format(format),
    dayEnded,
    time,
  };
}

module.exports = bankRoll;
