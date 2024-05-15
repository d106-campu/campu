/**
 * 전화번호 문자열을 형식화하는 함수
 * 예: "01012345678" -> "010-1234-5678"
 * 예: "0212345678" -> "02-123-4567"
 * 예: "033461337" -> "033-461-337"
 * 예: "0334613375" -> "033-461-3375"
 */
const formatPhoneNumber = (phoneNumber: string): string => {
  // 전화번호가 '02'로 시작하는 경우 (서울 지역번호)
  if (phoneNumber.startsWith("02")) {
    if (phoneNumber.length === 9) {
      return phoneNumber.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if (phoneNumber.length === 10) {
      return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    }
  }
  // 휴대폰 번호 (11자리)
  else if (phoneNumber.length === 11) {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
  // 일반 전화번호 (10자리)
  else if (phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  // 일반 전화번호 (9자리)
  else if (phoneNumber.length === 9) {
    return phoneNumber.replace(/(\d{2,3})(\d{3})(\d{3,4})/, "$1-$2-$3");
  }
  // 그 외의 경우 원본 전화번호 반환
  return phoneNumber;
};

export default formatPhoneNumber;
