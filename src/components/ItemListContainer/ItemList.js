import React, { memo } from 'react';
import Item from './Item';

const ItemList = memo(
  ({favoritos, setFavoritos, tipo, items}) => {
    return (
      <div className="pt-8" id={tipo.toLowerCase()}>
        <p className="text-3xl font-light text-center">Nuestros {tipo}</p>
        <div className="grid grid-cols-4 gap-8 px-8 py-6">
          {
            items.data.data.map((item, index) => (
              <Item
                key={index}
                index={index}
                nombre={item.name ? item.name : item.title}
                precio={item.averageCost ? item.averageCost : item.tuition}
                cupos={5}
                id={item.id ? item.id : item._id}
                tipo={tipo}
                favoritos={favoritos}
                setFavoritos={setFavoritos}
              />
            ))
          }
        </div>
      </div>
    )
  }
)

export default ItemList;