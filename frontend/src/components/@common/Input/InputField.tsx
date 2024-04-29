import { PropsWithChildren } from "react";

interface IInputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  maxLength?: number;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  certificationButton?: JSX.Element; // 휴대폰 인증 버튼을 위해서만 사용
  flex?: string,
  justifyContent?: string;
  width?: string;
  height?: string;
  labelPadding?: string;
  inputPadding?: string;
  errorPadding?: string;
  border?: string;
  borderColor?: string;
  rounded?: string;
  outline?: string;
  inputTextSize?: string;
  labelTextSize?: string;
  errorTextSize?: string;
  errorTextColor?: string;
}
const positiveFeedbackMessages = [
  "사용 가능한 아이디입니다.",
  "사용 가능한 닉네임입니다.",
  "인증 성공!",
  "올바른 비밀번호가 설정되었습니다.",
  "비밀번호가 일치합니다.",
];
const InputField = ({
  // input 속성 필드
  label,
  type,
  name,
  value,
  placeholder,
  maxLength,
  error,
  onChange,
  certificationButton,
  // 아래서부터 TailWind CSS
  flex = 'flex',
  justifyContent = 'justify-between',
  width = 'w-full',
  height = 'h-10',
  inputPadding = 'pl-2',
  labelPadding = 'pl-1 pt-3',
  errorPadding = 'pl-1 pt-3.5',
  border = 'border-2',
  borderColor = 'border-gray-100',
  rounded = 'rounded-lg',
  outline = 'outline-none',
  inputTextSize = 'text-sm',
  labelTextSize = 'text-sm',
  errorTextSize = 'text-xs',
  errorTextColor = 'text-red-400',
  children,
  ...props
}: PropsWithChildren<IInputFieldProps>): JSX.Element => {
  const isErrorPositiveFeedback = positiveFeedbackMessages.includes(error);
  const customErrorColor = isErrorPositiveFeedback ? 'text-MAIN_GREEN' : errorTextColor;

  return (
    <div>
      <div className={`${flex} ${justifyContent}`}>
        <label className={`${labelTextSize} ${labelPadding}`}>{label}</label>
        {error && <p className={`${errorTextSize} ${customErrorColor} ${errorPadding}`}>{error}</p>}
      </div>
      <div className="relative flex">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${width} ${height} ${inputPadding} ${border} ${borderColor} ${rounded} ${outline} ${inputTextSize} `}
          maxLength={maxLength}
          {...props}
        />
        {/* 인증 버튼이 보일 땐 오른쪽 끝에 표시 */}
        {certificationButton && (
          <div className="absolute right-2 top-0 h-full flex items-center">
            {certificationButton}
          </div>
        )}
      </div>
    </div>
  )
}

export default InputField