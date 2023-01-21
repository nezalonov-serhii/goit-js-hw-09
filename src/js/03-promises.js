import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
};

refs.formEl.addEventListener('submit', onclickCreate);

function onclickCreate(e) {
  e.preventDefault();

  let defaltDelay = +refs.delayInput.value;
  let defalAmount = 1;

  setTimeout(() => {
    createPromise(defalAmount, defaltDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      })
      .finally(() => {
        defalAmount += 1;
        defaltDelay += +refs.stepInput.value;
      });

    const intervalId = setInterval(() => {
      if (refs.amountInput.value < defalAmount) {
        clearInterval(intervalId);
        defalAmount = 0;
        return;
      }
      createPromise(defalAmount, defaltDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        })
        .finally(() => {
          defaltDelay += +refs.stepInput.value;
          defalAmount += 1;
        });
    }, +refs.stepInput.value);
  }, defaltDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    if (shouldResolve) {
      // Fulfill
      res({ position, delay });
    } else {
      // Reject
      rej({ position, delay });
    }
  });
}
