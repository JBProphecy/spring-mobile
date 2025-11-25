////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Percent } from "@/src/v2/app/modules/jax/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { BasicFormSpace } from "../basic-form-space/basic-form-space";
import { BasicText } from "../basic-text/basic-text";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type BasicFormProps = {
  title?: string
  children?: React.ReactNode
}

export function BasicForm({ title, children }: BasicFormProps)
{
  return (
    <View style={styles.form}>
      <BasicFormSpace />
      {title !== undefined && (
        <>
          <BasicText
            text={title}
            fontSize={36}
            lineHeight={36}
            padding={0}
            alignSelf="center"
          />
          <BasicFormSpace />
        </>
      )}
      {children}
      <BasicFormSpace />
    </View>
  )
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const styles = StyleSheet.create({
  form: {
    width: Percent[100],
    maxWidth: 600,
    paddingHorizontal: 32,
    alignSelf: "center"
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
