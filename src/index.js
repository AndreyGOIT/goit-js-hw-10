import "./css/styles.css";
import debounce from "lodash.debounce";
import { fetchCountries } from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

// 1. Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс
// name и возвращает промис с массивом стран - результатом запроса.
// Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.

// 2. В ответе от бэкенда возвращаются объекты, большая часть свойств которых
// тебе не пригодится.Чтобы сократить объем передаваемых данных добавь строку
// параметров запроса - так этот бэкенд реализует фильтрацию полей.
// Ознакомься с документацией синтаксиса фильтров.

// Тебе нужны только следующие свойства:

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

const input = document.querySelector("input");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

input.addEventListener(
  "input",
  debounce(() => {
    fetchCountries(name)
      .then((countries) => renderUserList(countries))
      .catch((error) => console.log(error));
  }, DEBOUNCE_DELAY)
);

// function fetchCountries() {
//   const searchParams = new URLSearchParams({
//     _limit: 5,
//     _sort: "name",
//   });

//   console.log(searchParams.toString()); // "_limit=5&_sort=name"

//   const url = `https://jsonplaceholder.typicode.com/users?${searchParams}`;
//   console.log(url); // "https://jsonplaceholder.typicode.com/users?_limit=5&_sort=name"

//   return fetch("https://restcountries.com/v3.1/name/germany").then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

function renderUserList(countries) {
  const markup = countries
    .map((country) => {
      return `<li>
          <p><img src="${country.flags.svg}" alt="flag" width=30><b> ${country.name.official}</b></p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${country.languages}</p>        
        </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
}

// 3. Название страны для поиска пользователь вводит в текстовое поле
// input#search - box. HTTP - запросы выполняются при наборе имени страны,
// то есть по событию input.Но, делать запрос при каждом нажатии клавиши нельзя,
// так как одновременно получится много запросов и они будут выполняться в непредсказуемом порядке.

// 3.1. Необходимо применить приём Debounce на обработчике события и делать HTTP-запрос
// спустя 300мс после того, как пользователь перестал вводить текст.
// Используй пакет lodash.debounce.

// 3.2. Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется,
// а разметка списка стран или информации о стране пропадает.

// 3.3. Выполни санитизацию введенной строки методом trim(), это решит проблему
// когда в поле ввода только пробелы или они есть в начале и в конце строки.

// 4.1. Если в ответе бэкенд вернул больше чем 10 стран, в интерфейсе пояляется
// уведомление о том, что имя должно быть более специфичным.Для уведомлений
//используй библиотеку notiflix и выводи такую строку
// "Too many matches found. Please enter a more specific name.".

// 4.2. Если бэкенд вернул от 2-х до 10-х стран, под тестовым полем отображается
// список найденных стран.Каждый элемент списка состоит из флага и имени страны.

// 4.3. Если результат запроса это массив с одной страной, в интерфейсе
// отображается разметка карточки с данными о стране: флаг, название, столица,
// население и языки.

// 5. Обработка ошибки
// Если пользователь ввёл имя страны которой не существует, бэкенд вернёт
// не пустой массив, а ошибку со статус кодом 404 - не найдено.
// Если это не обработать, то пользователь никогда не узнает о том, что поиск
// не дал результатов.
// Добавь уведомление "Oops, there is no country with that name" в случае ошибки
// используя библиотеку notiflix.
