import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { memo } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import Icon from '../Stateless/Icon/Icon';
import Item from './Item';

const ItemList = memo(({tipo, items, slide}) => {
  return (
    <div className="px-20 py-10 mx-auto max-w-7xl" id={tipo.toLowerCase()}>
      <p className="text-3xl font-medium text-center">Nuestros {tipo === 'bootcamp' ? 'Bootcamps' : 'Cursos'}</p>
      <div className="flex items-center justify-center" >
        <div className="w-8 h-1 mt-2 bg-gray-900"></div>
      </div>
      {
        slide === true ? (
          <>
            <Swiper
              modules={[Pagination]}
              slidesPerView={3}
              spaceBetween={25}
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              {
                items.map(item => (
                  <SwiperSlide key={item.id}>
                    <div className="my-10">
                      <Item
                        key={item.id}
                        nombre={item.nombre}
                        precio={item.precio}
                        duracion={item.duracion}
                        valoracion={item.valoracion}
                        urlImage={item.urlImage}
                        cupos={item.cupos}
                        id={item.id}
                        tipo={item.tipo}
                      />
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
            <div className="text-right"><Icon icon={faArrowLeft} /><span className="ml-2">Mover a la izquierda para ver más elementos</span></div>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-6 px-3 py-8">
            {
              items.map(item => (
                <Item
                  key={item.id}
                  nombre={item.nombre}
                  precio={item.precio}
                  duracion={item.duracion}
                  valoracion={item.valoracion}
                  urlImage={item.urlImage}
                  cupos={item.cupos}
                  id={item.id}
                  tipo={item.tipo}
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
})

export default ItemList;