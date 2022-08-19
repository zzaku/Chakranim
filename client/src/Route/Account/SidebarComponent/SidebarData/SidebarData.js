import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Profile',
    component: 'profile',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Confidentialité / Sécurité',
    component: 'privacy-settings',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Amis',
    component: 'friend',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "List d'amis",
        component: "friend-list",
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: "Demande d'amis",
        component: "friend-request",
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Bloqué',
        component: 'bloqued',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Messages privés',
    component: 'private-message',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Notification',
    component: 'notification',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Réglage',
    component: 'settings',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Voix',
        component: 'voice',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Vidéo',
        component: 'video',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    component: 'support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];