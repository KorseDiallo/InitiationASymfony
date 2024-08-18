import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cocktail } from 'src/app/shared/interfaces/cocktail.interface';
import { CocktailService } from 'src/app/shared/services/cocktail.service';
import { PanierService } from 'src/app/shared/services/panier.service';


@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit ,OnDestroy{
   public cocktail!:Cocktail;
   public index!:string;
   public souscription!:Subscription;
  constructor(private panierService:PanierService,private cocktailservice:CocktailService,private activateRoute:ActivatedRoute){

  }


  public addToPanier(){ 
    this.panierService.addToPanier(this.cocktail.ingredients);
  }

  ngOnInit(): void {
      this.activateRoute.paramMap.subscribe((paramMap:ParamMap)=>{
          this.index=paramMap.get('index') ?? '';
          if(this.souscription){
            this.souscription.unsubscribe();
          }
          //this.cocktail= this.cocktailservice.getCocktail(+this.index);
         this.souscription= this.cocktailservice.getCocktail(+this.index).subscribe((cocktail:Cocktail)=>{
            this.cocktail=cocktail;
          })
      })
  }

  ngOnDestroy():void {
    this.souscription.unsubscribe();
  }
}
