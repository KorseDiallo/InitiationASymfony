import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PanierService } from '../shared/services/panier.service';
import { Ingredient } from '../shared/interfaces/ingredient.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panier-container',
  templateUrl: './panier-container.component.html',
  styleUrls: ['./panier-container.component.scss']
})
export class PanierContainerComponent implements OnInit, OnDestroy {

  public ingredients!:Ingredient[];
  public subscription!:Subscription;
    constructor(private panierService:PanierService){
    }

    ngOnInit(): void {
        this.subscription=this.panierService.ingredients$.subscribe((ingredients:Ingredient[])=>{
          this.ingredients=ingredients;
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }


}
