import { Tooltip, Zoom } from '@material-ui/core';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { memo, useState } from 'react';

import './ImageFilters.scss';

const filters = [
  {
    id: nanoid(),
    img: '/static/images/blur.jpg',
    alt: 'Blur',
    style: 'blur(5px)',
    selected: false,
  },
  {
    id: nanoid(),
    img: '/static/images/brightness.png',
    alt: 'Brightness',
    style: 'brightness(200%)',
    selected: false,
  },
  {
    id: nanoid(),
    img: '/static/images/contrast.jpg',
    alt: 'Contrast',
    style: 'constrast(200%)',
    selected: false,
  },
  {
    id: nanoid(),
    img: '/static/images/shadow.png',
    alt: 'Shadow',
    style: 'drop-shadow(8px 8px 10px gray)',
    selected: false,
  },
  {
    id: nanoid(),
    img: '/static/images/grayscale.jpg',
    alt: 'Grayscale',
    style: 'grayscale(100%)',
    selected: false,
  },
  {
    id: nanoid(),
    img: '/static/images/hue.png',
    alt: 'Hue',
    style: 'hue-rotate(90deg)',
    selected: false,
  },
  {
    id: nanoid(),
    img: '/static/images/invert.png',
    alt: 'Invert',
    style: 'invert(100%)',
    selected: false,
  },
  // {
  //   id: nanoid(),
  //   img: '',
  //   alt: 'Saturate',
  //   style: 'saturate(8)',
  //   selected: false,
  // },
  {
    id: nanoid(),
    img: '/static/images/sepia.jpg',
    alt: 'Sepia',
    style: 'sepia(100%)',
    selected: false,
  },
];

const ImageFilters = ({
  onClick,
}: {
  onClick: (id: string, style: string, selected: boolean, name: string) => void;
}) => {
  const [imageFilters, setImageFilters] = useState(filters);

  const handleFilterClick = ({ currentTarget: { id } }: React.MouseEvent) => {
    const imageFilter = imageFilters.find((imgFilt) => imgFilt.id === id);
    onClick(id, imageFilter?.style || '', !imageFilter?.selected || false, imageFilter?.alt || '');
    setImageFilters((flts) =>
      flts.map((filt) => ({
        ...filt,
        selected: filt.id === id ? !filt.selected : filt.selected,
      }))
    );
  };

  return (
    <div className="ImageFilters">
      <h4>Filtry zdjęć</h4>
      {imageFilters.map((filter) => {
        const classes = classNames('ImageFilters__filter', {
          'ImageFilters__filter--selected': filter.selected,
        });
        return (
          <Tooltip key={filter.id} title={filter.alt} arrow TransitionComponent={Zoom}>
            <button
              id={filter.id}
              type="button"
              className="ImageFilters__button"
              onClick={handleFilterClick}
            >
              <img className={classes} src={filter.img} />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default memo(ImageFilters);
