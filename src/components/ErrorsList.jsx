import { Alert } from '@mui/material'

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
