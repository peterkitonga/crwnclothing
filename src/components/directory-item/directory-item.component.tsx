import { useNavigate } from 'react-router-dom';

import './directory-item.styles';
import { DirectoryItemType } from '@models/interfaces';
import { BackgroundImage, DirectoryContainer, ItemBody } from '@components/directory-item/directory-item.styles';

export default function DirectoryItem(props: { directory: DirectoryItemType }) {
  const navigate = useNavigate();
  const { id, title, imageUrl, route } = props.directory;

  const onNavigateToRoute = () => navigate(route);

  return (
    <DirectoryContainer key={id} className={'directory-item-container'} onClick={onNavigateToRoute}>
      <BackgroundImage $imageUrl={imageUrl} />
      <ItemBody className={'directory-body-container'}>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </ItemBody>
    </DirectoryContainer>
  );
}
