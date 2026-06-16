import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalenderPopup from './CalenderPopup';
import { Data, WeekData } from '../../../types';

const EVENT_COLORS = [
  '#6366F1',
  '#F59E0B',
  '#10B981',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
  '#3B82F6',
  '#84CC16',
];

const hashColor = (key: string): string => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = Math.trunc((hash << 5) - hash + (key.codePointAt(i) ?? 0));
  }
  return EVENT_COLORS[Math.abs(hash) % EVENT_COLORS.length];
};

interface Props {
  date: string[];
  data: Data[];
  disabledDates?: string[];
}

interface Time {
  name: string;
  value: string;
}

const time: Time[] = [
  { name: '7 AM', value: '07:00 AM' },
  { name: '8 AM', value: '08:00 AM' },
  { name: '9 AM', value: '09:00 AM' },
  { name: '10 AM', value: '10:00 AM' },
  { name: '11 AM', value: '11:00 AM' },
  { name: '12 PM', value: '12:00 AM' },
  { name: '1 PM', value: '01:00 PM' },
  { name: '2 PM', value: '02:00 PM' },
  { name: '3 PM', value: '03:00 PM' },
  { name: '4 PM', value: '04:00 PM' },
  { name: '5 PM', value: '05:00 PM' },
];

const normalizeTime = (t: string) =>
  t
    .trim()
    .replace(/^(\d):/, '0$1:')
    .toUpperCase();

const todayFormatted = dayjs().format('DD/MM/YYYY');

