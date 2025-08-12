export interface EditFormPropsType {
  userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
  };
  onEditChange: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ProfileImagePropsType {
  profileImageUrl: string;
  onChangePhoto: () => void;
}

export interface ChangePasswordFormPropsType {
  passwordData: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  };
  errors: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  };
  onPasswordChange: (
    key: 'currentPassword' | 'newPassword' | 'newPasswordConfirm',
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}

export interface MyInfoModalPropsType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface CustomModalPropsType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  mode?: 'center' | 'top-right';
  isFooter?: boolean;
  onLogout?: () => void;
}
