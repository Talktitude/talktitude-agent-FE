// 로그인 폼 타입
export interface LoginFormPropsType {
  loginFormData: {
    loginId: string;
    password: string;
  };
  onIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 로그인 아이디 유효성 검사 함수 연결
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 비밀번호 유효성 검사 함수 연결
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // 로그인 폼 제출 함수 연결
  keepLoggedIn: boolean; // 로그인 유지 체크박스 상태
  handleKeepLoggedInClick: () => void; // 로그인 유지 토큰 설정 로직 함수 연결
  disabled: boolean; // 로그인 버튼 비활성화 상태
  loginErrorMessage: string; // 로그인 에러 메시지
}

// 로그인 유지 체크박스 타입
export interface RememberBoxPropsType {
  keepLoggedIn: boolean; // 로그인 유지 체크박스 상태
  handleKeepLoggedInClick: () => void; // 로그인 유지 토큰 설정 로직 함수 연결
}

// 회원가입 폼 타입
export interface SignupFormPropsType {
  signupFormData: {
    loginId: string;
    password: string;
    password1: string;
    name: string;
    phone: string;
    email: string;
  };
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSignupChange: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckId: (loginId: string) => void;
  disabled: boolean;
}

// 로그인, 회원가입 공통 인터페이스 (input 필드, 버튼)
export interface InputFieldPropsType {
  placeholder: string; // 입력 필드 플레이스홀더
  type: string; // 입력 필드 타입
  value: string; // 입력 필드 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 필드 값 변경 함수
  isSignup?: boolean; // 회원가입 페이지 여부
  inputLabel?: string; // 입력 필드 라벨
}

export interface BottomButtonPropsType {
  type?: 'submit' | 'button'; // 버튼 타입
  disabled?: boolean; // 버튼 비활성화 상태
  className?: string; // 버튼 클래스 이름
  onClick?: () => void; // 버튼 클릭 함수
  children: React.ReactNode; // 버튼 자식 요소
}
