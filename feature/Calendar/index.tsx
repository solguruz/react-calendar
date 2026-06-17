import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import AngleLeft from '../../assets/AngleLeft';
import AngleRight from '../../assets/AngleRight';
import MoonIcon from '../../assets/MoonIcon';
import SunIcon from '../../assets/SunIcon';
import { EventData } from '../../types';

interface Props {
  name: string;
  type: string;
  events?: EventData[];
  disabledDates?: string[];
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calender = ({ name, type, events = [], disabledDates }: Props) => {
  const dateWeek = [];
  const [types, setType] = useState<string>('month');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Week View
  // eslint-disable-next-line
  const startOfWeek = (date: any) => {
    return date.startOf('week');
  };

  // eslint-disable-next-line
  const endOfWeek = (date: any) => {
    return date.endOf('week');
  };

  const nextWeek = () => {
    setCurrentWeek(currentWeek.add(1, 'week'));
  };

  const prevWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, 'week'));
  };

  const start = startOfWeek(currentWeek);
  const end = endOfWeek(currentWeek);

  let currentDate = start;

  while (currentDate <= end) {
    dateWeek.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  // Month View
  const handlePrev = () => {
    setMonth(month === 0 ? 11 : month - 1);
    if (month === 0) {
      setYear(year - 1);
    }
  };

  const handleNext = () => {
    setMonth(month === 11 ? 0 : month + 1);
    if (month === 11) {
      setYear(year + 1);
    }
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handleType = (newType: string) => {
    setType(newType);
  };

  return (
    <div className="p-6 w-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-2">
        <p className="font-bold text-[22px] leading-8 text-black-800 text-name tracking-tight">
          {name}
        </p>

        <div className="flex items-center gap-3">
          {/* Navigation pill */}
          {type === 'month' || (type === 'all' && types === 'month') ? (
            <div className="flex items-center bg-white dark:bg-slate-800 border border-login-border dark:border-slate-700 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous month"
                className="flex items-center justify-center w-9 h-9 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border-r border-login-border dark:border-slate-700"
              >
                <AngleLeft className="text-calender-text dark:text-slate-300" />
              </button>
              <span className="font-semibold text-[14px] text-black-800 dark:text-slate-100 px-4 min-w-[148px] text-center select-none">
                {months[month]} {year}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next month"
                className="flex items-center justify-center w-9 h-9 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border-l border-login-border dark:border-slate-700"
              >
                <AngleRight className="text-calender-text dark:text-slate-300" />
              </button>
            </div>
          ) : (
            <div className="flex items-center bg-white dark:bg-slate-800 border border-login-border dark:border-slate-700 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={prevWeek}
                aria-label="Previous week"
                className="flex items-center justify-center w-9 h-9 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border-r border-login-border dark:border-slate-700"
              >
                <AngleLeft className="text-calender-text dark:text-slate-300" />
              </button>
              <span className="font-semibold text-[14px] text-black-800 dark:text-slate-100 px-4 min-w-[148px] text-center select-none">
                {dayjs(start).format('DD')} &ndash; {dayjs(end).format('DD')}{' '}
                {dayjs(end).format('MMM YYYY')}
              </span>
              <button
                type="button"
                onClick={nextWeek}
                aria-label="Next week"
                className="flex items-center justify-center w-9 h-9 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border-l border-login-border dark:border-slate-700"
              >
                <AngleRight className="text-calender-text dark:text-slate-300" />
              </button>
            </div>
          )}

          {/* View toggle */}
          {type === 'all' && (
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1 gap-0.5">
              <button
                onClick={() => handleType('month')}
                className={`px-4 py-1.5 rounded-lg text-[14px] font-medium transition-all ${
                  types === 'month'
                    ? 'bg-white dark:bg-slate-600 text-blue-login dark:text-indigo-300'
                    : 'text-calender-inner-text dark:text-slate-400 hover:text-calender-text dark:hover:text-slate-200'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => handleType('week')}
                className={`px-4 py-1.5 rounded-lg text-[14px] font-medium transition-all ${
                  types === 'week'
                    ? 'bg-white dark:bg-slate-600 text-blue-login dark:text-indigo-300'
                    : 'text-calender-inner-text dark:text-slate-400 hover:text-calender-text dark:hover:text-slate-200'
                }`}
              >
                Week
              </button>
            </div>
          )}

          {/* Dark / light toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center w-9 h-9 bg-white dark:bg-slate-800 border border-login-border dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-calender-inner-text dark:text-slate-400"
          >
            {mounted ? isDark ? <SunIcon /> : <MoonIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>

      {(type === 'month' || (type === 'all' && types === 'month')) && (
        <MonthView
          daysInMonth={daysInMonth}
          firstDay={firstDay}
          month={month}
          year={year}
          months={months}
          daysOfWeek={daysOfWeek}
          events={events}
          disabledDates={disabledDates}
        />
      )}

      {(type === 'week' || (type === 'all' && types === 'week')) && (
        <WeekView
          date={dateWeek}
          events={events}
          disabledDates={disabledDates}
        />
      )}
    </div>
  );
};

export default Calender;
