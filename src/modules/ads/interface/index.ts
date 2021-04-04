import { Document } from 'mongoose';

interface IAdsOperations {
    getAds: (getAdsQueryParams?: any) => Promise<Document<any, {}>[]>;
    getBestAd: (getAdsQueryParams?: any) => Promise<Document<any, {}>> | null;
    createAd: (newAd: any) => Promise<void>;
}

export {
    IAdsOperations
}