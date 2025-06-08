import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
const ITEMS_KEY = 'articles';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    /** Save one more article onto the existing array, or create a new array if none */
    async setObject(article: any): Promise<void> {
        const ret = await Storage.get({ key: ITEMS_KEY });
        const articles = ret.value ? JSON.parse(ret.value) : [];
        articles.push(article);
        await Storage.set({
            key: ITEMS_KEY,
            value: JSON.stringify(articles)
        });
    }

    /** Retrieve the array of saved articles (may be empty) */
    async getObject(): Promise<any[]> {
        const ret = await Storage.get({ key: ITEMS_KEY });
        return ret.value ? JSON.parse(ret.value) : [];
    }

    /** Clear all saved articles */
    async clear(): Promise<void> {
        await Storage.clear();
    }
}

