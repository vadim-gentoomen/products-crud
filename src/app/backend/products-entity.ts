export class ProductEntity {
  id: number;
  productName: string;
  productDesc: string;
  productPrice: number;
  updatedAt: Date;
}

export const products: ProductEntity[] = [
  {id: 1, productName: 'Ложка столовая серебрянная', productDesc: 'Серебро 925, вес 55 г.', productPrice: 6000, updatedAt: new Date()},
  {id: 2, productName: 'Вилка столовая серебрянная', productDesc: 'Серебро 925, вес 60 г.', productPrice: 5700, updatedAt: new Date()},
  {id: 3, productName: 'Нож столовый серебрянный', productDesc: 'Серебро 925, вес 35 г.', productPrice: 5000, updatedAt: new Date()},
  {id: 4, productName: 'Набор бокалов 6 шт', productDesc: 'Na Ca силикатное стекло', productPrice: 700, updatedAt: new Date()},
];
