import { DateTime } from './vendor/luxon.min.js';

export default class Clock {
  constructor(domElement) {
    this.date = document.getElementById(domElement);
    this.updateTime();
  }

  updateTime = () => {
    const currentDateTime = DateTime.now();
    const timeFormat = DateTime.DATETIME_SHORT_WITH_SECONDS;

    this.date.innerHTML = currentDateTime.toLocaleString(timeFormat);

    setInterval(this.updateTime, 1000);
  }
}