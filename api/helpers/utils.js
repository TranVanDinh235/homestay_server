const check_properties_validity = (obj) => {
    let count = 0;
    if (!obj) return true;
    if (obj && Object.keys(obj).length > 0) {
        Object.keys(obj).forEach(field => {
            if (obj[field] === '' || obj[field] === null || typeof obj[field] === 'undefined') count++
        });
        return count === 0
    }
    else return false
};

export default {
    check_properties_validity
}
