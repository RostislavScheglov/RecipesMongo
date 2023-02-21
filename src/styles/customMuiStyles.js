import { TextField } from '@mui/material'
import { withStyles } from '@mui/styles'

export const CustomTextField = withStyles({
  root: {
    background: '#FCF8F2',
    // borderRadius: 6,
    '& label.Mui-focused': {
      color: '#121418',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000000',
      },
      '&:hover fieldset': {
        borderColor: '#000000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000000',
      },
    },
  },
})(TextField)
