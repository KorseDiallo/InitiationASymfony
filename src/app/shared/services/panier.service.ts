import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../interfaces/ingredient.interface';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  public ingredients$:BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]> ([]);

  // public addToPanier(ingredients:Ingredient[]){
  //     const currentValue=this.ingredients$.value;
  //     if(currentValue){
  //       const fullArray=[...currentValue,...ingredients];
  //       const obj= fullArray.reduce((acc:any,value:any)=>{
  //          if(acc[value.nom]){
  //             acc[value.nom]+=value.quantite
  //          } else{
  //           acc[value.nom]=value.quantite
  //          }
  //          return acc;
  //       },{});
  //       const result= Object.keys(obj).map((key)=>({
  //         nom:key,
  //         quantite:obj[key]
  //       }));
  //       this.ingredients$.next(result);
  //     }else{
  //       this.ingredients$.next(ingredients);
  //     }
  // }

  

  public addToPanier(ingredientsToAdd: Ingredient[]): void {
    const ingredients = this.ingredients$.value;

    ingredientsToAdd.forEach(ingredientToAdd => {
      const existingIngredient = ingredients.find(i => i.nom === ingredientToAdd.nom);

      if (existingIngredient) {
        existingIngredient.quantite += ingredientToAdd.quantite;
      } else {
        ingredients.push({ ...ingredientToAdd });
      }
    });

    this.ingredients$.next(ingredients);
  }

  constructor() { }
}
  

