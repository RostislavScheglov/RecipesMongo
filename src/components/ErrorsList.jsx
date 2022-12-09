import { Alert } from '@mui/material'

export function ErrorsList(props) {
  return (
    <>
      {props.isErr ? (
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
      <button onClick={() => console.log(props)}></button>
    </>
  )
}
