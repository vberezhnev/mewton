import { useLayoutEffect, useState } from 'react'
import { Router, RouterProps } from 'react-router-dom'
import { BrowserHistory } from 'history'

type Props = {
  history: BrowserHistory
} & Partial<RouterProps>

export const CustomRouter = ({ history, ...props }: Props) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}