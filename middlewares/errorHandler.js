const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Unknown error!";

  // gelistirme ortaminda da terminalde hata detaylari yazilsin
  console.error("Hata Detaylari : ", {
    message: message,
    status: statusCode,
    stack: err.stack || "No stack information!",
  });

  return res.status(err.status).json({
    status: statusCode,
    message: message,
  });
};

export default errorHandler;
