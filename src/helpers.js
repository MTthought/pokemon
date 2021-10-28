const sortBy = (key, array) => (
    [...array].sort((a, b) => {
      if(a[key] < b[key]){
          return -1;
      }else{
          return 1;
      } 
    })
);

const search = (target, array) => (
    array.filter(element => {
        if(element.name.includes(target) || element.abilities.some(element => element.ability.name.includes(target))){
            return true;
        }else{
            return false;
        }
    })
);

export {sortBy, search};