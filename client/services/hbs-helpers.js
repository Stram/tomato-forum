import Handlebars from 'handlebars-template-loader/runtime';

const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;

function formatMinutes(diff) {
  const minutes = Math.round(diff / ONE_MINUTE);
  if (minutes % 10 === 1) {
    return `Prije ${minutes} minutu`;
  } else if (minutes % 10 >= 5 || minutes % 10 === 0) {
    return `Prije ${minutes} minuta`;
  }
  return `Prije ${minutes} minute`;
}

function formatHours(diff) {
  const hours = Math.round(diff / ONE_HOUR);
  if (hours % 10 === 1) {
    return `Prije ${hours} sat`;
  } else if (hours % 10 >= 5 || hours % 10 === 0) {
    return `Prije ${hours} sati`;
  }
  return `Prije ${hours} sata`;
}

function formatDay(diff) {
  const hours = Math.round(diff / ONE_HOUR);
  if (hours % 10 === 1) {
    return `Prije ${hours} dan`;
  }
  return `Prije ${hours} sata`;
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}. ${month}. ${year}`;
}

Handlebars.registerHelper('date', function(context) {
  const now = new Date();
  const date = new Date(context);

  const diff = (now - date) / 1000;
  let format = '';

  if (diff < ONE_MINUTE) {
    format = 'Upravo sada';
  } else if (diff < ONE_HOUR) {
    format = formatMinutes(diff);
  } else if (diff < ONE_DAY) {
    format = formatHours(diff);
  } else if (diff < ONE_WEEK) {
    format = formatDay(diff);
  } else {
    format = formatDate(date);
  }

  return format;
});
