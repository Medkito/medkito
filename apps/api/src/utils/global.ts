var sanitize = require("sanitize-filename");

export function isUrlImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export function getFileExtension(fileName) {
  var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  var fileExtension = fileName.match(patternFileExtension);
  return fileExtension[0];
}

export function getSafeFilename(fileName) {
  const fileExtension = getFileExtension(fileName);
  const woExt = fileName.split(fileExtension)[0];
  const clean = sanitize(woExt.replace(/[^a-z0-9]/gi, "_").toLowerCase());
  const final = clean + fileExtension;
  return final;
}
