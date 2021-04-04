import { IAdsOperations } from './interface';
import mongoose from 'mongoose';
import AdsModel from './models/ad';
import { IDaoBase } from '../../daoBase';
import { MONGODB_URI, MONGODB_CONNECTION_OPTIONS } from '../../config';
import { extractAndValidateQueryParams, getBestAds } from './hooks';

export default class Dao implements IAdsOperations, IDaoBase {
    private static instance: Dao;

    async getAds(getAdsQueryParams?: any) {
        try {
            const [lat, long, tags] = extractAndValidateQueryParams(getAdsQueryParams);
            return await getBestAds(lat, long, tags);
        } catch (error) {
            throw error;
        }
    }

    async getBestAd(getAdsQueryParams?: any) {
        try {
            const [lat, long, tags] = extractAndValidateQueryParams(getAdsQueryParams);
            const bestMatchAds = await getBestAds(lat, long, tags);
            return bestMatchAds?.[0] ?? null;
        } catch (error) {
            throw error;
        }
    }

    async createAd(newAd: any = undefined) {
        try {
            if (newAd) {
                AdsModel.insertMany(newAd);
            }
        } catch (error) {
            throw error;
        }
    }

    async connect() {
        try {
            if (mongoose.connection.readyState === 0) {
                await mongoose.connect(MONGODB_URI, MONGODB_CONNECTION_OPTIONS);
                console.info('Connected to MongoDB');
            }
        } catch (error) {
            console.error(error);
            throw 'db connection failure';
        }
    }

    async disconnect() {
        try {
            if (mongoose.connection.readyState === 1) {
                await mongoose.disconnect();
                console.info('Disconnected from MongoDB');
            }
        } catch (error) {
            console.error(error);
        }
    }

    static getInstance(): Dao {
        if (!Dao.instance) {
            Dao.instance = new Dao();
        }
        return Dao.instance;
    }
}
