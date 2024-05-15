// 복사 함수

import Toast from "@/components/@common/Toast/Toast";

// @TODO: 토스트 메시지로 바꾸기
export const copyToClipboard = async (targetString: string) => {
  if (!navigator.clipboard) {
    Toast.error("클립보드 사용이 불가능한 환경입니다.");
    return;
  }

  try {
    Toast.success("클립보드에 복사되었습니다.");
    await navigator.clipboard.writeText(targetString);
  } catch (err) {
    Toast.error("클립보드 복사에 실패했습니다😥 다시 시도해주세요");
  }
};
