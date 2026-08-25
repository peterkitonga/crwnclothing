import './directory.styles.scss';
import {CategoryItem} from '../../types/interfaces';
import Category from '../category/category.component';

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
