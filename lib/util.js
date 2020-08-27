const encodeQueryParams = params => {
  const strs = [];
  Object.keys(params).forEach(key => {
    strs.push(`${key}=${encodeURIComponent(params[key])}`);
  })
  return strs.join("&");
}

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

module.exports = {
  encodeQueryParams,
  isObjectEmpty
}