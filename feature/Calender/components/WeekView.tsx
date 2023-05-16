// Built In
import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalenderPopup from './CalenderPopup';
import { Data, WeekData } from '../../../types';

interface Props {
  date: string[];
  data: Data[];
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

const WeekView = ({ date, data }: Props) => {
  const [isShowCalenderPopup, setIsShowCalenderPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedData, setSelectedData] = useState<WeekData>();

  const handleCloseCalenderPopup = () => {
    setIsShowCalenderPopup(false);
  };

  const handleOpen = (date: string, time: string) => {
    const formattedDate = dayjs(date).format('DD/MM/YYYY');
    const selectedDate = Number(formattedDate.split('/')[0]);
    const selectedMonth = Number(formattedDate.split('/')[1]);
    const selectedYear = Number(formattedDate.split('/')[2]);
    const dates = new Date(selectedYear, selectedMonth - 1, selectedDate);
    const selectedDateString = dates.toLocaleDateString();

    data.filter((item: Data) => {
      if (item.date === selectedDateString) {
        item?.task.map((task: WeekData) => {
          if (task?.startTime.toUpperCase() === time) {
            setSelectedData(task);
            setSelectedDate(selectedDateString);
            setIsShowCalenderPopup(true);
          }
        });
      }
    });
  };

  return (
    <>
      <div className="mt-6">
        <div className="bg-white border border-border-agent rounded">
          {/* Month/Year Header */}
          <div className="px-6 py-4 border-b border-border-agent">
            <p className="font-semibold text-[16px] leading-[25px]">
              {dayjs(date[date?.length - 1]).format('MMMM')}{' '}
              {dayjs(date[date?.length - 1]).format('YYYY')}
            </p>
          </div>

          {/* Calender */}
          <div className="flex w-full">
            <div className="grid grid-rows-11 pl-1 max-w-[70px] bg-week-view-left mt-[20px] w-full">
              {time?.map((time: Time) => (
                <p
                  className="font-400 text-[12px] leading-5 w-full h-[60px] flex items-center justify-center"
                  key={time.name}
                >
                  {time.name}
                </p>
              ))}
            </div>
            <div className="width-week-calendar-box overflow-auto">
              <div className="grid grid-cols-7 text-center w-full week-view-box">
                {date.map((date: string) => {
                  return (
                    <div
                      className="w-1/7 border border-border h-100 text-[14px] leading-[22px] text-calender-inner-text border-b border-border-agent  justify-center text-center"
                      key={date}
                    >
                      <span className="mr-1">{dayjs(date).format('ddd')}</span>
                      <span>{dayjs(date).format('DD')}</span>

                      <div className="grid grid-rows-11">
                        {time?.map((time: Time) => (
                          <p
                            onClick={() => handleOpen(date, time.value)}
                            className="w-[100%] border-t border-b border-r flex items-center justify-center font-400 text-[12px] leading-5 h-[60px]"
                            key={time.value}
                          >
                            {data.map((item: Data) => {
                              const formattedDate =
                                dayjs(date).format('DD/MM/YYYY');

                              const [
                                selectedDate,
                                selectedMonth,
                                selectedYear,
                              ] = formattedDate.split('/');

                              const dataDate = item?.date.split('/')[0];
                              const currentMonth = Number(
                                item?.date.split('/')[1],
                              );
                              const currentYear = Number(
                                item?.date.split('/')[2],
                              );

                              return (
                                +dataDate === +selectedDate &&
                                currentMonth === Number(selectedMonth) &&
                                currentYear === Number(selectedYear) &&
                                item?.task?.map((item) => {
                                  return (
                                    time.value.toUpperCase() ===
                                      item.startTime.toUpperCase() && (
                                      <div
                                        key={item?.startTime}
                                        className="bg-[#4992ff] w-[10px] h-[10px] rounded-[50%] mr-2"
                                      />
                                    )
                                  );
                                })
                              );
                            })}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-rows-11 pl-1 max-w-[70px] bg-week-view mt-[20px] w-full">
              {time?.map((time: Time) => (
                <p
                  className="font-400 text-[12px] leading-5 w-full h-[60px] flex items-center justify-center"
                  key={time.name}
                >
                  {time.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isShowCalenderPopup && (
        <>
          <div className="blur z-[29]" onClick={handleCloseCalenderPopup} />
          <CalenderPopup
            isShowPopup={isShowCalenderPopup}
            handleCloseCalenderPopup={handleCloseCalenderPopup}
            date={selectedDate}
            weekData={selectedData}
          />
        </>
      )}
    </>
  );
};

export default WeekView;
