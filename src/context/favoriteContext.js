import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext([]);

export const useFavoriteContext = () => useContext(FavoriteContext);

const FavoriteContextProvider = ({children}) => {

  const [favoriteList, setFavoriteList] = useState([]);
  const [totalFavorites, setTotalFavorites] = useState(0);

  const btnItemFavorite = (id) => {
    if (favoriteList.includes(id)) {
      setFavoriteList(favoriteList.filter(idItem => idItem !== id));
      setTotalFavorites(totalFavorites - 1);
    } else {
      setFavoriteList([...favoriteList, id]);
      setTotalFavorites(totalFavorites + 1);
    }
  }
  
  return (
    <FavoriteContext.Provider value={{
      favoriteList, btnItemFavorite, totalFavorites
    }}>
      {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteContextProvider;