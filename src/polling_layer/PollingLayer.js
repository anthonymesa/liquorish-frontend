/**
 *  PollingLayer.js
 *  Author: Anthony Mesa
 * 
 *  The purpose of this module is to provide a hack that allows us to poll for 
 *  changes from the back end consistently over time. This functionality is
 *  overshadowed by the ability to create sockets to the backend for receiving
 *  updates, but that can be far more complicated than is required for a small
 *  application.
 */

import React, { useEffect } from 'react'

/**
 *  Three properties that can be passed to the polling layer:
 * 
 *    polling_time: The polling interval in milliseconds 
 * 
 *    timeout_ref: The string value reference for the setTimeout so that
 *      clearTimeout can be called elsewhere if necessary
 * 
 *    action: Callback to run after each waiting interval 
 * 
 *  !!! BEWARE using this module WITHOUT polling_time set to a reasonable millisecond
 *  amount can cause the browser to refresh infinitely. Do not leave the 
 *  polling_time parameter off.
 */
export default function PollingLayer({polling_time, timeout_ref, action=null}){

  /**
   *  This state will 'flip flop' back and forth from true to false. The purpose 
   *  of this is so that it can be continuously flopped back and forth,
   *  retriggering this module's render each time.
   */
  const [flip_flop, setFlipFlop] = React.useState(false)

//   /**
//    *  Only runs on initial component mount. Sets flip_flop state 1 second in the
//    *  future. This will cause a module refresh, triggering the next effect that
//    *  runs if flip_flop has changed.
//    */
//   useEffect(() => {
//     setTimeout(() => {
//       setFlipFlop(flip_flop ? false : true)
//     }, polling_time, timeout_ref)
//   }, []);

//   /**
//    * This effect should run every time flip_flop is updated. Once run, it will 
//    * simply set the state of flip_flop 1 second in the future, thus causing this
//    * effect to run indefinitely as long as polling layer is mounted.
//    */
//   useEffect(() => {
//     setTimeout(() => {

//       if(action){
//         action()
//       }

//       setFlipFlop(flip_flop ? false : true)
//     }, polling_time, timeout_ref)
//   }, [flip_flop])
  
  /**
   * Nothing needs to be returned, this just makes React happy.
   */
  return(
    <div></div>
  )
}