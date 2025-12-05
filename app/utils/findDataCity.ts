export const findCityWithCoor = async (
  latitude: number,
  longitude: number,
  setErrorMessage: (arg0: string) => void
) => {
  try {
    const response = await fetch(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${process.env.EXPO_PUBLIC_API_HERE}`
    );

    if (!response.ok) {
      throw 'Erreur lors de la requête';
    }

    const res = await response.json();
    if (!res.items[0]) throw 'No cities found.';
    return {
      city: res.items[0].address?.city,
      region: res.items[0].address?.county,
      country: res.items[0].address?.countryName,
    };
  } catch (err) {
    setErrorMessage("Erreur réseau, la requete n'a pas aboutis");
    return null;
  }
};

export const findCitiesWithInputName = async (
  cityName: string,
  setErrorMessage: (arg0: string) => void
) => {
  setErrorMessage('');
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
    );
    if (!response.ok) {
      throw 'Erreur lors de la requête';
    }
    const data = await response.json();
    if (!data || !data.results || data.results.length === 0)
      throw 'Aucune ville trouvée.';

    return data.results;
  } catch (error: any) {
    setErrorMessage(error);
    return null;
  }
};
