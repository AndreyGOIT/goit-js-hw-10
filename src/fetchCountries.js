// function fetchCountries(name) {}

export function fetchCountries() {
  const searchParams = new URLSearchParams({
    _limit: 5,
    _sort: "name",
  });

  console.log(searchParams.toString()); // "_limit=5&_sort=name"

  const url = `https://jsonplaceholder.typicode.com/users?${searchParams}`;
  console.log(url); // "https://jsonplaceholder.typicode.com/users?_limit=5&_sort=name"

  return fetch("https://restcountries.com/v3.1/name/germany").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
