import { distanceFormula } from '../../../helpers';
import AdsModel from '../models/ad';

function extractAndValidateQueryParams(getAdsQueryParams?: any) {
    const { lat = 0.0, long = 0.0, tag = [] } = getAdsQueryParams ?? undefined;
    if (Number.isNaN(Number.parseFloat(lat)) || Number.isNaN(Number.parseFloat(long))) {
        throw Error(`error while parsing queries param value ${lat} or ${long}`);
    }
    const tags = Array.isArray(tag) ? tag : typeof tag === 'string' ? [tag] : [];

    return [lat, long, tags];
}

async function getBestAds(lat: number, long: number, tags: Array<string>) {
    try {
        const ads = await AdsModel.find(
            {
                'targeting.operatingSystems': { $ne: [] },
                'targeting.browsers': { $ne: [] },
            },
            {
                __v: false,
            },
        ).select('-_id');

        function sort(a: any, b: any) {
            let countA = 0;

            for (const tag of tags) {
                if (a.targeting.tags.includes(tag)) {
                    countA++;
                }
            }

            let countB = 0;
            for (const tag of tags) {
                if (b.targeting.tags.includes(tag)) {
                    countB++;
                }
            }
            return countB - countA;
        }

        const filterlongDistanceAds = (ad: any) => {
            const { lat: lat1, long: long1, radius } = ad.targeting.location;
            return distanceFormula(lat, long, lat1, long1, 'K') < radius;
        };

        return ads.filter(filterlongDistanceAds).sort(sort);
    } catch (error) {
        throw error;
    }
}

export { extractAndValidateQueryParams, getBestAds };
