import { Alert } from '@mui/material'

export const errorsSetter = (err, setErr) => {
  const errors = err.response.data.map((err) => err.msg)
  setErr(errors)
}
export function ErrorsList(props) {
  return (
    <>
      {props.err?.length > 0 ? (
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
      ) : null}
    </>
  )
}
