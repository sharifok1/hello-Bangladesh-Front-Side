export const FormatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    // বাংলা সংখ্যা কনভার্টার
    const toBanglaNumber = (num) => {
        const banglaDigits = {
            '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
            '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
        };
        return num.toString().replace(/[0-9]/g, digit => banglaDigits[digit]);
    };
    
    // সময়ের একক অনুযায়ী টেক্সট
    const timeUnits = [
        { limit: 60, unit: 'second', bangla: 'সেকেন্ড' },
        { limit: 3600, unit: 'minute', bangla: 'মিনিট' },
        { limit: 86400, unit: 'hour', bangla: 'ঘন্টা' },
        { limit: 604800, unit: 'day', bangla: 'দিন' },
        { limit: 2592000, unit: 'week', bangla: 'সপ্তাহ' },
        { limit: 31536000, unit: 'month', bangla: 'মাস' },
        { limit: Infinity, unit: 'year', bangla: 'বছর' }
    ];
    
    if (diffInSeconds < 10) return 'এখনই';
    
    for (const timeUnit of timeUnits) {
        if (diffInSeconds < timeUnit.limit) {
            const divisor = timeUnits[timeUnits.indexOf(timeUnit) - 1]?.limit || 1;
            const value = Math.floor(diffInSeconds / divisor);
            const banglaValue = toBanglaNumber(value);
            
            return `${banglaValue} ${timeUnit.bangla} আগে`;
        }
    }
};

export default FormatTimeAgo;