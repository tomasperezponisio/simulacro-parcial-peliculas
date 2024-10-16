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

  private apiUrl: string = 'https://restcountries.com/v3.1/all';
  private apiUrlbyName: string = 'https://restcountries.com/v3.1/name/';

  constructor(
    private http: HttpClient) {
  }

  traerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl).pipe(
      map(paises => paises.sort((a, b) => a.name.common.localeCompare(b.name.common)))
    );
  }

  traerPaisporNombre(nombre: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrlbyName}${nombre}`).pipe(
      map(response => response[0])
    );
  }
}
