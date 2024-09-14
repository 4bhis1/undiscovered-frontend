import React from 'react';
import {
  FaBook,
  FaCloudMoon,
  FaHamburger,
  FaHiking,
  FaShoppingBag,
  FaUmbrellaBeach,
  FaUser,
  FaUserFriends,
} from 'react-icons/fa';
import {FaPeopleGroup} from 'react-icons/fa6';
import {MdOutlineFamilyRestroom, MdSportsHandball} from 'react-icons/md';
import {FaRegCreditCard} from 'react-icons/fa6';
import {HiLibrary} from 'react-icons/hi';
import {RiFlowerFill} from 'react-icons/ri';

import All from '../../../assets/All.jpg';
import Europe from '../../../assets/europe.webp';
import Indonesia from '../../../assets/indonesia.webp';
import SEA from '../../../assets/SEA.webp';
import UK from '../../../assets/UK.webp';
import US from '../../../assets/US.webp';

export const NumberOfPeople = [
  {title: 'Solo', icon: FaUser},
  {title: 'Couple', icon: FaUserFriends},
  {title: 'Friends', icon: FaPeopleGroup},
  {title: 'Family', icon: MdOutlineFamilyRestroom},
];

export const BudgetArray = [
  {title: 'Economy', additionalText: '0 - 1000 INR', icon: FaRegCreditCard},
  {title: 'Mid', additionalText: '1000 - 2500 INR', icon: FaRegCreditCard},
  {title: 'Luxury', additionalText: '2500 INR', icon: FaRegCreditCard},
];

export const ActivitiesArray = [
  {title: 'Beaches', icon: FaUmbrellaBeach},
  {title: 'Hiking', icon: FaHiking},
  {title: 'Culture', icon: FaBook},
  {title: 'Sports', icon: MdSportsHandball},
  {title: 'NightLife', icon: FaCloudMoon},
  {
    title: 'Food Exploration',
    icon: FaHamburger,
  },
  {title: 'Sight Seeing', icon: HiLibrary},
  {title: 'Wellness', icon: RiFlowerFill},
  {title: 'Shopping', icon: FaShoppingBag},
];

export const ContinentArray = [
  {title: `I'm flexible`, imagePath: All},
  {title: 'Europe', imagePath: Europe},
  {title: 'Indonesia', imagePath: Indonesia},
  {title: 'South-East Asia', imagePath: SEA},
  {title: 'United-Kingdom', imagePath: UK},
  {
    title: 'United-State',
    imagePath: US,
  },
];
