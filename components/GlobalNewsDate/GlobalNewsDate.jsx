// utils/banglaDateFormatter.js
export const GlobalNewsDate = (isoDateString) => {
    // "2026-01-20T10:35:34.000000Z" format থেকে বাংলায় কনভার্ট
    const date = new Date(isoDateString);
    
    // বাংলা মাসের নাম
    const banglaMonths = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 
        'মে', 'জুন', 'জুলাই', 'আগস্ট', 
        'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    
    // বাংলা সংখ্যা (যদি চান)
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    
    // তারিখের অংশগুলো নিন
    const day = date.getDate();
    const month = date.getMonth(); // 0-11
    const year = date.getFullYear();
    
    // দুই অঙ্কের দিন (04)
    const dayFormatted = day.toString().padStart(2, '0');
    
    // যদি বাংলা সংখ্যায় চান
    const dayInBangla = convertToBanglaDigits(dayFormatted);
    const yearInBangla = convertToBanglaDigits(year);
    // সময়ের অংশ (12-hour) + AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;

    const hourFormatted = hours.toString().padStart(2, '0');
    const minuteFormatted = minutes.toString().padStart(2, '0');

    const hourInBangla = convertToBanglaDigits(hourFormatted);
    const minuteInBangla = convertToBanglaDigits(minuteFormatted);

    // ফর্ম্যাটেড তারিখ ও সময়
    return `${dayInBangla} ${banglaMonths[month]} ${yearInBangla}, ${hourInBangla}:${minuteInBangla} ${ampm}`;
};

// বাংলা সংখ্যায় কনভার্ট করার ফাংশন
export const convertToBanglaDigits = (number) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().replace(/\d/g, (digit) => banglaDigits[digit]);
};

export default GlobalNewsDate;