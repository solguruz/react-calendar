import React from 'react';
import Calendar from '../feature/Calendar';
import { WeekData } from '../types';

interface Data {
  date: string;
  task: WeekData[];
}

const events: Data[] = [
  {
    date: '05/01/2026',
    task: [
      { startTime: '07:00 AM', endTime: '8:00 AM', title: 'Work Policy' },
      { startTime: '8:00 Am', endTime: '9:00 Am', title: 'Work Name' },
    ],
  },
  {
    date: '28/06/2026',
    task: [
      { startTime: '7:00 Am', endTime: '7:30 Am', title: 'Work Policy' },
      { startTime: '8:00 Am', endTime: '9:00 Am', title: 'Work Name' },
    ],
  },
  {
    date: '12/05/2026',
    task: [
      { startTime: '07:00 Am', endTime: '08:00 Am', title: 'Work Call' },
      { startTime: '10:00 Am', endTime: '08:00 Am', title: 'Work Lawyer' },
    ],
  },
  {
    date: '11/05/2026',
    task: [
      { startTime: '07:00 Am', endTime: '08:00 Am', title: 'Work Name' },
      { startTime: '08:00 Am', endTime: '09:00 Am', title: 'Work Business' },
    ],
  },
  {
    date: '01/05/2026',
    task: [
      { startTime: '7:00 Am', endTime: '8:00 Am', title: 'Work' },
      { startTime: '8:00 Am', endTime: '9:00 Am', title: 'Work' },
    ],
  },
  {
    date: '10/06/2026',
    task: [
      { startTime: '7:00 Am', endTime: '8:00 Am', title: 'Work Policy' },
      { startTime: '8:00 Am', endTime: '9:00 Am', title: 'Work Name' },
    ],
  },
  {
    date: '16/06/2026',
    task: [
      { startTime: '07:00 AM', endTime: '08:00 AM', title: 'Team Standup' },
      { startTime: '10:00 AM', endTime: '11:00 AM', title: 'Design Review' },
    ],
  },
  {
    date: '17/06/2026',
    task: [
      { startTime: '09:00 AM', endTime: '10:00 AM', title: 'Client Call' },
    ],
  },
  {
    date: '20/06/2026',
    task: [
      { startTime: '02:00 PM', endTime: '03:00 PM', title: 'Sprint Planning' },
    ],
  },
];

const disabledDates = ['18/06/2026', '19/06/2026', '22/06/2026', '25/06/2026'];

const Home = () => {
  return (
    <Calendar
      name="Calendar"
      type="week"
      events={events}
      disabledDates={disabledDates}
    />
  );
};

export default Home;
