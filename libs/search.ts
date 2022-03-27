const URL = `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID}&hl=vi&num=10&safe=active`;
export const getSearchResults = async (
  query: string,
  start = 0,
  searchType?: string
) => {
    let url;
    if (searchType) {
        url = `${URL}&q=${query}&searchType=${searchType}&start=${start}`
    } else {
        url = `${URL}&q=${query}&start=${start}`
    }
  const res = await fetch(url);
  const data = await res.json();
  console.log("🚀custom search data", data)
  return data;
};
