const now = new Date();
console.log(now.getDay());
console.log(Math.round(Date.now()/1000));
console.log(now.getSeconds() + (60 * now.getMinutes()) + (60 * 60 * now.getHours()));
const date = new Date(now.toLocaleDateString());
console.log(now.toLocaleDateString());
console.log(date.getTime());
console.log(Date.now().getDay());