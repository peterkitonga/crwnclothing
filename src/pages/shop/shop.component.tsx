import { Routes, Route } from 'react-router';

import './shop.styles.scss';
import Category from '@pages/category/category.component';
import CategoriesPreview from '@pages/categories-preview/categories-preview.component';

export default function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path={':category'} element={<Category />} />
    </Routes>
  );
}
