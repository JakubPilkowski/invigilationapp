import useUpdateEvent from 'hooks/useUpdateEvent';
import { nanoid } from 'nanoid';
import React, { memo } from 'react';
import './Dogs.scss';

const images = [
  {
    id: nanoid(),
    src: '/static/images/piesek_boo.jpg',
    alt: 'Piesek Boo',
  },
  {
    id: nanoid(),
    src: '/static/images/szczeniak.jpg',
    alt: 'Szczeniak',
  },
  {
    id: nanoid(),
    src: '/static/images/chihuahua.webp',
    alt: 'Chihuahua',
  },
  {
    id: nanoid(),
    src: '/static/images/doberman.jpg',
    alt: 'Doberman',
  },
  {
    id: nanoid(),
    src: '/static/images/piesek_dywanik.jpg',
    alt: 'Piesek na dywaniku',
  },
  {
    id: nanoid(),
    src: '/static/images/bialy-szpic-miniaturowy.jpg',
    alt: 'Szpic',
  },
];

const Dogs = () => {
  const { updateEvent } = useUpdateEvent();

  const handleImageClick = (e: React.MouseEvent) => {
    const img = e.currentTarget.children[0] as HTMLImageElement;
    updateEvent(`Klika w ${img.alt} i nie ma dość!`);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const img = e.currentTarget.children[0] as HTMLImageElement;
    updateEvent(`Dotyka ${img.alt} bez pozwolenia!`);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const img = e.currentTarget.children[0] as HTMLImageElement;
    updateEvent(`Przestał ruszać ${img.alt}!`);
  };

  const handleScroll = () => {
    updateEvent('Scrolluje pieski');
  };

  return (
    <div className="Dogs" onScroll={handleScroll}>
      <div className="Dogs__grid">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={handleImageClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            type="button"
          >
            <img className="grid__dog" draggable={false} src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(Dogs);
