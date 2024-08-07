'use client'
import ModalInfo from "@/components/ModalInfo";
import Link from "next/link";
import { useState, useRef, useEffect, createRef } from "react";
import { Circles } from "react-loader-spinner";
import { useScreenshot, createFileName } from 'use-react-screenshot';
import WhiteBoard from "@/components/WhiteBoard";
import CustomLink from "@/components/CustomLink";
import Video from "@/components/Video";
import TABoard from "@/components/TABoard";
import CircleTextArea from "@/components/CircleTextArea";
import ColorGem from "@/components/ColorGem";
import Moveable from "react-moveable";

const circleImageSources = {
  gem_orange: "/img/gem_orange.png",
  gem_wit: "/img/gem_wit.png",
  gem_groen: "/img/gem_groen.png",
  gem_donkerblauw: "/img/gem_donkerblauw.png",
  gem_lichtblauw: "/img/gem_lichtblauw.png",
  gem_black: "/img/gem_black.png",
  gem_geel: "/img/gem_geel.png",
  gem_beige: "/img/gem_beige.png",
};

const initialCircleState = {
  basic: true,
  meTime: false,
  steptoGoal: false,
  taBoard: false,
  witBoard: false,
};

const viewTypes = [
  { type: 'basic', label: 'Bepper Balance Basic' },
  { type: 'meTime', label: 'Me-in-the-middle' },
  { type: 'steptoGoal', label: 'Steps to Goal' },
  { type: 'taBoard', label: 'Transactional Analysis' },
  { type: 'witBoard', label: 'White Board' },
];

