import moment from "moment-timezone";



// Mengonversi tanggal ke UTC
const startOfDayUTCNow = moment.tz('Asia/Jakarta').startOf('day').toDate();
const endOfDayUTCNow =   moment.tz('Asia/Jakarta').endOf('day').toDate();

export{startOfDayUTCNow,endOfDayUTCNow}