const convertGenre = (arr, itemToSearch) => {
  let id;

  arr.map((element) => {
    if (element.label === itemToSearch) {
        id = element.id
    }
  });

  return id
};

export default convertGenre