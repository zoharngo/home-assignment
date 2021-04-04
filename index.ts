import express from 'express';
import dao from './src/modules/ads/dao';

const app = express();
const adsDAO = dao.getInstance();
const mq = require('./src/mq');

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.get('/ads', async (req, res) => {
    // TODO: COMPLETE LOGIC.
    try {
        const ads = await adsDAO.getAds(req.query);
        res.json({ ads });
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            massage: error.message,
        });
    }
});
app.get('/ads/best', async (req, res) => {
    // TODO: COMPLETE LOGIC.
    try {
        const ad = await adsDAO.getBestAd(req.query);
        if (ad) {
            res.json(ad);
        } else throw new Error("can't find best ad");
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            massage: error.message,
        });
    }
});

mq.subscribe('create-ad', (newAd: {} = {}, ack: () => void = () => {}, nack: () => void = () => {}) => {
    // TODO: COMPLETE LOGIC.
    try {
        adsDAO.createAd(newAd);
        ack();
    } catch (error) {
        console.error(error);
        nack();
        throw error;
    }
});

app.listen(3333, async () => {
    try {
        await adsDAO.connect();
    } catch {
        process.exit(1);
    }
});
