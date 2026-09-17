import { PRODUCTS } from './data/products.data';
import { addCategoriesAndDocuments } from '../src/utils/firebase.utils';

addCategoriesAndDocuments('categories', PRODUCTS)
  .then(() => {
    console.log('DONE SEEDING CATEGORIES & PRODUCTS');
    process.exit(0);
  })
  .catch((error) => {
    console.error('ERROR SEEDING CATEGORIES & PRODUCTS', error);
    process.exit(1);
  });
