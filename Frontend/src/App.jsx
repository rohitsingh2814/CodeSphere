import { Show,SignInButton, SignOutButton, UserButton } from '@clerk/react'
import './App.css'

function App() {
  

  return (
    <>
      <h1>Welcome to codeSphere</h1>

        <Show when="signed-out">
        <SignInButton mode="modal"
         > Login</SignInButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
        <SignOutButton />
      </Show>
    </>
  )
}

export default App
