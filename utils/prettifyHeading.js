
// Replace underscores with spaces and capitalize the first character of each word
export default function prettifyHeading(text) {
  text = text.replace(/_/g, ' ');
  text = text.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  return text;
}