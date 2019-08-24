export default function filterDataByString(data, text) {
  let filteredData = data.filter((film) => {
    let matched = false;

    // Make all text lowercase and remove line breaks for easier comparisons.
    const searchText = text.toLowerCase();
    const formattedTitle = film.title.toLowerCase();
    const formattedDescription = film.opening_crawl.toLowerCase().replace(/(\r\n|\n|\r)/gm, " ");

    // Blank search field should not filter anything.
    if (searchText == '') return true;

    // Check each word in search field.
    searchText.split(' ').forEach((word) => {
      if (formattedTitle.includes(word) || formattedDescription.includes(word)) matched = true;
    });
    return matched;
  });
  return filteredData;
}