////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { BasicButton } from "@/src/v1/vanilla/components/basic-button/basic-button";
import { BasicField } from "@/src/v1/vanilla/components/basic-field/basic-field";
import { BasicFormSpace } from "@/src/v1/vanilla/components/basic-form-space/basic-form-space";
import { BasicForm } from "@/src/v1/vanilla/components/basic-form/basic-form";
import { useKeyboardState } from "@/src/v1/vanilla/hooks/use-keyboard-state";
import { useState } from "react";
import { Keyboard } from "react-native";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function AccessAccountForm()
{
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { isKeyboardVisible } = useKeyboardState()

  return (
    <BasicForm title="Access Account">
      <BasicField value={email} onChangeText={setEmail}
        optionalProps={{
          textInputProps: {
            placeholder: "Email",
            autoComplete: "email",
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
            autoComplete: "password",
            autoCapitalize: "none"
          }
        }}
      />
      <BasicFormSpace />
      <BasicButton
        text="Sign In"
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
