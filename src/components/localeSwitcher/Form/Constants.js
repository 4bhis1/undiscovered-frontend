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
  {title: 'Economy', icon: FaRegCreditCard},
  {title: 'Mid', icon: FaRegCreditCard},
  {title: 'Luxury', icon: FaRegCreditCard},
];

export const ActivitiesArray = [
  // Sightseeing & Landmarks
  'Landmarks',
  'CityTour',
  'Museums',
  'Parks',

  // Outdoor Activities
  'Hiking',
  'Watersports',
  'Wildlife',
  'Adventure',

  // Culinary Experiences
  'StreetFood',
  'Restaurants',
  'CookingClass',
  'Wineries',

  // Relaxation & Wellness
  'Beach',
  'Spa',
  'Yoga',
  'Picnics',

  // Cultural & Entertainment
  'Festivals',
  'LiveMusic',
  'Markets',
  'Workshops',

  // Nightlife & Socializing
  'Bars',
  'NightMarket',
  'PubCrawl',
  'Stargazing',

  // Family & Kid-Friendly Activities
  'ThemeParks',
  'Zoos',
  'WorkshopsForKids',
  'Playgrounds',

  // Special Interest Tours
  'Photography',
  'Architecture',
  'EcoTours',
  'FilmTours',

  // Shopping & Fashion
  'Malls',
  'FleaMarkets',
  'Souvenirs',
  'DesignerStores',
];

export const ContinentArray = [
  {title: `I'm flexible`, imagePath: All},
  {title: 'Europe', imagePath: Europe, code: 'FR'},
  {title: 'Indonesia', imagePath: Indonesia, code: 'ID'},
  {title: 'South-East Asia', imagePath: SEA, code: 'TH'},
  {title: 'United-Kingdom', imagePath: UK, code: 'GB'},
  {
    title: 'United-State',
    imagePath: US,
    code: 'US',
  },
];
