import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyWord: string = null;

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    // check id is available
  }

  private listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleListProducts() {

    const categoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (categoryId) {
      // get id & convert string to number using +
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1;
    }
    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.pageNumber}, pageSize= ${this.pageSize}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.pageNumber - 1,
      this.pageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }


  private handleSearchProducts() {

    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    // if we have different keyword, then we should set page number to 1
    if (this.previousKeyWord != keyword) {
      this.pageNumber = 1;
    }
    this.previousKeyWord = keyword;

    console.log(`keyword=${keyword}, pageNumber=${this.pageNumber}`);

    this.productService.searchProductsPaginate(this.pageNumber - 1,
      this.pageSize, keyword).subscribe(this.processResult());
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {

    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
}
