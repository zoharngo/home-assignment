import { program } from 'commander';
import dao from '../src/modules/ads/dao';
import AdsModel from '../src/modules/ads/models/ad';
import { DUMMY_ADS } from '../src/dummy_data';
program.command('create:dummy:ads:collection').action(async function createDummyAds() {
    const adsDAO = dao.getInstance();

    try {
        await adsDAO.connect();
        await AdsModel.deleteMany({});
        await AdsModel.insertMany(DUMMY_ADS);
        console.info(DUMMY_ADS, 'inserted!');
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await adsDAO.disconnect();
    }
});

program.parse(process.argv);
