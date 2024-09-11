import { useEffect, useState } from 'react'
import { Copy } from "sunmoon-working-components";

function _(video: string, width: number, height: number): Promise<string> {
  return new Promise(function (resolve) {
    let poster = '';
    let videoDom = document.createElement("video");
    videoDom.setAttribute('src', video);
    videoDom.setAttribute('width', String(width));
    videoDom.setAttribute('height', String(height));
    videoDom.setAttribute('preload', 'auto');
    videoDom.addEventListener('loadeddata', function () {
      const canvas = document.createElement("canvas")
      const width = videoDom.width;
      const height = videoDom.height;
      canvas.width = width;
      canvas.height = height;
      // @ts-ignore
      canvas.getContext("2d").drawImage(videoDom, 0, 0, width, height)
      poster = canvas.toDataURL('image/png');
      resolve(poster);
    })
  })
}

function App() {
  const [poster, setPoster] = useState<string>('')

  useEffect(() => {
    _('/demo.mp4', 375, 812).then((poster) => {
      setPoster(poster)
    })
  }, [])

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        Copy data:image/png;base64 link<Copy width={24} href={24} text={poster}/>
      </div>
      <img src={poster} alt=""/>
    </>
  )
}

export default App
