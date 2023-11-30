import { textStyles } from '@/libs/styles'
import React from 'react'
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import { TextInput as TextInputPaper, TextInputProps } from 'react-native-paper'

type Props = {
  helperText?: string
  styleInput?: StyleProp<TextStyle>
  label?: string
} & TextInputProps

const Input: React.FC<Props> = ({ helperText, style, styleInput, label, ...props }) => {
  return (
    <View style={style}>
      {label && <Text style={textStyles.labelInput14}>{label}</Text>}

      <TextInputPaper
        mode="outlined"
        placeholderTextColor="#8391A1"
        {...props}
        render={(innerProps) => (
          <TextInput
            {...innerProps}
            style={
              props.multiline
                ? [innerProps.style, styles.textMultiline, styleInput]
                : [innerProps.style, styles.text, styleInput]
            }
          />
        )}
      />
      {helperText && props.error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    paddingBottom: 5,
    fontSize: 15,
  },
  textMultiline: {
    includeFontPadding: false,
    paddingBottom: 15,
    height: 150,
    fontSize: 15,
  },
  helperText: {
    color: 'red',
    fontSize: 12,
    includeFontPadding: false,
  },
})
export { Input }
