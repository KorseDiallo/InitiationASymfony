import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';
import { Cocktail } from '../interfaces/cocktail.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  public cocktails$:BehaviorSubject<Cocktail[]>=new BehaviorSubject<Cocktail[]>([]);

  // public getCocktail(index:number){
  //   return this.cocktails$.value[index];
  // }

  // fonction avec l'api
  public getCocktail(index:number):Observable<Cocktail>{
    return this.cocktails$.pipe(
      filter((cocktails:Cocktail[])=> cocktails!=null),
      map((cocktails:Cocktail[])=> cocktails[index])
    )
  }

  // public addCocktail(cocktail:Cocktail){
  //   const value= this.cocktails$.value;
  //   this.cocktails$.next([...value,cocktail]);
  // }

  public addCocktail(cocktail:Cocktail):Observable<Cocktail>{
    return this.http.post<Cocktail>("https://restapi.fr/api/CocktailsTest",cocktail).pipe(
      tap((savedCocktail:Cocktail)=>{
        const value= this.cocktails$.value;
        this.cocktails$.next([...value,savedCocktail])
      })
    )
  }

  // public editCocktail(editedCocktail:Cocktail){
  //   const value=this.cocktails$.value;
  //   this.cocktails$.next(value.map((cocktail:Cocktail) =>{
  //     if(cocktail.name===editedCocktail.name){
  //       return editedCocktail;
  //     }else{
  //         return cocktail;
  //     }
  //   }))
  // }

  public editCocktail(cocktailId:string,editedCocktail:Cocktail):Observable<Cocktail>{
    return this.http.patch<Cocktail>(`https://restapi.fr/api/CocktailsTest/${cocktailId}`,editedCocktail).pipe(
      tap((savedcocktail:Cocktail)=>{
        const value=this.cocktails$.value;
        this.cocktails$.next(value.map((cocktail:Cocktail)=>{
          if(cocktail.name===savedcocktail.name){
            return savedcocktail;
          }else{
            return cocktail;
          }
        }))

      }))
  }

  public fetchCocktail(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>('https://restapi.fr/api/CocktailsTest').pipe(
      tap((cocktail:Cocktail[])=>{
        this.cocktails$.next(cocktail)
      })
    )
  }

  constructor(private http:HttpClient) { 

    // envoie de la requete post à l'api
    //  this.seed()
  }


  //creation des cocktail avec l'api dans la fonction seed
  // public seed(){
  //   this.http.post('https://restapi.fr/api/CocktailsTest', {
  //     name:"mojito",
  //      img:"https://static.750g.com/images/640-420/b520523117d647dab6b842a36f4cc7f5/mojito-le-vrai.jpg",
  //     description:"Le mojito, prononcé [moˈxito] en espagnol, ou mojito, morito, ou mohito en français, est un cocktail traditionnel de la cuisine cubaine et de la culture de Cuba, à base de rhum, de soda, de citron vert, et de feuilles de menthe fraîche",
  //     ingredients:[
  //       {
  //         nom:"Menthe",
  //         quantite:2
  //       },
  //       {
  //         nom:"Perrier",
  //         quantite:1
  //       },
  //       {
  //         nom:"Rhum",
  //         quantite:3
  //       }
  //     ]
  //   }).subscribe();

  //   this.http.post('https://restapi.fr/api/CocktailsTest', {
  //     name:"Cosmopolitan",
  //      img:"https://www.1001cocktails.com/wp-content/uploads/1001cocktails/2023/03/gettyimages-1025098506-768x512.jpg",
  //     description:"Le cosmopolitan est un cocktail américain traditionnel.",
  //     ingredients:[
  //       {
  //         nom:"Cranberry",
  //         quantite:1
  //       },
  //       {
  //         nom:"Citron",
  //         quantite:2
  //       },
  //       {
  //         nom:"Vodka",
  //         quantite:3
  //       }
  //     ]
  //   }).subscribe();

  //   this.http.post('https://restapi.fr/api/CocktailsTest', {
  //     name:"Mai Tai",
  //     img:"https://www.1001cocktails.com/wp-content/uploads/1001cocktails/2023/03/118815_origin-768x512.jpg",
  //     description:"Le mai tai est un cocktail tiki à base de rhum.",
  //     ingredients:[
  //       {
  //         nom:"Rhum",
  //         quantite:1
  //       },
  //       {
  //         nom:"Citron",
  //         quantite:2
  //       },
  //       {
  //         nom:"Triple Sec",
  //         quantite:3
  //       }
  //     ]
  //   }).subscribe();

    
  // }


    //sans Api donnée ajoutée statiquement

  // public cocktails$:BehaviorSubject<Cocktail[]>=new BehaviorSubject(
  //   [
  //     // {
  //     //   name:"mojito",
  //     //    img:"https://static.750g.com/images/640-420/b520523117d647dab6b842a36f4cc7f5/mojito-le-vrai.jpg",
  //     //   description:"Le mojito, prononcé [moˈxito] en espagnol, ou mojito, morito, ou mohito en français, est un cocktail traditionnel de la cuisine cubaine et de la culture de Cuba, à base de rhum, de soda, de citron vert, et de feuilles de menthe fraîche",
  //     //   ingredients:[
  //     //     {
  //     //       nom:"Menthe",
  //     //       quantite:2
  //     //     },
  //     //     {
  //     //       nom:"Perrier",
  //     //       quantite:1
  //     //     },
  //     //     {
  //     //       nom:"Rhum",
  //     //       quantite:3
  //     //     }
  //     //   ]
  //     // },
  //     // {
  //     //   name:"Cosmopolitan",
  //     //   img:"https://www.1001cocktails.com/wp-content/uploads/1001cocktails/2023/03/gettyimages-1025098506-768x512.jpg",
  //     //   description:"Le cosmopolitan est un cocktail américain traditionnel.",
  //     //   ingredients:[
  //     //     {
  //     //       nom:"Cranberry",
  //     //       quantite:1
  //     //     },
  //     //     {
  //     //       nom:"Citron",
  //     //       quantite:2
  //     //     },
  //     //     {
  //     //       nom:"Vodka",
  //     //       quantite:3
  //     //     }
  //     //   ]
  //     // },
  //     // {
  //     //   name:"Mai Tai",
  //     //   img:"https://www.1001cocktails.com/wp-content/uploads/1001cocktails/2023/03/118815_origin-768x512.jpg",
  //     //   description:"Le mai tai est un cocktail tiki à base de rhum.",
  //     //   ingredients:[
  //     //     {
  //     //       nom:"Rhum",
  //     //       quantite:1
  //     //     },
  //     //     {
  //     //       nom:"Citron",
  //     //       quantite:2
  //     //     },
  //     //     {
  //     //       nom:"Triple Sec",
  //     //       quantite:3
  //     //     }
  //     //   ]
  //     // },
  //   ]
  // );

  
}
