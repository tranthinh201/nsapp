import React from 'react'
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import { TextInput as TextInputPaper, TextInputProps } from 'react-native-paper'

type Props = {
  helperText?: string
  styleInput?: StyleProp<TextStyle>
} & TextInputProps

const Input: React.FC<Props> = ({ helperText, style, styleInput, ...props }) => {
  return (
    <View style={style}>
      <TextInputPaper
        mode="outlined"
        placeholderTextColor="#C0C0C0"
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
    fontSize: 12,
  },
  textMultiline: {
    includeFontPadding: false,
    paddingBottom: 15,
    height: 150,
    fontSize: 12,
  },
  helperText: {
    color: '#ff4400ec',
    fontSize: 12,
    includeFontPadding: false,
  },
})
export { Input }
