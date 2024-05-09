// 오늘 날짜를 기준으로 그 주의 주말 날짜를 계산하는 함수 ( 메인페이지 캠핑장 조회 시 디폴트 날짜가 됩니다 )

export const dayOfWeekend = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // 형식 YYYY-MM-DD
  const saturday = new Date(today);
  saturday.setDate(today.getDate() + (6 - dayOfWeek));
  const saturdayFormatted = saturday.toISOString().split("T")[0];

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + (7 - dayOfWeek));
  const sundayFormatted = sunday.toISOString().split("T")[0];

  return { saturday: saturdayFormatted, sunday: sundayFormatted };
};

// 사용 방법
// const weekendDates = dayOfWeekeend(); 함수 호출
// 토요일:  weekendDates.saturday
// 일요일:  weekendDates.sunday
