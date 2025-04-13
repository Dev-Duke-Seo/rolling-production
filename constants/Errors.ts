// used in hook form error

interface Errors {
  [errorType: string]: string;
}

export const FORM_ERROR_MESSAGES: Errors = {
  REQUIRED: '필수 항목입니다.',
  MAX_LENGTH: '최대 길이를 초과했습니다.',
  MIN_LENGTH: '최소 길이를 충족하지 못했습니다.',
  INVALID_PATTERN: '형식이 올바르지 않습니다.',
  INVALID_VALUE: '올바르지 않은 값입니다.',
  REQUIRED_INDEX: '필수로 선택해야합니다.',
} as const;
