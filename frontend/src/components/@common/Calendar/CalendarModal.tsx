import { useState } from "react";
import Modal from "@/components/@common/Modal/Modal";
import Calendar from "@/components/@common/Calendar/Calendar";
import CalendarSubmit from "@/components/@common/Calendar/CalendarSubmit";
import { FaArrowRotateRight } from "react-icons/fa6";
import { dateStringToDate, dateToDateString } from "@/utils/formatDateTime";

interface CalendarModalProps {
  initialStartDate: Date | null;
  initialEndDate: Date | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (startDate: Date | null, endDate: Date | null) => void;
}

const CalendarModal = ({
  initialStartDate,
  initialEndDate,
  isOpen,
  onClose,
  onSubmit,
}: CalendarModalProps) => {
  const [localStartDate, setLocalStartDate] = useState<Date | null>(
    initialStartDate
  );
  const [localEndDate, setLocalEndDate] = useState<Date | null>(initialEndDate);

  // 일정 초기화
  const resetCalendar = () => {
    setLocalStartDate(dateStringToDate(dateToDateString(initialStartDate)));
    setLocalEndDate(dateStringToDate(dateToDateString(initialEndDate)));
  };

  return (
    isOpen && (
      <Modal width="w-[55%]" onClose={onClose} title="일정 선택">
        <div>
          <div className="w-[70%] h-[375px] mx-auto">
            <Calendar
              startDate={localStartDate}
              endDate={localEndDate}
              setStartDate={setLocalStartDate}
              setEndDate={setLocalEndDate}
            />
          </div>
          <button
            onClick={resetCalendar}
            className="flex items-center gap-2 cursor-pointer p-2"
          >
            <FaArrowRotateRight color="C9C9C9" />
            <span className="text-GRAY">일정 초기화</span>
          </button>
          <CalendarSubmit
            startDate={localStartDate}
            endDate={localEndDate}
            onClick={() => {
              onSubmit(localStartDate, localEndDate);
              onClose();
            }}
          />
        </div>
      </Modal>
    )
  );
};

export default CalendarModal;
