import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,ParamMap} from '@angular/router';
import { Cocktail } from 'src/app/shared/interfaces/cocktail.interface';
import { CocktailService } from 'src/app/shared/services/cocktail.service';

@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrls: ['./cocktail-form.component.scss']
})
export class CocktailFormComponent implements OnInit {

  constructor(private fb:FormBuilder,private cocktailService:CocktailService,private router:Router,private activatedRoute:ActivatedRoute){

  }
  public cocktailForm!:FormGroup;
  public cocktail!:Cocktail;

  get ingredients(){
    return this.cocktailForm.get('ingredients') as FormArray;
  }

ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{ 
      const index= paramMap.get("index");
      if(index!=null){
        //this.cocktail=this.cocktailService.getCocktail(+index)
        this.cocktailService.getCocktail(+index).subscribe((cocktail:Cocktail)=>{
          this.cocktail=cocktail;
          this.initForm(this.cocktail);
        })
      }else{
        this.initForm();
      }
     
    })

   
}

private initForm(cocktail:Cocktail={name:'',description:'',img:'',ingredients:[]}):void{
  this.cocktailForm= this.fb.group({
    name: [cocktail.name,Validators.required],
    img:  [cocktail.img,Validators.required],
    description: [cocktail.description,Validators.required],
    ingredients: this.fb.array(cocktail.ingredients.map(ingredient =>{
      return this.fb.group({
        nom: [ingredient.nom,Validators.required],
        quantite: [ingredient.quantite,Validators.required]
      })
    }),Validators.required)

  })
}

public addIngredient():void {
  this.ingredients.push(this.fb.group({
      nom: ['',Validators.required],
      quantite: [0,Validators.required]
  }))
}

public submit():void{
 if(this.cocktail._id){
    this.cocktailService.editCocktail(this.cocktail._id,this.cocktailForm.value).subscribe();
 }else{
    this.cocktailService.addCocktail(this.cocktailForm.value).subscribe();
 }
  this.router.navigate(['..'],{
    relativeTo: this.activatedRoute
  })
}





}
