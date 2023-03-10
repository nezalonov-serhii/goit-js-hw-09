// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  timePickerInput: document.getElementById('datetime-picker'),
  buttonStartTimer: document.querySelector('button[data-start]'),

  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const isDisabled = true;
let choseDate;

refs.buttonStartTimer.disabled = isDisabled;

refs.buttonStartTimer.addEventListener('click', clickOnStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Report.failure('Please choose a date in the future');

      refs.buttonStartTimer.disabled = isDisabled;
    }
    if (selectedDates[0] > Date.now()) {
      refs.buttonStartTimer.disabled = !isDisabled;
      Notiflix.Notify.success('Success');
      choseDate = selectedDates[0];
    }
  },
};

flatpickr(refs.timePickerInput, options);

function clickOnStart() {
  refs.buttonStartTimer.disabled = isDisabled;
  refs.timePickerInput.disabled = isDisabled;

  let timeDifference = choseDate - Date.now();
  renderTime(convertMs(timeDifference));

  const idInterval = setInterval(() => {
    timeDifference = choseDate - Date.now();
    if (timeDifference < 0) {
      Notiflix.Report.warning('Time over');
      clearInterval(idInterval);
      return;
    }

    renderTime(convertMs(timeDifference));
  }, 1000);
}

function renderTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
