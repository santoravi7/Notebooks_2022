import { Injectable } from '@angular/core';
import { NotebookData } from './notebook-data';
import { Observable,of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn : 'root',
})

export class NotebooksService {
  private notebooksUrl = "api/notebooks";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http : HttpClient,) { }

  getAllNotebooks (): Observable<NotebookData[]> {
    return this.http.get<NotebookData[]>(this.notebooksUrl);
  }

  getNoteBook(id: number): Observable<NotebookData> {
    console.log("This is get notebook in service");
    const url = `${this.notebooksUrl}/${id}`;
    return this.http.get<NotebookData>(url);
  }

  getNote(id: number): Observable<NotebookData> {
    // console.log("note id in Get Note = "+id)
    const url = `${this.notebooksUrl}/${id}`;
    return this.http.get<NotebookData>(url);
   
  }

  addNotebook (notebook: NotebookData): Observable<NotebookData> {
    return this.http.post<NotebookData>(this.notebooksUrl, notebook, this.httpOptions);
  }

  deleteNotebook (notebook: NotebookData | number): Observable<NotebookData> {
    const id = typeof notebook === 'number' ? notebook : notebook.id;
    const url = `${this.notebooksUrl}/${id}`;

    return this.http.delete<NotebookData>(url, this.httpOptions);
  }

  deleteNote (notebook: NotebookData | number): Observable<NotebookData> {
    const id = typeof notebook === 'number' ? notebook : notebook.id;
  
    const url = `${this.notebooksUrl}/${id}`;

    return this.http.delete<NotebookData>(url, this.httpOptions);
  }

  updateNotebook (notebook: NotebookData): Observable<any> {
    return this.http.put(this.notebooksUrl, notebook, this.httpOptions);
  }

}