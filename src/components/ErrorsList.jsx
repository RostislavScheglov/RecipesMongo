import { Alert } from '@mui/material'

export const errorsSetter = (err, setErr) => {
  const errors = err.response.data.map((err) => err.msg)
  setErr(errors)
}
export function ErrorsList(props) {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  if (props.isLoading) {
    return null
  }
  return (
    <>
      {props.err.length > 0
        ? (scrollTop(),
          (
            <div className="errorContainer">
              {props.err.map((err, index) => (
                <Alert
                  key={index}
                  severity="error"
                >
                  {err}
                </Alert>
              ))}
            </div>
          ))
        : null}
    </>
  )
}
