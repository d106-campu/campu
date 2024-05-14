import { format, parseISO } from "date-fns";

// 일정 날짜 format 함수 - ex) 24.05.03 (금)
export const formatDate = (dateString: Date | string | null) => {
  if (!dateString) return;
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  };
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const formatted = new Intl.DateTimeFormat("ko-KR", options).format(date);
  return formatted.replace(/(\.\s)(?=\()/g, " ");
};

// 일정 날짜 format 함수 - ex) 05.03 (금)
export const formatSimpleDate = (dateString: Date | string | null) => {
  if (!dateString) return;
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  };
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const formatted = new Intl.DateTimeFormat("ko-KR", options).format(date);
  return formatted.replace(/(\.\s)(?=\()/g, " ");
};

// 리뷰 작성 시간 fomat 함수 - ex) 2024. 03. 24. 오후 05:05
export const formatReviewTime = (dateString: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return date.toLocaleDateString("ko-KR", options);
};

// 리뷰 작성 시간 fomat 함수 - ex) 2024. 03. 24.
export const formatSimpleReviewTime = (
  dateTimeString: string | Date
): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const date =
    typeof dateTimeString === "string"
      ? new Date(dateTimeString)
      : dateTimeString;
  return date.toLocaleDateString("ko-KR", options);
};

// ISO 8601 형식의 문자열을 Date 객체로 변환
export const dateStringToDate = (dateString: string | null): Date | null => {
  if (dateString === null) {
    return null;
  }
  try {
    return parseISO(dateString);
  } catch (error) {
    console.error("유효하지 않은 날짜 문자열:", error);
    return null;
  }
};

// Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환
export const dateToDateString = (date: Date | null): string | null => {
  if (date === null) {
    return null;
  }
  return format(date, "yyyy-MM-dd");
};
