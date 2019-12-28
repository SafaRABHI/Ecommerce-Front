import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../catelogue.service';
import { Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    public currentProduct:any
    selectedFiles;
    progress: number;
    currentFileUpload: any;
    private currentTime: number;
    private editPhoto: boolean;
    private mode: number=0;
  
    constructor(private router:Router, private route:ActivatedRoute,
                public catalService:CatalogueService,
                public authService:AuthenticationService

               // public caddyService:CaddyService
                ) { }
  
    ngOnInit() {
     /* let id=this.route.snapshot.params.id;
      this.catalService.getRessource(this.catalService.host+"/products/"+id)
        .subscribe(data=>{
          this.currentProduct=data;
        },err=>{
          console.log(err);
        })*/
        let url=atob(this.route.snapshot.params.url);
        this.catalService.getProduct(url).subscribe(data=>{
          this.currentProduct=data;
        })
    }
  
    onEditPhoto(p) {
      this.currentProduct=p;
      this.editPhoto=true;
    }
  
    onSelectedFile(event) {
      this.selectedFiles=event.target.files;
    }
  
    uploadPhoto() {
      this.progress = 0;
      this.currentFileUpload = this.selectedFiles.item(0)
      this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          //console.log(this.router.url);
          //this.getProducts(this.currentRequest);
          //this.refreshUpdatedProduct();
          this.currentTime=Date.now();
          this.editPhoto=false;
        }
      },err=>{
        alert("Problème de chargement");
      })
  
  
  
      this.selectedFiles = undefined
    }
  
  /*  onAddProductToCaddy(p:Product) {
      if(!this.authService.isAuthenticated()){
        this.router.navigateByUrl("/login");
      }
      else{
        this.caddyService.addProduct(p);
      }
    } */
  
    getTS() {
      return this.currentTime;
    }
  
   /* onProductDetails(p) {
      this.router.navigateByUrl("/product/"+p.id);
    } */
  
    onEditProduct() {
      this.mode=1;
    }
  
    onUpdateProduct(data) {
     
  }
}