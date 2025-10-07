////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { AbstractValidationResult, ComplexValidationResult } from "@/api/server/server-validation"
import { StyleSheet, Text, View } from "react-native"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function hasResults(validation: AbstractValidationResult): validation is ComplexValidationResult<Object> {
  return "results" in validation
}

type ValidationMessageRowProps = {
  validation: AbstractValidationResult
  depth?: number
}

export function ValidationMessageRow({ validation, depth = 0 }: ValidationMessageRowProps) {
  if (hasResults(validation)) {}
  return (
    <View>
      <Text
        style={[validation.success ? styles.success : styles.failure, { paddingLeft: 16 * depth + 3}]}
        children={validation.message}
      />
      {hasResults(validation) ? <ValidationMessageBlock validations={validation.results} depth={depth + 1} /> : <></>}
    </View>
  )
}

type ValidationMessageBlockProps = {
  validations: Object
  depth?: number
}

export function ValidationMessageBlock({ validations, depth = 0 }: ValidationMessageBlockProps) {
  return Object.values(validations).map((result, index) => <ValidationMessageRow key={index} validation={result} depth={depth} />)
}

type OptionalValidationMessageBlockProps = {
  validations: Object | null | undefined
  depth?: number
}

export function OptionalValidationMessageBlock({ validations = null, depth = 0 }: OptionalValidationMessageBlockProps) {
  return validations !== null
    ? <ValidationMessageBlock validations={validations} depth={depth} />
    : <></>
}

type NullableValidationMessageRowProps = {
  validation: AbstractValidationResult | null
  depth?: number
}

export function NullableValidationMessageRow({ validation, depth = 0 }: NullableValidationMessageRowProps) {
  return validation !== null
    ? <ValidationMessageRow validation={validation} depth={depth} />
    : <></>
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  success: { color: "green" },
  failure: { color: "red" }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
