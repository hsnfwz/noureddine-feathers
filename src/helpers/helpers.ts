// interfaces
import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';

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

const getMinPrice = (productPriceArr: I_ProductPriceTableRecord[]) => {
  const prices: number[] = productPriceArr.map((productPriceObj: I_ProductPriceTableRecord) => productPriceObj.price);
  return Math.min(...prices);
}

const getMaxPrice = (productPriceArr: I_ProductPriceTableRecord[]) => {
  const prices: number[] = productPriceArr.map((productPriceObj: I_ProductPriceTableRecord) => productPriceObj.price);
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

const formatPackage = (quantity: number, showBrackets: boolean = false) => {
  let _quantity: string = '';

  if (quantity === 1) {
    _quantity = showBrackets ? '(when you buy 1 unit)' : '1 unit';
  } else if (quantity === 10) {
    _quantity = showBrackets ? '(when you buy 10 units)' : '10 units';
  } else if (quantity === 12) {
    _quantity = showBrackets ? '(when you buy 1 dz.)': '1 dz.';
  } else if (quantity === 36) {
    _quantity = showBrackets ? '(when you buy 3 dz.)': '3 dz.';
  } else if (quantity === 60) {
    _quantity = showBrackets ? '(when you buy 5 dz.)': '5 dz.';
  }

  return _quantity;
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
  formatPackage,
}