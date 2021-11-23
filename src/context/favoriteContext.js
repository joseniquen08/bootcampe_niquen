import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext([]);

export const useFavoriteContext = () => useContext(FavoriteContext);

const FavoriteContextProvider = ({children}) => {

  const [favoriteList, setFavoriteList] = useState([]);
  const [totalFavorites, setTotalFavorites] = useState(0);

  const addItemFavorite = (item) => {
    setFavoriteList([...favoriteList, item]);
    setTotalFavorites(totalFavorites + 1);
  }

  const removeItemFavorite = (id) => {
    const index = favoriteList.map(itemFav => itemFav.id).indexOf(id);
    if (index !== -1) {
      setFavoriteList(favoriteList => favoriteList.filter((itemFav, i) => i !== index));
      setTotalFavorites(totalFavorites - 1);
    }
  }
  
  return (
    <FavoriteContext.Provider value={{
      favoriteList, addItemFavorite, removeItemFavorite, totalFavorites
    }}>
      {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteContextProvider;