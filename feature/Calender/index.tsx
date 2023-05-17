import React, { useState } from 'react';
import dayjs from 'dayjs';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import AngleLeft from '../../assets/AngleLeft';
import AngleRight from '../../assets/AngleRight';
import { Data } from '../../types';

interface Props {
  name: string;
  type: string;
  data: Data[];
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

const Calender = ({ name, type, data }: Props) => {
  const dateWeek = [];
  // const [types, setType] = useState<string>('month');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentWeek, setCurrentWeek] = useState(dayjs());

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

  // const handleType = () => {
  //   setType(types);
  // };

  return (
    <div className="p-4 w-[100%] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center gap-2">
        <p className="font-semibold text-[20px] leading-8 text-black-800 text-name">
          {name}
        </p>

        <div className="flex justify-end h-[50px] gap-[30px] w-[60%]">
          {type === 'month' ? (
            <button className="flex gap-2 px-2 rounded-xl items-center  border border-login-border py-3">
              <AngleLeft onClick={handlePrev} />
              {months[month]} {year}
              <AngleRight onClick={handleNext} />
            </button>
          ) : (
            <button className="flex gap-2 px-2 rounded-xl items-center  border border-login-border py-3">
              <AngleLeft onClick={prevWeek} />
              {dayjs(start).format('DD')} - {dayjs(end).format('DD')}
              {dayjs(end).format('MMM')}
              <AngleRight onClick={nextWeek} />
            </button>
          )}

          {/* Menu Month And Week */}
          {/* {type === 'all' && (
            <div className="w-[50%] mb-2">
              <div className="p-1 bg-border rounded-xl flex gap-1 mb-[30px]">
                <button
                  onClick={handleType}
                  className={`w-[50%] rounded-lg hover:bg-white hover:text-[#383E4E] text-[#5E6782] font-medium text-[16px] leading-[25px] py-2`}
                >
                  Month
                </button>
                <button
                  onClick={handleType}
                  className={`w-[50%] rounded-lg  hover:bg-white hover:text-[#383E4E] text-[#5E6782] font-medium text-[16px] leading-[25px] py-2`}
                >
                  Week
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {type === 'month' && (
        <MonthView
          daysInMonth={daysInMonth}
          firstDay={firstDay}
          month={month}
          year={year}
          months={months}
          daysOfWeek={daysOfWeek}
          data={data}
        />
      )}

      {type === 'week' && <WeekView date={dateWeek} data={data} />}
    </div>
  );
};

export default Calender;
