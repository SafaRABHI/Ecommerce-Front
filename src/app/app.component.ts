import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './catelogue.service';
import { from, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 private categories;
 private currentCategorie;

  constructor(private catService:CatalogueService, private router:Router,private authService:AuthenticationService,
    public caddyService:CaddyService
    ){}
  
  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLoacalStorage();
    this.getCategories();
  }
  private getCategories() {
   this.catService.getRessource("/categories")
   .subscribe(data=>{
     this.categories=data;
   },err=>{
     console.log(err);
   
   })
  }
 
  getProductsByCat(c) {
    this.currentCategorie=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts() {
this.currentCategorie=undefined;
this.router.navigateByUrl("/products/1/0");

  }
  onProductsPromo() {
this.currentCategorie=undefined;
this.router.navigateByUrl("/products/3/0");

  }
  onProductsDispo() {
    this.currentCategorie=undefined;
this.router.navigateByUrl("/products/4/0"); 
  }
  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
