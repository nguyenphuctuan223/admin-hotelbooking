// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
// import { IconUserCheck } from '@tabler/icons';
import CollectionsIcon from '@mui/icons-material/Collections';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import SettingsIcon from '@mui/icons-material/Settings';

const icons = { ManageAccountsIcon, CollectionsIcon, SettingsIcon };

const application = {
  id: 'application',
  title: <FormattedMessage id="application" />,
  type: 'group',
  children: [
    {
      id: 'manage-users',
      title: <FormattedMessage id="user" />,
      type: 'item',
      url: '/user',
      icon: icons.ManageAccountsIcon,
      breadcrumbs: true
    },
    {
      id: 'manage-Collections',
      title: <FormattedMessage id="collection" />,
      type: 'item',
      url: '/collection',
      icon: icons.CollectionsIcon,
      breadcrumbs: true
    }
  ]
};

export default application;