const generateCircles = (src, count) => (
  Array.from({ length: count }, (_, index) => (
    <div className={`circle circle${index}`} key={index}>
      <p>Move</p>
      <img src={src} alt="" className="img-fluid" />
    </div>
  ))
);

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(50);
  const [view, setView] = useState(initialCircleState);
  const [textarea, setTextarea] = useState('');
  const textareaRef = useRef(null);
  const [screenCapture, takeScreenshot] = useScreenshot();
  const [color, setColor] = useState('gem_groen');
  const [showGem, setShowGem] = useState(false);

  const handleSave = () => {
    if (screenCapture) {
      const downloadLink = document.createElement('a');
      downloadLink.href = screenCapture;
      downloadLink.download = createFileName('bepper.png');
      downloadLink.click();
    }
  };

  const handleCapture = () => {
    takeScreenshot(document.querySelector(".content_editable"));
  }

  const handleClose = () => {
    const elements = document.getElementsByClassName('show_img-download');
    if (elements.length > 0) {
      elements[0].style.display = 'none';
    }
  };

  const handleShow = () => {
    document.getElementById('modalInfo').classList.add("show");
  };

  const handleViewChange = (viewType) => {
    setView({ basic: false, [viewType]: true });
    clearAllTextareas();
    document.querySelectorAll('.circle').forEach(circle => {
      circle.style.transform = '';
    });
    setShowGem(false);
  };

  const resetAll = () => {
    setScale(50);
    setView(initialCircleState);
    clearAllTextareas();
    document.querySelectorAll('.circle').forEach(circle => {
      circle.style.transform = '';
    });
    setShowGem(false);
  };

  const clearAllTextareas = () => {
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.value = "";
    });
  };

  if (loading) {
    return <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />;
  }

  return (
    <main className="main">
      <div className="main-wrapper">
        <div className="sidebar">
          <div className="sidebar_left">
            <ul>
              <li><Link href='/'><img src="/img/live.png" alt="live" className="img-fluid" /></Link></li>
              <li><Link href='/'><img src="/img/microphone.png" alt="microphone" className="img-fluid" /></Link></li>
              <li onClick={() => handleCapture}><Link href='/'><img src="/img/camera.png" alt="microphone" className="img-fluid" /></Link></li>
            </ul>
            <button className='infoicon' onClick={handleShow}><img src="/img/info-white.svg" alt="info" className="img-fluid" /></button>
          </div>
        </div>

        <div className="main-wrapper-content" style={{ backgroundImage: `url(/img/wood-bg.jpg)` }}>
          <div className="content_editable">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="header-top">
                    <div className="row">
                      <div className="col-md-10">
                        <div className="typeText">
                          <div className="textEditor"><span>M:</span> <input type="text" name="" id="" placeholder="Type here" /></div>
                          <div className="textEditor"><span>A:</span> <input type="text" name="" id="" placeholder="Type here" /></div>
                          <div className={`textEditor ${view.taBoard ? 'opacity-0' : ''}`}><span>W 1:</span> <input type="text" name="" id="" placeholder="Type here" /></div>
                          <div className={`textEditor ${view.taBoard ? 'opacity-0' : ''}`}><span>W 2:</span> <input type="text" name="" id="" placeholder="Type here" /></div>
                          <div className={`textEditor ${view.meTime || view.taBoard ? 'opacity-0' : ''}`}><span>W 3:</span> <input type="text" name="" id="" placeholder="Type here" /></div>
                        </div>
                      </div>
                      <div className="col-md-2 text-right">
                        <div className="logo">
                          <Link href='/' ><img src="/img/logo.png" alt="" className="img-fluid m-auto" /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6">
                  <div className="img-full" style={{ transform: `scale(${scale / 100 * 2})` }}>

                    <div className={`Bord_GD ${view.witBoard ? 'hide' : 'show'}`}>
                      <div className={`${view.steptoGoal ? 'arrow' : ''} ${view.taBoard ? 'd-none' : 'row'}`}>

                        {Array.from({ length: 9 }, (_, index) => (
                          <CircleTextArea key={index} index={index} textareaRef={textareaRef} setTextarea={setTextarea} />
                        ))}

                      </div>

                      <div className={`TA_Board ${view.taBoard ? 'row' : 'd-none'}`}>

                        {Array.from({ length: 3 }).map((_, i) => (
                          <div className="col-md-4 relative" key={i}>
                            <div className="row">
                              {['P', 'A', 'C'].map((letter, j) => (
                                <TABoard key={j} letter={letter} />
                              ))}
                            </div>
                          </div>
                        ))}

                      </div>

                      <div className={`bepper-bx cntr skyblue ${view.meTime || showGem ? 'show' : 'hide'}`}>
                        <div className="first">{generateCircles(circleImageSources[color], 10)}</div>
                        <div className="second">{generateCircles(circleImageSources[color], 10)}</div>
                      </div>
                    </div>

                    <Moveable
                      target={".circle"}
                      individualGroupable={true}
                      draggable={true}
                      throttleDrag={1}
                      edgeDraggable={false}
                      startDragRotate={0}
                      throttleDragRotate={0}
                      preventDefault={false}
                      onDrag={e => {
                        e.target.style.transform = e.transform;
                      }}
                    />

                    <div className={`white_bord ${view.witBoard ? 'show' : 'hide'}`}>
                      <WhiteBoard />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <CustomLink />
                    </div>

                    <div className="col-md-8">
                      <Video />
                    </div>
                  </div>

                  <div className="content_fixed">
                    <div className="reset-zoom">
                      <div className="reset">
                        <p onClick={resetAll}>reset <img src="/img/reset.svg" alt="reset" className="img-fluid" /></p>
                      </div>
                      <div className="zoom">
                        <p>zoom</p>
                        <input type="range" min="10" max="50" value={scale} onChange={e => setScale(parseInt(e.target.value, 10))} />
                      </div>
                    </div>

                    <div className="flex">
                      <ColorGem setColor={setColor} setShowGem={setShowGem} />

                      <div className="bepper-link">
                        <p>Select Bepper Balance Board</p>
                        <ul>
                          {viewTypes.map(({ type, label }) => (
                            <li key={type} className={`undo ${view[type] ? 'active' : ''}`}>
                              <button onClick={() => handleViewChange(type)}>&#11212; {label}</button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {screenCapture &&
          <div className="show_img-download">
            <img src={screenCapture} alt='react-screen-capture' />

            <div className="bbttn">
              <button onClick={handleSave}>Download</button>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        }

        <ModalInfo />
      </div>
    </main>
  );
}
