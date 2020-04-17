const getTimeStartDay = function () {
    const now = new Date();
    const date = new Date(now.toLocaleDateString());
    return date.getTime()/1000;
};

const getDayOfWeek = function () {
    const now = new Date();
    return now.getDay();
};

export default {
    getTimeStartDay,
    getDayOfWeek
}
