import { useState, useEffect } from "react";
import { ILoginFormValues } from "@/types/auth";
import { useDispatch } from "react-redux";
import { setIsLogin } from "@/features/login/authSlice";
import Button from "@/components/@common/Button/Button";
import InputField from "@/components/@common/Input/InputField";
import { useSignup } from '@/hooks/auth/useSignup';
import {
  MIN_ID_LENGTH, MAX_ID_LENGTH, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH,
} from '@/constants/constants';
import Toast from '@/components/@common/Toast/Toast';

interface ILoginFormProps {
  isSmallScreen: boolean;
  toggleForm: () => void;
  openFindpwdModal: () => void;
}

const LoginForm = ({
  isSmallScreen,
  toggleForm,
  openFindpwdModal,
}: ILoginFormProps): JSX.Element => {
  const { loginMutation } = useSignup();
  const dispatch = useDispatch();
  const [values, setValues] = useState<ILoginFormValues>({
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState<ILoginFormValues>({
    id: "",
    password: "",
  });

  // 로그인 유효성 검사 함수
  const validateLoginForm = () => {
    let isValid = true;
    const newErrors = { id: "", password: "" };

    if (!values.id) {
      newErrors.id = "아이디를 입력해주세요.";
      isValid = false;
    } else if (values.id.length < MIN_ID_LENGTH) {
      newErrors.id = "아이디는 6자리 이상입니다.";
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(values.id)) {
      newErrors.id = "아이디는 영문자와 숫자 조합입니다.";
      isValid = false;
    }

    if (!values.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
      isValid = false;
    } else if (values.password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = "비밀번호는 8자 이상입니다.";
      isValid = false;
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W]).{8,}$/.test(values.password)
    ) {
      newErrors.password = "영문자, 숫자, 특수문자를 모두 포함해야 합니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 로그인 클릭 시 유효성 검사 함수에 대해 분기 처리
  const handleSubmit = () => {
    if (validateLoginForm()) {
      loginMutation.mutate({ account: values.id, password: values.password }, {
        onSuccess: () => {
          console.log("로그인 성공!");
          Toast.success('로그인 되었습니다 !');
          dispatch(setIsLogin(true));
        },
        onError: (error) => {
          console.error('로그인 실패 :', error);
          Toast.error('로그인에 실패했습니다.')
        }
      });
    }
  };

  // 사용자가 input에 입력하는 값 추적
  const handleInputChange =
    (name: keyof ILoginFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [name]: value }));
    };

  // 중복 코드 줄이기 위해 배열로 타입을 지정하고 map 메서드 사용
  const fields: Array<{
    label: string;
    name: keyof ILoginFormValues;
    placeholder: string;
    type: string;
    maxLength: number;
  }> = [
    {
      label: "아이디",
      name: "id",
      placeholder: "아이디를 입력하세요.",
      type: "text",
      maxLength: MAX_ID_LENGTH,
    },
    {
      label: "비밀번호",
      name: "password",
      placeholder: "비밀번호를 입력하세요.",
      type: "password",
      maxLength: MAX_PASSWORD_LENGTH,
    },
  ];

  // 키보드 엔터 누르면 "로그인" 버튼 작동시키기
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && validateLoginForm()) {
      handleSubmit();
    }
  };

  // form 태그를 사용하지않을 때 -> 키보드 "엔터" 감지
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [values]);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full h-auto min-h-[60vh] flex items-center justify-center rounded-2xl shadow-2xl bg-white relative">
          <div className="w-[80%]">
            {/* 헤더 */}
            <p
              className={
                isSmallScreen
                  ? "cursor-pointer visible text-centerfont-bold text-xs absolute top-3 left-10"
                  : "invisible"
              }
              onClick={toggleForm}
            >
              &lt; 회원가입
            </p>
            <div className="w-full p-3 flex items-center justify-center">
              <p className="text-center font-bold text-xl">로그인</p>
            </div>
            {/* 입력 폼 */}
            <div className="space-y-2">
              {fields.map((field) => (
                <InputField
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={handleInputChange(field.name)}
                  error={errors[field.name]}
                  maxLength={field.maxLength}
                />
              ))}
              <div className="flex flex-col justify-center items-center py-5 ">
                <Button
                  type="button"
                  text="비밀번호를 잊으셨나요?"
                  textSize="text-[15px]"
                  textColor="text-gray-400"
                  hoverTextColor="hover:text-black"
                  backgroundColor="none"
                  fontWeight="none"
                  hoverBackgroundColor="none"
                  padding="py-10"
                  onClick={openFindpwdModal}
                />
                <Button
                  type="button"
                  text="로그인"
                  textSize="text-md"
                  width="w-full"
                  borderRadius="rounded-md"
                  padding="px-auto"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