const WeekView = ({ date, data, disabledDates }: Props) => {
  const [isShowCalenderPopup, setIsShowCalenderPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTask, setSelectedTask] = useState<WeekData | null>(null);
  const [selectedColor, setSelectedColor] = useState('#6366F1');

  const handleCloseCalenderPopup = () => {
    setIsShowCalenderPopup(false);
  };

  const handleOpen = (d: string, t: string) => {
    const selectedDateString = dayjs(d).format('DD/MM/YYYY');

    data.filter((item: Data) => {
      if (item.date === selectedDateString) {
        item?.task.map((task: WeekData) => {
          if (normalizeTime(task.startTime) === t) {
            const color = hashColor(
              `${selectedDateString}-${task.startTime}-${task.title}`,
            );
            setSelectedTask(task);
            setSelectedDate(selectedDateString);
            setSelectedColor(color);
            setIsShowCalenderPopup(true);
          }
        });
      }
    });
  };

  return (
    <>
      <div className="mt-5">
        <div className="bg-white dark:bg-slate-900 border border-border-agent dark:border-slate-700 rounded-2xl overflow-hidden">
          {/* Month / year label */}
          <div className="px-6 py-4 border-b border-border-agent dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80">
            <p className="font-semibold text-[15px] text-calender-text dark:text-slate-100 tracking-tight">
              {dayjs(date[date?.length - 1]).format('MMMM YYYY')}
            </p>
          </div>

          {/* Grid: [left-time] | [day-columns] | [right-time] */}
          <div className="flex w-full">
            {/* Left time labels */}
            <div className="grid grid-rows-11 max-w-[70px] w-full bg-week-view-left dark:bg-slate-800 border-r border-border-agent dark:border-slate-700 mt-[52px]">
              {time?.map((t: Time) => (
                <p
                  key={t.name}
                  className="text-[11px] font-medium text-calender-inner-text dark:text-slate-400 w-full h-[60px] flex items-center justify-center select-none"
                >
                  {t.name}
                </p>
              ))}
            </div>

            {/* Day columns */}
            <div className="width-week-calendar-box overflow-auto">
              <div className="grid grid-cols-7 text-center w-full week-view-box">
                {date.map((d: string, colIdx: number) => {
                  const isToday =
                    dayjs(d).format('DD/MM/YYYY') === todayFormatted;
                  const isLastCol = colIdx === date.length - 1;
                  const isDisabled =
                    disabledDates?.includes(dayjs(d).format('DD/MM/YYYY')) ??
                    false;

                  return (
                    <div
                      key={d}
                      className={`flex flex-col ${
                        isLastCol
                          ? ''
                          : 'border-r border-border-agent dark:border-slate-700'
                      }`}
                    >
                      {/* Day header */}
                      <div
                        className={[
                          'flex flex-col items-center justify-center py-2.5 border-b border-border-agent dark:border-slate-700',
                          isDisabled
                            ? 'bg-slate-100/80 dark:bg-slate-800/60'
                            : isToday
                            ? 'bg-indigo-50 dark:bg-indigo-900/30'
                            : 'bg-slate-50/60 dark:bg-slate-800/60',
                        ].join(' ')}
                      >
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-widest ${
                            isDisabled
                              ? 'text-slate-400 dark:text-slate-600'
                              : isToday
                              ? 'text-[#4F46E5]'
                              : 'text-calender-inner-text dark:text-slate-400'
                          }`}
                        >
                          {dayjs(d).format('ddd')}
                        </span>
                        <span
                          className={`text-[18px] font-bold mt-0.5 leading-none ${
                            isDisabled
                              ? 'text-slate-400 dark:text-slate-600'
                              : isToday
                              ? 'text-[#4F46E5]'
                              : 'text-calender-text dark:text-slate-100'
                          }`}
                        >
                          {dayjs(d).format('DD')}
                        </span>
                      </div>

                      {/* Time slots */}
                      <div className="grid grid-rows-11">
                        {time?.map((t: Time) => (
                          <div
                            key={t.value}
                            onClick={
                              isDisabled
                                ? undefined
                                : () => handleOpen(d, t.value)
                            }
                            className={[
                              'w-full border-b border-border-agent dark:border-slate-700 flex items-center justify-center h-[60px] transition-colors',
                              isDisabled
                                ? 'bg-slate-100/60 dark:bg-slate-800/50 cursor-not-allowed'
                                : `cursor-pointer hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 ${
                                    isToday
                                      ? 'bg-indigo-50/20 dark:bg-indigo-900/10'
                                      : 'bg-white dark:bg-slate-900'
                                  }`,
                            ].join(' ')}
                          >
                            {/* Event dots — only on non-disabled columns */}
                            {!isDisabled &&
                              data.map((item: Data) => {
                                const formattedDate =
                                  dayjs(d).format('DD/MM/YYYY');
                                const [selDate, selMonth, selYear] =
                                  formattedDate.split('/');
                                const dataDate = item?.date.split('/')[0];
                                const currentMonth = Number(
                                  item?.date.split('/')[1],
                                );
                                const currentYear = Number(
                                  item?.date.split('/')[2],
                                );

                                return (
                                  +dataDate === +selDate &&
                                  currentMonth === Number(selMonth) &&
                                  currentYear === Number(selYear) &&
                                  item?.task?.map((task) => {
                                    const dotColor = hashColor(
                                      `${formattedDate}-${task.startTime}-${task.title}`,
                                    );
                                    return (
                                      normalizeTime(task.startTime) ===
                                        t.value && (
                                        <div
                                          key={task?.startTime}
                                          className="w-2.5 h-2.5 rounded-full"
                                          style={{ backgroundColor: dotColor }}
                                        />
                                      )
                                    );
                                  })
                                );
                              })}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right time labels */}
            <div className="grid grid-rows-11 max-w-[70px] w-full bg-week-view dark:bg-slate-800 border-l border-border-agent dark:border-slate-700 mt-[52px]">
              {time?.map((t: Time) => (
                <p
                  key={t.name}
                  className="text-[11px] font-medium text-calender-inner-text dark:text-slate-400 w-full h-[60px] flex items-center justify-center select-none"
                >
                  {t.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isShowCalenderPopup && selectedTask && (
        <>
          <div className="blur z-[29]" onClick={handleCloseCalenderPopup} />
          <CalenderPopup
            isShowPopup={isShowCalenderPopup}
            handleCloseCalenderPopup={handleCloseCalenderPopup}
            date={selectedDate}
            task={selectedTask}
            color={selectedColor}
          />
        </>
      )}
    </>
  );
};

export default WeekView;
