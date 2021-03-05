/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */

export const initialize = (environment, appId) => {
  const vpInitRequest = JSON.stringify({ environment, appId })
  try {
      if (typeof Android !== "undefined" && Android !== null) {
          Android.initialize(vpInitRequest);
      } else if(navigator.userAgent && navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
          webkit.messageHandlers.initialize.postMessage(vpInitRequest)
      }
  } catch (ex) {
      console.log(`Initialize fail with exception - ${ex.message}`)
  } 
}

// function handleInitializationSuccess(vpInitResponse) {
//   initializationSuccess(vpInitResponse)
// }

// export const initialize = (environment, appId) => {
//   return new Promise((resolve, reject) => {
//     const vpInitRequest = JSON.stringify({ environment, appId })
//     try {
//         if (typeof Android !== "undefined" && Android !== null) {
//             Android.initialize(vpInitRequest);
//         } else if(navigator.userAgent && navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
//             webkit.messageHandlers.initialize.postMessage(vpInitRequest)
//         }
//         resolve(JSON.stringify({ signedNonce: '1234599' }))
//     } catch (ex) {
//         console.log(`Initialize fail with exception - ${ex.message}`)
//         reject(ex)
//     } 
//   })
// }

// Hang.Vuong@ncr.com