export const diffDays = (
  startDateString: string | Date | null,
  endDateString: string | Date | null
) => {
  if (!startDateString || !endDateString) return;
  // string이면 Date 객체로 변환
  const startDate =
    typeof startDateString === "string"
      ? new Date(startDateString)
      : startDateString;
  const endDate =
    typeof endDateString === "string" ? new Date(endDateString) : endDateString;

  // 시작일과 종료일 사이의 일수 계산
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
0;
