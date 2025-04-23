import {web} from "./application/web";
import {logger} from "./application/logging";
import cron from 'node-cron';
import { TiketService } from "./management/tiket/tiket-service";

async function tiketExpired(){
    await TiketService.ExpiredTiket()
}

cron.schedule('0 0 22 * * *', () => {
   tiketExpired()
},{
    timezone:"asia/jakarta"
});

web.listen(3000, () => {
    const memoryUsage = process.memoryUsage();
    console.log('Memory Usage:', memoryUsage);
    console.log(`Waktu Jakarta saat ini: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`);
    logger.info("Listening on port 3000");
})