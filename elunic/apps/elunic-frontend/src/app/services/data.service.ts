import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface ListItem {
  label: string;
  value: number;
}

@Injectable({
  providedIn: 'root' // Or provide in component for standalone
})
export class DataService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<{ message: string; items: ListItem[] }> {
    return this.http.get<{ message: string; items: number[] }>(`${this.baseUrl}`)
      .pipe(
        map(response => ({
          message: response.message,
          items: this.transformItems(response.items)
        })),
        catchError(() => of({
          message: 'Failed to load data',
          items: []
        }))
      );
  }

  private transformItems(items: number[]): ListItem[] {
    return items.map(item => ({
      label: `Item ${item}`,
      value: item
    }));
  }
}