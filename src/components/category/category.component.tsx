import './category.styles.scss';
import {CategoryItem} from '@models/interfaces';

export default function Category(props: { category: CategoryItem }) {
  const { id, title, imageUrl } = props.category;

  return (
    <div key={id} className={'category-container'}>
      <div className={'category-background-img'} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className={'category-body-container'}>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}
