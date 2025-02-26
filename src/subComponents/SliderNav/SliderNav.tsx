import React, { useEffect, useState } from 'react';
import ArrowLeft from '@/icons/ArrowLeft';
import ArrowRight from '@/icons/ArrowRight';
import ScreenSize from '@/enums/ui/ScreenSize';

export interface Slide {
  uuid: string,
  name: string,
}

interface SlideWithTransform extends Slide {
  transform: string,
}

interface ButtonProps {
  slideInView: number,
  setActiveItem: (index: number) => void,

}

const ButtonNext = ({ slideInView, setActiveItem }: ButtonProps) => {
  return (
    <button
      className="slider__nav slider__nav--next"
      title="Next item"
      type="button"
      onClick={() => {
        const value = slideInView + 1;
        setActiveItem(value);
      }}
    >
      <ArrowRight />
    </button>
  );
};

const ButtonPrev = ({ slideInView, setActiveItem }: ButtonProps) => {
  return (
    <button
      className="slider__nav slider__nav--prev"
      title="Previous item"
      type="button"
      onClick={() => {
        const value = Math.max(0, slideInView - 1);
        setActiveItem(value);
      }}
    >
      <ArrowLeft />
    </button>
  );
};

interface Props {
  sliderItems: Slide[],
  currentSlide: number,
  screenSize: ScreenSize,
  onClick: (index: number) => void,
}

/**
 * Slider Nav - carousel like navigation with next/prev buttons.
 *
 * "Slide in view" refers to the left most visible item.
 * "Active slide" refers to the selected tab/slide.
 *
 * @param {Slide[]} sliderItems
 * @returns {JSX.Element}
 * @constructor
 */
const SliderNav = ({
  sliderItems,
  currentSlide,
  screenSize,
  onClick,
}: Props) => {
  const [slides, setSlides] = useState<SlideWithTransform[]>([]);
  const [slideInView, setSlideInView] = useState(currentSlide);
  const [activeSlide, setActiveSlide] = useState(currentSlide);
  const slidesVisible = (screenSize === ScreenSize.Small) ? 1 : 3;

  useEffect(() => {
    const initialSlides: SlideWithTransform[] = sliderItems.map(
      (info, index) => ({
        ...info,
        transform: `translateX(${100 * (index - slideInView)}%)`,
      }),
    );
    setSlides(initialSlides);
  }, [slideInView]);

  const onItemClick = (index: number) => {
    onClick(index);
    setSlideInView(Math.min(index, slides.length - slidesVisible));
    setActiveSlide(index);
  };

  return (
    <nav className="slider__wrapper">
      {slideInView > 0
        && <ButtonPrev slideInView={slideInView} setActiveItem={onItemClick} />}
      <ul
        className="slider__items"
        id="sliderNav"
        role="listbox"
        aria-labelledby="sliderNavLabel"
      >
        {
          slides.map((slide, index) => {
            return (
              <li
                className={['slider__slide', index === activeSlide && 'slider__slide--active'].join(' ')}
                key={slide.uuid}
                role="option"
                aria-selected={index === activeSlide}
                id={`sliderNav-${index}`}
                onClick={() => onItemClick(index)}
                onKeyDown={() => onItemClick(index)}
                style={{ transform: slide.transform, width: `${100 / slidesVisible}%` }}
              >
                <span className={['slide__text', index === activeSlide && 'slide__text--active'].join(' ')}>
                  {slide.name}
                </span>
              </li>
            );
          })
        }
      </ul>
      {(slideInView < (slides.length - slidesVisible))
        && <ButtonNext slideInView={slideInView} setActiveItem={onItemClick} />}
    </nav>
  );
};

export default SliderNav;
