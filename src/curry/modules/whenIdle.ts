import { $, Curry } from "..";

type OnIdle = (
  this: Curry,
  threshold: number,
  cn?: ({}: { instance: Curry, detector: IdleDetector, abort: AbortController['abort']}) => void
) => Curry

export const _onIdle: OnIdle = function(this, threshold, cb) {
  this.queue(async () => {
    return new Promise(async (resolve) => {
      if ((await IdleDetector.requestPermission()) !== "granted") {
        console.error("Idle detection permission denied. The chain can not complete.");
        resolve(true)
      }

      const {abort, signal} = new AbortController()

      try {
        const detector = new IdleDetector();

        detector.addEventListener('change', () => {
          cb?.apply(this, [
            {
              instance: this,
              detector,
              abort
            }    
          ])
        })

        

        await detector.start({ threshold, signal })
      } 
      catch {
        console.error('Error when using idle detection. This chain is now cancelled.')
      }


    })
  })

  return this
}