import React from 'react';
import CloseIconGray from '../../../assets/CloseIconGray';
import { Data, WeekData } from '../../../types';

interface Props {
  isShowPopup: boolean;
  handleCloseCalenderPopup: () => void;
  date: string;
  data?: Data[];
  weekData?: WeekData;
}

const CalenderPopup = ({
  isShowPopup,
  handleCloseCalenderPopup,
  date,
  data,
  weekData,
}: Props) => {
  const filteredData = data?.filter((item) => item.date === date) || [];

  return (
    <div
      className={`${
        isShowPopup ? 'block' : 'hidden'
      } fixed z-[49] scrollbar bg-white rounded-xl overflow-auto top-[50%] left-[50%] w-[300px] border border-border p-[10px]`}
      style={{
        transform: 'translate(-50%, -50%)',
        boxShadow: '0px 15px 20px rgba(69, 69, 69, 0.17)',
      }}
      onClick={handleCloseCalenderPopup}
    >
      <div className="flex justify-between items-center pb-[10px] border-b">
        <p className="font-medium text-[16px] leading-5 text-[#5E6782]">
          {date}
        </p>
        <CloseIconGray
          className="cursor-pointer"
          onClick={handleCloseCalenderPopup}
        />
      </div>

      {filteredData?.length ? (
        <div className="flex flex-col gap-2 mb-[15px] mt-3">
          {filteredData[0]?.task.map(
            (
              task: { startTime: string; endTime: string; title: string },
              index: number,
            ) => (
              <p
                key={index}
                className="py-1 px-2 bg-primary-50 text-blue-login font-medium text-[12px] leading-5 rounded"
              >
                {task.startTime} - {task.endTime} - {task.title}
              </p>
            ),
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 mb-[15px] mt-3">
          <p className="py-1 px-2 bg-primary-50 text-blue-login font-medium text-[12px] leading-5 rounded">
            {weekData?.startTime} - {weekData?.endTime} - {weekData?.title}
          </p>
        </div>
      )}
    </div>
  );
};

export default CalenderPopup;
