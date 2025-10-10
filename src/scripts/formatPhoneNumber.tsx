export const formatPhoneNumber = (value: string): string => {
    let numbers = value.replace(/\D/g, '');
    if (numbers.length === 1 && numbers[0] === '9') {
        numbers = '7' + numbers;
    }
    if (numbers === '') return '';
    let formatted = '+7';
    if (numbers.length > 1) {
        formatted += ' (' + numbers.slice(1, 4);
    }
    if (numbers.length >= 5) {
        formatted += ') ' + numbers.slice(4, 7);
    }
    if (numbers.length >= 8) {
        formatted += '-' + numbers.slice(7, 9);
    }
    if (numbers.length >= 10) {
        formatted += '-' + numbers.slice(9, 11);
    }
    return formatted;
};


export const formatCode = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 6);
}