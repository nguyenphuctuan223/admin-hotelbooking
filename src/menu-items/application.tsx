// THIRD-PARTY
import { FormattedMessage } from 'react-intl';
// import { IconUserCheck } from '@tabler/icons';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import HotelIcon from '@mui/icons-material/Hotel';

import SettingsIcon from '@mui/icons-material/Settings';

import BedroomChildIcon from '@mui/icons-material/BedroomChild';

import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const icons = {
  ManageAccountsIcon,
  HotelIcon,
  SettingsIcon,
  BedroomChildIcon,
  BookmarkAddedIcon,
  EmojiTransportationIcon,
  QuestionAnswerIcon,
  CleaningServicesIcon
};

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
      id: 'manage-hotels',
      title: <FormattedMessage id="hotel" />,
      type: 'item',
      url: '/hotel',
      icon: icons.HotelIcon,
      breadcrumbs: true
    },
    {
      id: 'manage-rooms',
      title: <FormattedMessage id="room" />,
      type: 'item',
      url: '/room',
      icon: icons.BedroomChildIcon,
      breadcrumbs: true
    },
    {
      id: 'manage-bookings',
      title: <FormattedMessage id="booking" />,
      type: 'item',
      url: '/booking',
      icon: icons.BookmarkAddedIcon,
      breadcrumbs: true
    },
    {
      id: 'manage-transts',
      title: <FormattedMessage id="comment" />,
      type: 'item',
      url: '/comment',
      icon: icons.QuestionAnswerIcon,
      breadcrumbs: true
    },
    {
      id: 'manage-transts',
      title: <FormattedMessage id="transt" />,
      type: 'item',
      url: '/transt',
      icon: icons.EmojiTransportationIcon,
      breadcrumbs: true
    },
    {
      id: 'manage-uti',
      title: <FormattedMessage id="uti" />,
      type: 'item',
      url: '/uti',
      icon: icons.CleaningServicesIcon,
      breadcrumbs: true
    }
  ]
};

export default application;
