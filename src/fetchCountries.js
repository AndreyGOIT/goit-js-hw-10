export function fetchCountries(searchCountries) {
  const searchParams = new URLSearchParams({
    _limit: 5,
    _sort: "name",
  });

  console.log(searchParams.toString()); // "_limit=5&_sort=name"
  // const restOfUrl = searchParams.toString();

  const url = `https://restcountries.com/v3.1/name/${searchCountries}?fields=name,capital,population,flags,languages`;
  // const url = `https://restcountries.com/v3.1/name/${searchCountries}`;
  console.log(url);

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
