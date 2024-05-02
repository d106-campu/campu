import { PropsWithChildren } from "react";
import { IDetailProps } from "@/types/myReservation";
  
const ReservationSection = ({
  titleLeft,
  contentLeft,
  titleRight,
  contentRight,
}: PropsWithChildren<IDetailProps>): JSX.Element => {
  return (
    <>
      <div className='w-full '>
        <div className="flex justify-between pb-4">
          <div className="flex flex-col items-start">
            <h1 className="text-gray-400">{titleLeft}</h1>
            <p>{contentLeft}</p>
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-gray-400">{titleRight}</h1>
            <p>{contentRight}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationSection;