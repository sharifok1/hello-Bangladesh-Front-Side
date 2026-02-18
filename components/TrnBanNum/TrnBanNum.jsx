// Utility function to convert English numbers to Bangla numbers
const TrnBanNum = (num) => {
  if (num === undefined || num === null) return '০';
  
  const enToBn = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };

  return num
    .toString()
    .split('')
    .map((digit) => enToBn[digit] || digit)
    .join('');
};

export default TrnBanNum;
