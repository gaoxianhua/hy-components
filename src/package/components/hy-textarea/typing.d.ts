import { CSSProperties } from "vue";

export default interface IProps {
  modelValue: string;
  placeholder?: string;
  placeholderClass?: string;
  placeholderStyle?: CSSProperties;
  height?: number;
  confirmType?: "done" | "send" | "search" | "next" | "go";
  disabled?: boolean;
  count?: boolean;
  focus?: boolean;
  autoHeight?: boolean;
  fixed?: boolean;
  cursorSpacing?: number;
  cursor?: string;
  showConfirmBar?: boolean;
  selectionStart?: number;
  selectionEnd?: number;
  adjustPosition?: boolean;
  disableDefaultPadding?: boolean;
  holdKeyboard?: boolean;
  maxlength?: number;
  border?: HyApp.BorderType;
  formatter?: ((value: string) => string) | null;
  customStyle?: CSSProperties;
}
