import React from 'react';
import Calender from '../feature/Calender';
import { WeekData } from '../types';

interface Data {
  date: string;
  task: WeekData[];
}

const data: Data[] = [
  {
    date: '05/01/2023',
    task: [
      {
        startTime: '07:00 AM',
        endTime: '8:00 AM',
        title: 'Work Policy',
      },
      {
        startTime: '8:00 Am',
        endTime: '9:00 Am',
        title: 'Work Name',
      },
    ],
  },
  {
    date: '28/06/2023',
    task: [
      {
        startTime: '7:00 Am',
        endTime: '8:00 Am',
        title: 'Work Policy',
      },
      {
        startTime: '8:00 Am',
        endTime: '9:00 Am',
        title: 'Work Name',
      },
    ],
  },
  {
    date: '12/05/2023',
    task: [
      {
        startTime: '07:00 Am',
        endTime: '08:00 Am',
        title: 'Work Call',
      },
      {
        startTime: '10:00 Am',
        endTime: '08:00 Am',
        title: 'Work Lawyer',
      },
    ],
  },
  {
    date: '11/05/2023',
    task: [
      {
        startTime: '07:00 Am',
        endTime: '08:00 Am',
        title: 'Work Name',
      },
      {
        startTime: '08:00 Am',
        endTime: '09:00 Am',
        title: 'Work Business',
      },
    ],
  },
  {
    date: '01/05/2023',
    task: [
      {
        startTime: '7:00 Am',
        endTime: '8:00 Am',
        title: 'Work',
      },
      {
        startTime: '8:00 Am',
        endTime: '9:00 Am',
        title: 'Work',
      },
    ],
  },
  {
    date: '10/06/2023',
    task: [
      {
        startTime: '7:00 Am',
        endTime: '8:00 Am',
        title: 'Work Policy',
      },
      {
        startTime: '8:00 Am',
        endTime: '9:00 Am',
        title: 'Work Name',
      },
    ],
  },
];

const Home = () => {
  return <Calender name="Personal Calender" type="week" data={data} />;
};

export default Home;
