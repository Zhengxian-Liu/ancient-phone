import { useEffect, useRef, useState } from 'react';
import { Phone } from './phone/Phone';
import { pickFigure } from './figures';

export function App() {
  const [figure] = useState(pickFigure);
  const scale = useFitScale();

  useEffect(() => {
    document.title = `${figure.name}的 iPhone`;
  }, [figure]);

  return (
    <>
      <div className="stage">
        <div className="device" style={{ transform: `scale(${scale})` }}>
          <Phone figure={figure} />
        </div>
      </div>
    </>
  );
}

/** Scales the 393×852 device to fit any viewport without scrolling. */
function useFitScale() {
  const [scale, setScale] = useState(1);
  const raf = useRef(0);
  useEffect(() => {
    const fit = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const mobile = window.innerWidth <= 500;
        const w = mobile ? 393 : 393 + 24 + 40;
        const h = mobile ? 852 : 852 + 24 + 40;
        setScale(Math.min(1, window.innerWidth / w, window.innerHeight / h));
      });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return scale;
}
