import { Routes, Route } from 'react-router';

import './shop.styles.scss';
import CategoriesPreview from '@pages/categories-preview/categories-preview.component';

export default function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
    </Routes>
  );
}
