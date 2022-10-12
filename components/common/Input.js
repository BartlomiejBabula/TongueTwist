import React from 'react'
import { Input as RneuiInput } from "@rneui/themed";

export const Input = (props) => {
  return (
    <RneuiInput
      autoCapitalize="none"
      autoCorrect={false}
      ref={props.forwardRef}
      {...props}
    />
  )
}
