const sortBy = (key, pokemon) => (
    [...pokemon].sort((a, b) => {
      if(a[key] < b[key]){
          return -1;
      }else{
          return 1;
      } 
    })
);

export default sortBy;