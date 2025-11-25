////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { OptionalValidationMessageBlock } from "@/src/v1/experimental/components/validation-nest"
import { handleRegisterAccountResponse, RegisterAccountResponseData, sendRegisterAccountRequest } from "@/src/v1/network/server/routes/register-account"
import { RegisterAccountRequestBody } from "@/src/v1/network/server/server-request-body"
import { InternalServerErrorResponseBody, InvalidRequestBodyResponseBody, RegisterAccountResponseBodySuccess } from "@/src/v1/network/server/server-response-body"
import { EmailValidationResult, NameValidationResult, PasswordValidationResult, RegisterAccountValidationResult } from "@/src/v1/network/server/server-validation"
import { useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type CreateAccountFormProps = {}

export function CreateAccountForm()
{
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [nameValidation, setNameValidation] = useState<NameValidationResult | null>(null)
  const [emailValidation, setEmailValidation] = useState<EmailValidationResult | null>(null)
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidationResult | null>(null)

  const handleSuccess = (body: RegisterAccountResponseBodySuccess) => {
    console.log(body)
  }

  const handleInternalServerError = (body: InternalServerErrorResponseBody) => {
    console.log(body)
  }

  const handleInvalidRequestBody = (body: InvalidRequestBodyResponseBody<RegisterAccountValidationResult>) => {
    setNameValidation(body.validation.results.isNameValid)
    setEmailValidation(body.validation.results.isEmailValid)
    setPasswordValidation(body.validation.results.isPasswordValid)
  }

  const handleSubmit = async () => {
    const requestBody: RegisterAccountRequestBody = { name, email, password }
    try {
      const response: Response = await sendRegisterAccountRequest(requestBody)
      const { type, body }: RegisterAccountResponseData = await handleRegisterAccountResponse(response)
      switch (type) {
        case "hotbox:types:response:internal-server-error":
          handleInternalServerError(body as InternalServerErrorResponseBody)
          break
        case "hotbox:types:response:invalid-request-body":
          handleInvalidRequestBody(body as InvalidRequestBodyResponseBody<RegisterAccountValidationResult>)
          break
        case "hotbox:types:response:success":
          handleSuccess(body as RegisterAccountResponseBodySuccess)
          break
        default:
          console.log(body)
          throw new Error(`Unexcpected Response Type: [${type}]`)
      }
    }
    catch (object: unknown) {
      const error = object as Error
      console.log(error.message)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroller}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor={colors.lightPlaceholder}
        autoComplete="given-name"
      />
      <OptionalValidationMessageBlock validations={nameValidation?.results} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={colors.lightPlaceholder}
        autoComplete="email"
      />
      <OptionalValidationMessageBlock validations={emailValidation?.results} />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={colors.lightPlaceholder}
        autoComplete="new-password"
      />
      <OptionalValidationMessageBlock validations={passwordValidation?.results} />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        placeholderTextColor={colors.lightPlaceholder}
        autoComplete="new-password"
      />
      <View style={styles.gap} />
      <Pressable
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </ScrollView>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const colors = {
  lightPlaceholder: "rgb(128, 128, 128)",
  white208: "rgb(208, 208, 208)"
} as const

const styles = StyleSheet.create({
  gap: {
    height: 24
  },
  container: {
    width: "100%",
    height: "100%"
  },
  scroller: {
    width: "100%",
    flexDirection: "column",
    padding: 16
  },
  title: {
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    color: colors.white208,
    fontWeight: "bold",
    fontSize: 28
  },
  label: {
    width: "100%",
    fontSize: 20,
    color: colors.white208,
    fontWeight: "bold",
    lineHeight: 48,
    paddingHorizontal: 3
  },
  input: {
    width: "100%",
    borderWidth: 3,
    borderColor: "red",
    fontSize: 16,
    color: colors.white208,
    padding: 12
  },
  button: {
    backgroundColor: "black",
    alignSelf: "center"
  },
  text: {
    color: colors.white208,
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
    padding: 12,
    borderWidth: 3,
    borderColor: colors.white208
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
