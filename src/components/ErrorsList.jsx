import { Alert } from '@mui/material'

export function ErrorsList(props) {
  return (
    <>
      {props.err?.length > 0 ? (
        <div>
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
