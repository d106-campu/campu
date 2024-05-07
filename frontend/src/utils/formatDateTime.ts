// 일정 날짜 format 함수 ex) 24.05.03(금)
export const formatDate = (dateString: Date | string) => {
  
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  };
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) {
    console.error("formateDate로 제공하는 날짜 확인 :", dateString);
    return "유효하지 않은 날짜임";  // 유효하지 않은 날짜 처리
  }
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};

// 일정 날짜 format 함수 ex) 05.03(금)
export const formatSimpleDate = (dateString: Date | string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  };
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) {
    console.error("formatSimpleDate로 제공하는 날짜 확인 :", dateString);
    return "유효하지 않은 날짜임";  // 유효하지 않은 날짜 처리
  }
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};
