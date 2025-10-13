export interface EditFormPropsType {
  userData: {
    name: string;
    phone: string;
    email: string;
    currentPassword: string;
    profileImage?: File | null;
  };
  currentProfileImageUrl?: string;
  onEditChange: (
    key: 'name' | 'phone' | 'email' | 'currentPassword',
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileImageChange: (file: File) => void;
  onEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ProfileImagePropsType {
  profileImageUrl: string;
  onChangePhoto: (file: File) => void;
}

export interface ChangePasswordFormPropsType {
  passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  errors: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onPasswordChange: (
    key: 'currentPassword' | 'newPassword' | 'confirmPassword',
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}

export interface MyInfoModalPropsType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ConfirmDeleteAccountModalPropsType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface UserInfoType {
  name: string;
  email: string;
  // isFiltering: boolean;
  phoneNum: string;
  profileImageUrl: string;
}

export interface EditUserData {
  name: string;
  phone: string;
  email: string;
  password: string;
  profileImageUrl: string;
}
