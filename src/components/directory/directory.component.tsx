import './directory.styles.scss';
import { CategoryItem } from '@models/interfaces';
import Category from '@components/category/category.component';

export default function Directory(props: { categories: CategoryItem[] }) {
  const { categories } = props;

  return (
    <div className={'directory-container'}>
      {categories.map((category) => (
        <Category key={category.id} category={category}></Category>
      ))}
    </div>
  );
}
