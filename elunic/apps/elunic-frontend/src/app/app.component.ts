import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'elunic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'elunic-frontend';
  message: string = '';
  items: { label: string, value: number }[] = [];
  isLoading = true;

  constructor(private readonly _dataService: DataService) {
    const jsonData = {
      "message": "hello",
      "items": [1, 2, 3]
    };

    this.message = jsonData.message;
    this.items = jsonData.items.map(item => ({
      label: `Item ${item}`,
      value: item
    }));
  }

  ngOnInit(): void {
    this._dataService.getData().subscribe({
      next: (data) => {
        this.message = data.message;
        this.items = data.items;
        this.isLoading = false;
      },
      error: () => {
        this.message = 'Error loading data';
        this.isLoading = false;
      }
    });
  }
  
}
