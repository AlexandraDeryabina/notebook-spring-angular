import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notebook} from "../model/Notebook";
import {plainToClass, serialize} from "class-transformer";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class NotebookService {
  private resourceUrl: string = environment.apiUrl + 'api/notebook';

  constructor(private http: HttpClient) { }

  // Загрузка реестра записной книжки
  load(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.resourceUrl + '/load')
      .pipe(map(response => plainToClass(Notebook, response as object[])));
  }

  // Загрузка одного элемента записной книжки по id
  loadById(id: number): Observable<Notebook> {
    return this.http.get<Notebook>(this.resourceUrl + '/load/' + id)
      .pipe(map(response => plainToClass(Notebook, response)));
  }

  // Сохранение одного элемента записной книжки
  save(notebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(
      this.resourceUrl + '/save',
      serialize(notebook),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(map(response => plainToClass(Notebook, response)));
  }

  // Удаление одного элемента записной книжки по id
  delete(id: number): Observable<Notebook> {
    return this.http.delete<Notebook>(this.resourceUrl + '/delete/' + id)
      .pipe(map(response => plainToClass(Notebook, response)));
  }
}
