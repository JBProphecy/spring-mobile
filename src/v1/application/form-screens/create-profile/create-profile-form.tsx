////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { BasicButton } from "@/src/v1/vanilla/components/basic-button/basic-button";
import { BasicField } from "@/src/v1/vanilla/components/basic-field/basic-field";
import { BasicFormSpace } from "@/src/v1/vanilla/components/basic-form-space/basic-form-space";
import { BasicForm } from "@/src/v1/vanilla/components/basic-form/basic-form";
import { useKeyboardState } from "@/src/v1/vanilla/hooks/use-keyboard-state";
import { useState } from "react";
import { Keyboard } from "react-native";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function CreateProfileForm()
{
  const [name, setName] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const { isKeyboardVisible } = useKeyboardState()

  return (
    <BasicForm title="Create Profile">
      <BasicField value={name} onChangeText={setName}
        optionalProps={{
          textInputProps: {
            placeholder: "Name",
            autoComplete: "given-name"
          }
        }}
      />
      <BasicFormSpace />
      <BasicField value={username} onChangeText={setUsername}
        optionalProps={{
          textInputProps: {
            placeholder: "Username",
            autoComplete: "username",
            autoCapitalize: "none",
          }
        }}
      />
      <BasicFormSpace />
      <BasicField value={password} onChangeText={setPassword}
        optionalProps={{
          textInputProps: {
            secureTextEntry: true,
            placeholder: "Password",
            autoComplete: "new-password",
            autoCapitalize: "none"
          }
        }}
      />
      <BasicFormSpace />
      <BasicField value={confirmPassword} onChangeText={setConfirmPassword}
        optionalProps={{
          textInputProps: {
            secureTextEntry: true,
            placeholder: "Password",
            autoComplete: "new-password",
            autoCapitalize: "none"
          }
        }}
      />
      <BasicFormSpace />
      <BasicButton
        text="Create Profile"
        alignSelf="flex-end"
        isDisabled={isKeyboardVisible}
        pressable={{
          onPress: () => { Keyboard.dismiss() }
        }}
      />
    </BasicForm>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
