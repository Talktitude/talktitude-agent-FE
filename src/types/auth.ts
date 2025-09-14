// 로그인 폼 타입
export interface LoginFormPropsType {
  loginFormData: {
    loginId: string;
    password: string;
  };
  onLoginChange: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void; // 로그인 아이디 또는 비밀번호 변경 함수 연결
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // 로그인 폼 제출 함수 연결
  keepLoggedIn: boolean; // 로그인 유지 체크박스 상태
  handleKeepLoggedInClick: () => void; // 로그인 유지 토큰 설정 로직 함수 연결
  disabled: boolean; // 로그인 버튼 비활성화 상태
  loginErrorMessage: string; // 로그인 에러 메시지
  isLoading?: boolean; // 로딩 상태
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
    passwordConfirm: string;
    name: string;
    phone: string;
    email: string;
  };
  errors?: Record<string, string>;
  successMessages?: Record<string, string>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSignupChange: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (key: string) => () => void;
  handleCheckId: (loginId: string) => void;
  disabled: boolean;
}

// 로그인, 회원가입, 내 정보 수정 공통 인터페이스 (input 필드, 버튼)
export interface InputFieldPropsType {
  placeholder?: string; // 입력 필드 플레이스홀더
  type: string; // 입력 필드 타입
  value: string; // 입력 필드 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 필드 값 변경 함수
  onBlur?: () => void; // 입력 필드 포커스 아웃 함수
  isSignup?: boolean; // 회원가입 페이지 여부
  inputLabel?: string; // 입력 필드 라벨
  errorMessage?: string; // 입력 필드 에러 메시지
  successMessage?: string; // 입력 필드 성공 메시지
  handleCheckId?: (loginId: string) => void; // 아이디 중복 확인 함수
}

export interface BottomButtonPropsType {
  type?: 'submit' | 'button'; // 버튼 타입
  disabled?: boolean; // 버튼 비활성화 상태
  className?: string; // 버튼 클래스 이름
  onClick?: () => void; // 버튼 클릭 함수
  children: React.ReactNode; // 버튼 자식 요소
}
