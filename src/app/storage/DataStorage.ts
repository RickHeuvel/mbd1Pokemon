import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataStorage {


    constructor(private storage: Storage) {
    }
     public save(name: string) {
        this.storage.length().then((keyLength) => {
            this.storage.set(keyLength.toString(), name)
                .then(
                    () => console.log('Stored item!' + name),
                    error => console.error('Error storing item', error)
                );
        } );
    }

    async getPokemonNames() {
        const names = [];
        await this.storage.forEach((value: String) => {
            names.push(value);
        });
        return names;
    }
}
