import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor() { }

    CONFIG = {
        URL: 'https://ingeta.com/wp-json' // Place your wordpress website URL at here
    };
}
