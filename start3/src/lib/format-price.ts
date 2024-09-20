export const formatPrice = (price: number) => {
	return price.toLocaleString("en-ZA", {
	  style: "currency",
	  currency: "ZAR",
	  currencyDisplay: "symbol",
	});
  };