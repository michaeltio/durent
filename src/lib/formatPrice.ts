const formatPrice = (
  value: string | number,
  locale: string = "id-ID",
  currency: string = "IDR",
) => {
  const raw =
    typeof value === "number"
      ? value
      : Number(
          value
            .replace(/[^\d.,-]/g, "") // buang simbol selain angka, titik, koma
            .replace(/\./g, "") // buang pemisah ribuan
            .replace(",", "."), // ubah desimal koma ke titik
        );

  if (Number.isNaN(raw)) return "Rp0";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(raw);
};

export default formatPrice;
