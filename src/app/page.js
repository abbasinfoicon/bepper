'use client'
import { useEffect, useRef, useState } from "react";
import { ScreenCapture } from 'react-screen-capture';
import html2canvas from "html2canvas";
import MainScreen from "@/components/MainScreen";
import Moveable from "react-moveable";
import { RiCloseLine } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [screenCapture, setScreenCapture] = useState('');
  const ref = useRef(null)
  const [image, setImage] = useState(null);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const handleScreenCapture = (screenCapture) => {
    setScreenCapture(screenCapture);
    document.body.classList.add('overflow_body');
  };

  const handleSave = () => {
    const screenCaptureSource = screenCapture;
    const downloadLink = document.createElement('a');
    const fileName = 'bepper.png';

    downloadLink.href = screenCaptureSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleClose = () => {
    setScreenCapture('');
    document.body.classList.remove('overflow_body');
  };

  const getImage = async () => {
    const canvas = await html2canvas(ref.current);
    const dataURL = canvas.toDataURL('image/png');
    setImage(dataURL);
    document.body.classList.add('overflow_body');
  };

  const downloadScreenshot = () => {
    const a = document.createElement("a");
    a.href = image;
    a.download = "bepper.png";
    a.click();
  };

  const resetImage = () => {
    setImage(null);
    document.body.classList.remove('overflow_body');
  };

  if (loading) {
    return <div className="juNRvt"><span class="loader"> </span></div>;
  }

  return (
    <main className="main">
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }) => (
          <MainScreen getImage={getImage} refScreen={ref} />
        )}
      </ScreenCapture>

      {screenCapture &&
        <div className="target show_img-download">
          <img src={screenCapture} alt='react-screen-capture' />

          <div className="bbttn">
            <button onClick={handleSave}>Download</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      }

      {image &&
        <div className="target show_img-download">
          <img src={image} alt={'Screenshot'} />

          <div className="bbttn">
            <button onClick={downloadScreenshot}><FaDownload /></button>
            <button onClick={resetImage}><RiCloseLine /></button>
          </div>
        </div>
      }

      {image &&
        <Moveable
          target={".target"}
          draggable={true}
          scalable={true}
          keepRatio={true}
          throttleScale={0.001}  // Lower value for smoother scaling
          onDrag={e => {
            e.target.style.transform = e.transform;
          }}
          onScale={e => {
            const { drag, scale } = e;
            e.target.style.transform = `${drag.transform} scale(${scale[0]}, ${scale[1]})`;
          }}
        />
      }
    </main>
  );
}
