// import { TextField } from '@mui/material'
// import { withStyles } from '@mui/styles'

// export const CustomTextField = withStyles({
//   root: {
//     typography: { fontSize: '30px' },
//     background: '#FCF8F2',
//     // borderRadius: 6,
//     '& label.Mui-focused': {
//       color: '#121418',
//       fontFamily: 'Montserrat',
//       // fontSize: '12px',
//     },
//     '& label': {
//       // color: '#121418',
//       fontFamily: 'Montserrat',
//       // fontSize: '12px',
//     },
//     // '& .MuiInput-underline:after': {
//     //   borderBottomColor: 'green',
//     // },
//     '& .MuiOutlinedInput-root': {
//       '& input': {
//         color: '#121418',
//         fontSize: '14px',
//         fontFamily: 'Montserrat',
//         textAlign: 'start',
//       },
//       '& fieldset': {
//         // fontFamily: 'Montserrat',
//         borderColor: '#000000',
//       },
//       '&:hover fieldset': {
//         borderColor: '#000000',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: '#000000',
//       },
//     },
//   },
// })(TextField)

export const inputSyles = {
  backgroundColor: '#FCF8F2',
  fontFamily: 'Montserrat',
  border: 'none',
  '& label.Mui-focused': {
    color: '#121418',
  },
  '& label': {
    fontFamily: 'Montserrat',
  },
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: '#121418',
      fontSize: '14px',
      fontFamily: 'Montserrat',
    },
    '& fieldset': {
      borderColor: '#000000',
      border: '1px solid black',
    },
    '&:hover fieldset': {
      borderColor: '#000000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000',
      border: '1px solid black',
    },
  },
}
