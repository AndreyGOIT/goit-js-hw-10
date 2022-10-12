export function fetchCountries(name) {
  const searchParams = new URLSearchParams({
    _limit: 5,
    _sort: "name",
  });

  console.log(searchParams.toString()); // "_limit=5&_sort=name"

  // const url = `https://restcountries.com/v3.1/name/?${searchParams}`;
  const url = `https://restcountries.com/v3.1/name/germany`;
  console.log(url);

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
