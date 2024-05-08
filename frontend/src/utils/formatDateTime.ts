// 일정 날짜 format 함수 ex) 24.05.03 (금)
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

// 일정 날짜 format 함수 ex) 05.03 (금)
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
