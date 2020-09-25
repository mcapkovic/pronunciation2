import { URL_BOOKMARKS } from "../constants";

export function getBookmarksFromUrl() {
  const urlParameters = new URL(document.location.href).searchParams;
  const bookmarksString = urlParameters.get(URL_BOOKMARKS);
  let urlBookmarks = [];
  if (bookmarksString)
    bookmarksString.split(";").forEach((bookmarkData, index) => {
      const data = bookmarkData.split("+");
      const time = Number(data[0]);
      if (time || time > 0) urlBookmarks.push({ id: index, time });
    });
  return urlBookmarks;
}

export function getBookmarksUrlSearch(bookmarks) {
  let bookmarksString = "";
  if (bookmarks.length > 0) {
    bookmarks.forEach((bookmark) => {
      bookmarksString = `${bookmarksString}${bookmark.time};`;
    });
  }

  return `${URL_BOOKMARKS}=${bookmarksString}`;
}
