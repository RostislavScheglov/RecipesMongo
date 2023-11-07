import { Alert } from '@mui/material'
import '../styles/componentsStyles/ErrorsList.css'

export const errorsSetter = (err, setErr) => {
  const errors = err.response.data.map((err) => err.msg)
  setErr(errors)
}
export function ErrorsList({ err, isLoading }) {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  if (isLoading) {
    return null
  }
  return (
    <>
      {err.length > 0
        ? (scrollTop(),
          (
            <div className="errorContainer">
              {err.map((err, index) => (
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
