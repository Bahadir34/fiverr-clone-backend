const error = (status, message) => {
  // burada bir error nesnesi olusturulucak, bu hata nesnesi doldurulacak
  const err = new Error(message);
  err.status = status;

  // bu hata nesnesi cagirildigi yere return edilecek
  return err;
};

export default error;
