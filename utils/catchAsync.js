import e from "./error.js";
// parametre olarak aldigi fonksiyonu calistiircak, eger fonksiyonda hata olursa hat amiddleware ine yonlendirircek
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) =>
      next(e(404, "Some datas ara missing or wrong entered")),
    );
  };
};

export default catchAsync;
