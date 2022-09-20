export class CartProduct {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public img: string,
     public quantity: number,
    public countProductMax: number,
    public subCategoryName: string
  ) {}
}
