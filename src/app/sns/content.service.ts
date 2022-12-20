import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Content } from './Content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  allContents = new BehaviorSubject<Content[]>([]);

  constructor(private http: HttpClient) {
    this.getContents().subscribe(contents => {
      console.log(contents);
      this.allContents.next(contents);
    })
  }

  createContent(content: Content): Observable<Content> {
    return this.http.post<Content>(environment.firebaseConfig.databaseURL + '/contents.json', content);
  }

  getContents(): Observable<Content[]> {
    return this.http.get<Content[]>(environment.firebaseConfig.databaseURL + '/contents.json').pipe(
      map(contents => {
        let newContents: Content[] = [];

        for (let key in contents) {
          console.log(contents[key]);
          newContents.push({ ...contents[key]})
        }

        return newContents;
      })
    );
  }
}
