export const createFilterFromRequest = (req) => {
  //console.log("REQ.QUERY :", req.query);

  const filters = {};

  if (req.query.min || req.query.max) {
    filters.packagePrice = {};

    if (req.query.min) filters.packagePrice.$gte = Number(req.query.min);
    if (req.query.max) filters.packagePrice.$lte = Number(req.query.max);
  }
  if (req.query.category) filters.category = req.query.category;
  if (req.query.search)
    filters.title = { $regex: req.query.search, $options: "i" }; // insensitive -> buyuk kucuk harf duyarliligini kaldirir

  //console.log("FILTERS : ", filters);
  return filters;
};
