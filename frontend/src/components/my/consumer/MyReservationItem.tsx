// 예약 더미 데이터

function createDummyData() {
  const camps = ["커현 캠핑장", "주노준호 캠핑장", "단비꼬야 캠핑장", "주용용 캠핑장", "챔경 캠핑장", "호조해조 캠핑장"];
  const areas = ["A구역", "B구역", "C구역", "D구역", "E구역", "F구역"];
  const campInduty = ["차박", "카라반", "텐트", "글램핑", "오토캠핑", "야영"];
  const campsite_tel = [
      "010-1234-5678", "010-1111-2222", "010-5678-1234", "010-4444-7777", "010-3333-6666", "010-2222-4444"
  ];
    

  return Array.from({ length: 10 }, (_, index) => {
    const startDay = 1 + (index * 3) % 28; // 캠핑 시작일 다양하게
    const endDay = startDay + 3; // 예약 종료일은 시작일로부터 대충 3일 후
    const month = '01';
    const startDate = `2024-${month}-${startDay.toString().padStart(2, '0')}`;
    const endDate = `2024-${month}-${endDay.toString().padStart(2, '0')}`;

    return {
      campName: camps[index % camps.length],
      area: `${areas[index % areas.length]}(벚꽃 캠핑존) ${10 + index * 5}`,
      date: `${startDate} ~ ${endDate}`,
      nights: 3,
      details: [
        {
          titleLeft: "날짜",
          contentLeft: `${startDate} ~ ${endDate}`,
          titleRight: "",
          contentRight: "",
        },
        {
          titleLeft: "인원",
          contentLeft: `성인 ${2 + index % 4}`,
          titleRight: "캠핑장 유형",
          contentRight: campInduty[index % campInduty.length],
        },
        {
          titleLeft: "사이트",
          contentLeft: `${areas[index % areas.length]}(벚꽃 캠핑존) ${10 + index * 5}`,
          titleRight: "입실 · 퇴실 시간",
          contentRight: "14:00 - 11:00",
        },
        {
          titleLeft: "가격",
          contentLeft: `${100000 + (index % 5) * 10000}`,
          titleRight: "전화번호",
          contentRight: campsite_tel[index % campsite_tel.length],
        },
      ],
      people: 2 + index % 4,
      camInduty: campInduty[index % campInduty.length],
      price: 100000 + (index % 5) * 10000,
      address: `경상북도 칠곡군 가산면 금화리 산${49 + index * 3}`
    };
  });
}


// 더미 데이터 생성
const getReservations = () => createDummyData();

export default getReservations;