import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IAppShellConfig } from './config.interfaces';

@Injectable({
    providedIn: 'root'
})
export class AppShellConfig {
    static settings: IAppShellConfig;

    constructor(private http: HttpClient) { }

    load(): Promise<void | IAppShellConfig> {
        const configFile = './assets/config/app-shell.config' + ((!isDevMode()) ? '.prod' : '') + '.json';

        return this.http.get<IAppShellConfig>(configFile).pipe(
            tap(configSettings => {
                AppShellConfig.settings = configSettings;
            })
        )
            .toPromise()
            .catch((error: any) => {
                console.log(`Could not load file '${configFile}'`, error);
            });
    }
}
