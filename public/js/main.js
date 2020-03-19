const form = document.forms.formTest;
const btn = document.querySelector('.specialBtn');
const respTxt = document.querySelector('.resttext');
const userAddedTxt = document.querySelector('.userAddedTxt');


async function loadData(data) {
  try {
    const response = await axios.post('postData', data);
    const dataRes = response.data;
    // console.log(dataRes.userName);
    if (dataRes.valid) {
      form.name.value = '';
      userAddedTxt.innerText = dataRes.userName.userName;
    } else {
      userAddedTxt.innerText = '';
    }
    respTxt.innerText = dataRes.status;
    btn.classList.remove('disabled');
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  btn.classList.add('disabled');
  const data = new FormData(form);
  loadData(data);
});
