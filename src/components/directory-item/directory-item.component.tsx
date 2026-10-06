import { useNavigate } from 'react-router-dom';

import './directory-item.styles.scss';
import { DirectoryItemType } from '@models/interfaces';

export default function DirectoryItem(props: { directory: DirectoryItemType }) {
  const navigate = useNavigate();
  const { id, title, imageUrl, route } = props.directory;

  const onNavigateToRoute = () => navigate(route);

  return (
    <div key={id} className={'directory-item-container'} onClick={onNavigateToRoute}>
      <div className={'directory-background-img'} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className={'directory-body-container'}>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}
