import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Profile',
    component: 'Profile',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Amis',
    component: 'Amis',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "List d'amis",
        component: "List d'amis",
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: "Demande d'amis",
        component: "Demande d'amis",
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Bloqué',
        component: 'Bloqué',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Messages privés',
    component: 'Messages privés',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Notification',
    component: 'Notification',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Réglage',
    component: 'Réglage',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Voix',
        component: 'Voix',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Vidéo',
        component: 'Vidéo',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    component: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];