// 복사 함수
// @TODO: 토스트 메시지로 바꾸기
export const copyToClipboard = async (targetString: string) => {
  if (!navigator.clipboard) {
    alert("클립보드 사용이 불가능한 환경입니다.");
    return;
  }

  try {
    await navigator.clipboard.writeText(targetString);
    alert("클립보드에 복사되었습니다.");
  } catch (err) {
    console.error("클립보드 복사 실패:", err);
    alert("클립보드 복사에 실패했습니다.");
  }
};
