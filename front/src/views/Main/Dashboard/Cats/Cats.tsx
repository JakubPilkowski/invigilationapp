import React, { ChangeEvent, memo, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { TextField } from '@material-ui/core';

import useDebounce from 'hooks/useDebounce';
import useUpdateEvent from 'hooks/useUpdateEvent';

import ImageFilters from 'components/ImageFilters';

import './Cats.scss';

function getImageStyles(imageFilters: { id: string; style: string }[]) {
  return {
    filter: `${
      imageFilters.length > 0
        ? imageFilters.reduce((prev: string, imgFilt: { id: string; style: string }) => {
            if (prev === '') {
              return imgFilt.style;
            }
            return prev.concat(` ${imgFilt.style}`);
          }, '')
        : 'none'
    }`,
  };
}

const catImages = [
  {
    id: nanoid(),
    src: '/static/images/kot_syjamski.jpg',
    alt: 'Kot Syjamski',
  },
  {
    id: nanoid(),
    src: '/static/images/kot-syberyjski.jpg',
    alt: 'Kot Syberyjski',
  },
  {
    id: nanoid(),
    src: '/static/images/maine_coon.jpg',
    alt: 'Maine Coon',
  },
  {
    id: nanoid(),
    src: '/static/images/kotek_brytyjski.jpg',
    alt: 'Brytyjski',
  },
  {
    id: nanoid(),
    src: '/static/images/ragdoll.jpg',
    alt: 'Ragdoll',
  },
  {
    id: nanoid(),
    src: '/static/images/sfinks.jpg',
    alt: 'Sfinks',
  },
];

const Cats = () => {
  const { updateEvent } = useUpdateEvent();
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState(catImages);

  const debouncedValue = useDebounce<string>(inputValue, 750);
  const [imageFilters, setImageFilters] = useState<{ id: string; style: string }[]>([]);

  const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  useEffect(() => {
    updateEvent(
      debouncedValue !== ''
        ? `Wpisał/-a '${debouncedValue}' w wyszukiwarce kotków`
        : 'Wyczyścił/-a filtrowanie kotków'
    );
    setList(
      catImages.filter((catImg) => catImg.alt.toLowerCase().includes(debouncedValue.toLowerCase()))
    );
  }, [debouncedValue]);

  const handleFilterClick = (id: string, style: string, selected: boolean, name: string) => {
    if (selected) {
      updateEvent(`Wybrał/-a filtr ${name}`);
      setImageFilters((filters) => [...filters, { id, style }]);
    } else {
      updateEvent(`Usunął/-ęła filtr ${name}`);
      setImageFilters((filters) => filters.filter((filt) => filt.id !== id));
    }
  };

  return (
    <div className="Cats">
      <div className="Cats__panel">
        <TextField label="Wyszukiwarka" onChange={handleInputChange} value={inputValue} />

        <ImageFilters onClick={handleFilterClick} />
      </div>
      <div className="Cats__imgs">
        {list.map((cat) => (
          <div key={cat.id}>
            <img
              className="Cats__img"
              style={getImageStyles(imageFilters)}
              src={cat.src}
              alt={cat.alt}
            />
            <h4 className="Cats__title">{cat.alt}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Cats);
