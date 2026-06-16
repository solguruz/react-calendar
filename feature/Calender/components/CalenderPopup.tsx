import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CloseIconGray from '../../../assets/CloseIconGray';

dayjs.extend(customParseFormat);

interface ITask {
  startTime: string;
  endTime: string;
  title: string;
}

interface Props {
  isShowPopup: boolean;
  handleCloseCalenderPopup: () => void;
  date: string;
  task: ITask;
  color?: string;
}

const CalenderPopup = ({
  isShowPopup,
  handleCloseCalenderPopup,
  date,
  task,
  color = '#6366F1',
}: Props) => {
  const displayDate = date
    ? dayjs(date, 'DD/MM/YYYY').format('dddd, MMMM D, YYYY')
    : '';

  return (
    <div
      className={`${
        isShowPopup ? 'flex flex-col' : 'hidden'
      } fixed z-[49] bg-white dark:bg-slate-800 rounded-2xl overflow-hidden top-[50%] left-[50%] w-[340px] border border-border-agent dark:border-slate-700`}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      {/* Color accent bar matches the event dot */}
      <div className="h-1.5 w-full" style={{ backgroundColor: color }} />

      {/* Header */}
      <div className="flex justify-between items-center px-5 pt-4 pb-3.5 border-b border-border-agent dark:border-slate-700">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <p className="font-bold text-[15px] text-calender-text dark:text-slate-100 leading-snug truncate">
            {task.title}
          </p>
        </div>
        <button
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0 ml-3"
          onClick={handleCloseCalenderPopup}
        >
          <CloseIconGray className="w-4 h-4" />
        </button>
      </div>

      {/* Detail rows */}
      <div className="px-5 py-4 flex flex-col gap-4">
        {/* Date */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0 text-calender-inner-text dark:text-slate-400">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="1.5"
                y="2.5"
                width="13"
                height="12"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M5 1.5V4M11 1.5V4M1.5 6.5h13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-calender-inner-text dark:text-slate-400 uppercase tracking-wider">
              Date
            </p>
            <p className="text-[13px] text-calender-text dark:text-slate-100 font-medium mt-0.5">
              {displayDate}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0 text-calender-inner-text dark:text-slate-400">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M8 4.5V8l2.5 2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-calender-inner-text dark:text-slate-400 uppercase tracking-wider">
              Time
            </p>
            <p className="text-[13px] text-calender-text dark:text-slate-100 font-medium mt-0.5">
              {task.startTime} &ndash; {task.endTime}
            </p>
          </div>
        </div>
      </div>

      <div className="pb-1" />
    </div>
  );
};

export default CalenderPopup;
