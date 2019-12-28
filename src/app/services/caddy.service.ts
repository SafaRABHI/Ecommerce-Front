import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import { Product } from '../model/product.model';
import { ProductItem } from '../model/product-item.model';

@Injectable({
  providedIn: 'root'
})

export class CaddyService {
currentCaddyName:string="Caddy1";
public caddies:Map<string,Caddy> =new Map();

  constructor() { /*
    let caddies=localStorage.getItem("myCaddies");
    if(caddies){
      this.caddies=JSON.parse(caddies);
    }
    else{
    let caddy=new Caddy(this.currentCaddyName);
    //this.caddies[this.currentCaddyName]=caddy;
    this.caddies.set(this.currentCaddyName,caddy);
  }  */
  let caddy=new Caddy(this.currentCaddyName);
  this.caddies.set(this.currentCaddyName,caddy);
} 
  public addProductToCaddy(product:Product):void{
   let caddy=this.caddies.get(this.currentCaddyName);
   let productItem:ProductItem=caddy.items.get(product.id); 
   if(productItem){
     productItem.quantity+=product.quantity;
   }
   else{
     productItem=new ProductItem();
     productItem.price=product.currentPrice;
     productItem.quantity=product.quantity;
     productItem.product=product;
     caddy.items.set(product.id,productItem);
     //caddy.items[product.id]=productItem;
     this.saveCaddies();
   }
  }
  public saveCaddies(){

    localStorage.setItem('myCaddies',JSON.stringify(this.caddies));
  }
getCurrentCaddy():Caddy{
  return this.caddies.get(this.currentCaddyName);
}
public getTotal():number{
  let total=0;
  let items:IterableIterator<ProductItem>=this.getCurrentCaddy().items.values();
  for (let pi of items){
    total+=pi.price*pi.quantity;
  }
  return total;
}
}
