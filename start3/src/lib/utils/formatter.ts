export const numberWithCommas = (amount: any) => {
    if (!amount) return '0';
    let formattedAmount = formatForDisplay(amount) * 1;
    return formattedAmount.toLocaleString(undefined); // Use browser locale
};

export const formatForDisplay = (amount: any, fix?: undefined) => {
    amount = Number(amount);

    if (!amount || isNaN(amount)) return '0';

    if (!fix && amount.toFixed(6) * 1 === Math.round(amount)) return Math.round(amount).toString();

    if (fix) return amount.toFixed(fix);

    if (amount >= 10000 || amount <= -10000) {
        return Math.round(amount).toString();
    } else if (amount >= 10 || amount <= -10) {
        return amount.toFixed(2);
    } else if (amount >= 1 || amount <= -1) {
        return amount.toFixed(4);
    } else if (amount >= 0.01 || amount <= -0.01) {
        return amount.toFixed(5);
    } else if (amount >= 0.001 || amount <= -0.001) {
        return amount.toFixed(6);
    } else {
        return amount.toFixed(8);
    }
};