import React, { useState } from 'react';
import CalenderPopup from './CalenderPopup';
import { Data } from '../../../types';

interface Props {
  daysInMonth: number;
  firstDay: number;
  month: number;
  year: number;
  daysOfWeek: string[];
  months: string[];
  events?: Data[];
  disabledDates?: string[];
}

interface ITask {
  startTime: string;
  endTime: string;
  title: string;
}

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

const MonthView = ({
  daysInMonth,
  firstDay,
  month,
  year,
  daysOfWeek,
  months,
  events = [],
  disabledDates,
}: Props) => {
  const [isShowCalenderPopup, setIsShowCalenderPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [selectedColor, setSelectedColor] = useState('#6366F1');

  const handleCloseCalenderPopup = () => {
    setIsShowCalenderPopup(false);
  };

  const handleOpenTask = (
    task: ITask,
    dateStr: string,
    color: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setSelectedTask(task);
    setSelectedDate(dateStr);
    setSelectedColor(color);
    setIsShowCalenderPopup(true);
  };

  const today = new Date();
  const isToday = (dayIndex: number) =>
    today.getDate() === dayIndex + 1 &&
    today.getMonth() === month &&
    today.getFullYear() === year;

  return (
    <>
      <div className="mt-5">
        <div className="bg-white dark:bg-slate-900 border border-border-agent dark:border-slate-700 rounded-2xl overflow-hidden">
          {/* Month / year label */}
          <div className="px-6 py-4 border-b border-border-agent dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80">
            <p className="font-semibold text-[15px] text-calender-text dark:text-slate-100 tracking-tight">
              {months[month]} {year}
            </p>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 bg-slate-50/60 dark:bg-slate-800/60 border-b border-border-agent dark:border-slate-700">
            {daysOfWeek.map((day: string, idx: number) => (
              <div
                key={day}
                className={`text-[11px] font-semibold text-calender-inner-text dark:text-slate-400 uppercase tracking-widest py-3 text-center border-r border-border-agent dark:border-slate-700 ${
                  idx === 6 ? 'border-r-0' : ''
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }, (_, i) => (
              <div
                key={`blank-${i}`}
                className="border-b border-r border-border-agent dark:border-slate-700 bg-slate-50/40 dark:bg-slate-900/30 h-[100px] lg:h-[120px]"
              />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const colIndex = (firstDay + i) % 7;
              const isWeekend = colIndex === 0 || colIndex === 6;
              const todayCell = isToday(i);

              const day = String(i + 1).padStart(2, '0');
              const mon = String(month + 1).padStart(2, '0');
              const dateStr = `${day}/${mon}/${year}`;
              const isDisabled = disabledDates?.includes(dateStr) ?? false;

              // Collect one entry per task for this day
              const dayTasks: { task: ITask; color: string }[] = [];
              events.forEach((item) => {
                const d = item?.date.split('/')[0];
                const cm = Number(item?.date.split('/')[1]);
                const cy = Number(item?.date.split('/')[2]);
                if (+d === i + 1 && cm === month + 1 && cy === year) {
                  item.task.forEach((task) => {
                    dayTasks.push({
                      task,
                      color: hashColor(
                        `${item.date}-${task.startTime}-${task.title}`,
                      ),
                    });
                  });
                }
              });

              let cellBg = 'bg-white dark:bg-slate-900';
              if (isDisabled)
                cellBg =
                  'bg-slate-100/80 dark:bg-slate-800/60 cursor-not-allowed';
              else if (isWeekend)
                cellBg = 'bg-slate-50/60 dark:bg-slate-800/60';

              let dayNumClass = 'text-calender-inner-text dark:text-slate-400';
              if (isDisabled)
                dayNumClass = 'text-slate-400 dark:text-slate-600';
              else if (todayCell)
                dayNumClass = 'bg-[#4F46E5] text-white font-semibold';

              return (
                <div
                  key={i}
                  className={`relative border-b border-r border-border-agent dark:border-slate-700 h-[100px] lg:h-[120px] transition-colors duration-150 ${cellBg}`}
                >
                  <div className="p-2.5 h-full flex flex-col">
                    {/* Day number */}
                    <span
                      className={`w-7 h-7 flex items-center justify-center rounded-full text-[13px] font-medium select-none ${dayNumClass}`}
                    >
                      {i + 1}
                    </span>

                    {/* One dot per task, each individually clickable */}
                    {!isDisabled && dayTasks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                        {dayTasks.map(({ task, color }, idx) => (
                          <button
                            key={`${dateStr}-${idx}`}
                            title={task.title}
                            aria-label={`Open ${task.title}`}
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0 cursor-pointer hover:scale-125 transition-transform p-0 border-0"
                            style={{ backgroundColor: color }}
                            onClick={(e) =>
                              handleOpenTask(task, dateStr, color, e)
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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

export default MonthView;
