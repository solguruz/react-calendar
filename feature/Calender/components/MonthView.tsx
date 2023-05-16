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
  data: Data[];
}

const MonthView = ({
  daysInMonth,
  firstDay,
  month,
  year,
  daysOfWeek,
  months,
  data,
}: Props) => {
  const [isShowCalenderPopup, setIsShowCalenderPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleCloseCalenderPopup = () => {
    setIsShowCalenderPopup(false);
  };

  const handleOpen = (i: number) => {
    const date = new Date(year, month, i + 1);
    const selectedDateString = date.toLocaleDateString();
    const filteredData = data.filter((item: Data) => {
      return item.date === selectedDateString;
    });
    if (filteredData.length > 0) {
      setSelectedDate(selectedDateString);
      setIsShowCalenderPopup(true);
    }
  };

  const filteredData = data.filter((item: Data) => {
    return item.date === selectedDate;
  });

  return (
    <>
      <div className="mt-6">
        <div className="bg-white border border-border-agent rounded">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border-agent">
            <p className="font-semibold text-[16px] leading-[25px] text-calender-text">
              {months[month]} {year}
            </p>
          </div>

          {/* Calendar */}
          <>
            <div className="grid grid-cols-7 text-center">
              {daysOfWeek.map((day: string) => (
                <div
                  className="w-1/7 text-[14px] leading-[22px] text-calender-inner-text border-b border-border-agent  justify-center text-center py-2"
                  key={day}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }, (_, i) => (
                <div
                  className="w-1/7 border-b border-l text-[14px] leading-[22px] text-calender-inner-text border-border-agent"
                  key={`blank-${i}`}
                />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => (
                <div key={i} className="relative" onClick={() => handleOpen(i)}>
                  <div className="hover:bg-[#e6f4ff] w-1/7 text-left pl-2 text-[14px] leading-[22px] text-calender-inner-text py-2 border-b border-l border-border-agent xxl:h-[127px] xl:h-[127px] lg:h-[127px] md:h-[60px] sm:h-[60px] h-[60px]">
                    <div className="flex justify-between items-center">
                      <span>{i + 1}</span>
                      {data.map((item) => {
                        const date = item?.date.split('/')[0];
                        const currentMonth = Number(item?.date.split('/')[1]);
                        const currentYear = Number(item?.date.split('/')[2]);
                        return (
                          +date === i + 1 &&
                          currentMonth === month + 1 &&
                          currentYear === year && (
                            <div
                              key={item?.date}
                              className="bg-[#4992ff] w-[10px] h-[10px] rounded-[50%] mr-2"
                            />
                          )
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        </div>
      </div>

      {isShowCalenderPopup && (
        <>
          <div className="blur z-[29]" onClick={handleCloseCalenderPopup} />
          <CalenderPopup
            isShowPopup={isShowCalenderPopup}
            handleCloseCalenderPopup={handleCloseCalenderPopup}
            date={selectedDate}
            data={filteredData}
          />
        </>
      )}
    </>
  );
};

export default MonthView;
