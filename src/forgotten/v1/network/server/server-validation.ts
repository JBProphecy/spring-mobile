////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface AbstractValidationResult {
  checked: boolean
  success: boolean
  message: string | null
}

export type SimpleValidationResult = AbstractValidationResult

export type ComplexValidationResult<T> = AbstractValidationResult & {
  results: T
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type IsPresentValidationResult = SimpleValidationResult
export type IsPatternValidValidationResult = SimpleValidationResult

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type EmailValidations = {
  isPresent: IsPresentValidationResult
  isFormatted: IsPatternValidValidationResult
}

export type EmailValidationResult = ComplexValidationResult<EmailValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type EmailVerificationCodeValidations = {
  isPresent: IsPresentValidationResult
  isLengthValid: SimpleValidationResult
  areCharactersValid: IsPatternValidValidationResult
}

export type EmailVerificationCodeValidationResult = ComplexValidationResult<EmailVerificationCodeValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type EmailVerificationTokenValidations = {
  isPresent: IsPresentValidationResult
  isFormatted: IsPatternValidValidationResult
}

export type EmailVerificationTokenValidationResult = ComplexValidationResult<EmailVerificationTokenValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type NameValidations = {
  isPresent: IsPresentValidationResult
  isFormatted: IsPatternValidValidationResult
}

export type NameValidationResult = ComplexValidationResult<NameValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type PasswordValidations = {
  isPresent: IsPresentValidationResult
  isLengthValid: SimpleValidationResult
  areCharactersValid: IsPatternValidValidationResult
}

export type PasswordValidationResult = ComplexValidationResult<PasswordValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type UsernameValidations = {
  isPresent: IsPresentValidationResult
  isFormatted: IsPatternValidValidationResult
}

export type UsernameValidationResult = ComplexValidationResult<UsernameValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type AuthenticateAccountRequestBodyValidations = {
  isEmailValid: EmailValidationResult
  isPasswordValid: PasswordValidationResult
}

export type AuthenticateAccountRequestBodyValidationResult = ComplexValidationResult<AuthenticateAccountRequestBodyValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type RegisterAccountValidations = {
  isNameValid: NameValidationResult
  isEmailValid: EmailValidationResult
  isPasswordValid: PasswordValidationResult
}

export type RegisterAccountValidationResult = ComplexValidationResult<RegisterAccountValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type RegisterAccountVerifyEmailValidations = {
  isTokenValid: EmailVerificationTokenValidationResult
  isCodeValid: EmailVerificationCodeValidationResult
}

export type RegisterAccountVerifyEmailValidationResult = ComplexValidationResult<RegisterAccountVerifyEmailValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type RegisterProfileValidations = {
  isNameValid: NameValidationResult
  isUsernameValid: UsernameValidationResult
  isPasswordValid: PasswordValidationResult
}

export type RegisterProfileValidationResult = ComplexValidationResult<RegisterProfileValidations>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
