import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interface';


const GIPHY_API_KEY = '4cPiS7rFHknLPmQavwwi2WDW5vo5X34u'
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];



  private _tagsHistory: string[]= [];
  private apiKey: string = '4cPiS7rFHknLPmQavwwi2WDW5vo5X34u';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs'

  constructor( private http: HttpClient) { }

  get tagHistory(){
    return [...this._tagsHistory];
  }


  private organizedHistory(tag:string){
      tag = tag.toLowerCase();

      if (this._tagsHistory.includes(tag)){
        this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag)
      }

      this._tagsHistory.unshift(tag);

      this._tagsHistory = this._tagsHistory.splice(0,10)
      this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify (this._tagsHistory))
  }


 searchTag ( tag: string):void {

  if (tag.length === 0) return;
    this.organizedHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe( resp =>{

      this.gifList = resp.data;
      console.log({gifs: this.gifList});

    })


  /*   fetch('http://api.giphy.com/v1/gifs/search?api_key=4cPiS7rFHknLPmQavwwi2WDW5vo5X34u&q=valorant&limit=10')
    .then( resp => resp.json())
    .then(data => console.log(data)); */

  }





}
