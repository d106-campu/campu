// 예약 더미 데이터

function createDummyData() {
  const camps = ["커현 캠핑장", "주노준호 캠핑장", "단비꼬야 캠핑장", "주용용 캠핑장", "챔경 캠핑장", "호조해조 캠핑장"];
  const areas = ["A구역", "B구역", "C구역", "D구역", "E구역", "F구역"];
  const environments = ["숲 · 호수", "문화재 · 기념관", "산 · 언덕", "바다 · 해변", "평야 · 초원", "강 · 다리"];
  const detailsData = [
      { title: "기반", content: "파쇄석 · 개별 바베큐장 · 텐트옆 주차"},
      { title: "기반", content: "자갈 · 공용 바베큐장 · 차량금지" },
      { title: "기반", content: "흙 · 개별 화장실 · 애완동물 허용" },
      { title: "기반", content: "대리석 · 야경 명소 · 애완동물 금지" }
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
          titleRight: "입실 · 퇴실 시간",
          contentRight: "14:00 - 11:00",
        },
        {
          titleLeft: "사이트",
          contentLeft: `${areas[index % areas.length]}(벚꽃 캠핑존) ${10 + index * 5}`,
          titleRight: "주변 환경",
          contentRight: environments[index % environments.length],
        },
        {
          titleLeft: "기타정보",
          contentLeft: detailsData[index % detailsData.length].content,
          titleRight: "",
          contentRight: "",
        },
        {
          titleLeft: "가격",
          contentLeft: `${100000 + (index % 5) * 10000}원`,
          titleRight: "",
          contentRight: "",
        }
      ],
      people: 2 + index % 4,
      environment: environments[index % environments.length],
      price: `${100000 + (index % 5) * 10000}원`,
      address: `경상북도 칠곡군 가산면 금화리 산${49 + index * 3}`
    };
  });
}


// 더미 데이터 생성
const getReservations = () => createDummyData();

export default getReservations;