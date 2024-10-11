import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

interface Pais {
  cca3: string; // Use cca3 as ID
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(
    private http: HttpClient) {
  }

  traerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl).pipe(
      map(paises => paises.sort((a, b) => a.name.common.localeCompare(b.name.common)))
    );
  }
}
