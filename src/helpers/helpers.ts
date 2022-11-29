// interfaces
import type I_ProductPriceQuantityTableRecord from '$interfaces/I_ProductPriceQuantityTableRecord';

const formatCurrency = (amount: number) => {
  const formatToUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  return formatToUSD.format(amount);
}

const formatCategory = (category: string) => {
  const _category = category.split(' ').join('-').toLowerCase();
  return _category;
}

const calculateAverageRating = (ratings: number[]) => {
  if (!ratings) return 0;

  let sum = 0;

  ratings.forEach(r => sum = sum + r);

  const average = sum / ratings.length;
  const result = +average.toFixed(1);

  return result;
}

const calculateSalePrice = (price: number, percent: number) => {
  const salePrice = price - (price*(percent/100));
  return salePrice;
}

const getMinPrice = (priceQuantityArr: I_ProductPriceQuantityTableRecord[]) => {
  const prices: number[] = priceQuantityArr.map((priceQuantityObj: I_ProductPriceQuantityTableRecord) => priceQuantityObj.price);
  return Math.min(...prices);
}

const getMaxPrice = (priceQuantityArr: I_ProductPriceQuantityTableRecord[]) => {
  const prices: number[] = priceQuantityArr.map((priceQuantityObj: I_ProductPriceQuantityTableRecord) => priceQuantityObj.price);
  return Math.max(...prices);
}

const groupBy = (data: any, key: any) => {
  return data.reduce(function(previousValue: any, currentValue: any) {
    (previousValue[currentValue[key]] = previousValue[currentValue[key]] || []).push(currentValue);
    return previousValue;
  }, {});
};

const generateClass = (unconditionalClasses: string[] = [], conditionalClasses: { [conditionalClass: string]: boolean }[] = []) => {
  if (unconditionalClasses.length === 0 && conditionalClasses.length === 0) return '';

  const passedConditionalClasses = [];

  for (const conditionalClass in conditionalClasses) {
    if (conditionalClasses[conditionalClass]) passedConditionalClasses.push(conditionalClass);
  }

  const allClasses = unconditionalClasses.concat(passedConditionalClasses);

  const generatedClass = allClasses.join(' ');

  return generatedClass;
}

export {
  calculateAverageRating,
  calculateSalePrice,
  formatCurrency,
  formatCategory,
  groupBy,
  getMinPrice,
  getMaxPrice,
  generateClass,
}