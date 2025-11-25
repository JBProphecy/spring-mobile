////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView } from "react-native";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function BasicFormScreen({ form }: { form: React.ReactNode })
{
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height" }
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <ScrollView
          children={form}
          style={{ flex: 1 }}
          contentContainerStyle={{ width: "100%" }}
        >
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
