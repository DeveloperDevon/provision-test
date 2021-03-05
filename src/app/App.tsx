import React from 'react'
// import { APP_ID } from '../lib/constants'
import { initialize } from '../lib/helpers'

// Enter App Id here
const APP_ID = ''

const App: React.FC = () => {
  const [initResponse, setInitResponse] = React.useState<any>()
  const [signedNonce, setSignedNonce] = React.useState<any>()
  const [error, setError] = React.useState<any>()

  const initializationSuccess = (vpInitResponse: any) => {
    setInitResponse(vpInitResponse)
    const { signedNonce } = JSON.parse(vpInitResponse)
    setSignedNonce(signedNonce)
    // Use the signed nonce as part of card encryption and pass payload to getSupportedWallets call
    // encryptCardInfoMutation({ id: 'id', cardId: 'cardId', nonce: signedNonce })
    //  .then((encryptedPayload) => getSupportedWallets(encryptedPayload))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleInitializationSuccess(vpInitResponse: any) {
    initializationSuccess(vpInitResponse)
    setError(null)
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function processError(vpError: any) {
    const errorRsp = JSON.parse(vpError)
    setError(errorRsp.description)
    // const type = errorRsp.type
    // const code = errorRsp.code
    // const description = errorRsp.description
    // const correlationID = errorRsp.correlationID
    // Update UI flow based on error response
}

  // const handleMockResponse = () => {
  //   const RESPONSE = JSON.stringify({ signedNonce: '12345' })
  //   handleInitializationSuccess(RESPONSE)
  // }

  return (
    <div style={{ padding: 30 }}>
      <h2>Card Provisioning Test</h2>
      <button onClick={() => initialize('sandbox', APP_ID)}>Initialize</button>
      {/* <button onClick={handleMockResponse}>Mock response</button> */}
      <p>Init Response String: {initResponse}</p>
      <p>Signed Nonce: {signedNonce}</p>
      <p>Error: {error} </p>
    </div>
  )
}

export default App