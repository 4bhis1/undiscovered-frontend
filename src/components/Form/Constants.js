import React from 'react';
import {FaUser, FaUserFriends} from 'react-icons/fa';
import {FaPeopleGroup} from 'react-icons/fa6';
import {MdOutlineFamilyRestroom, MdSportsHandball} from 'react-icons/md';
import {FaRegCreditCard} from 'react-icons/fa6';

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
