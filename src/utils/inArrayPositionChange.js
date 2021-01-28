export const inArrayPositionChange = (arr, from, direction) => {
  let numberOfDeletedElm = 1;
  if (direction === "down" && from !== arr.length) {
    const elm = arr.splice(from, numberOfDeletedElm)[0];
    numberOfDeletedElm = 0;
    arr.splice(from + 1, numberOfDeletedElm, elm);
  } else if (direction === "up" && from !== 0) {
    const elm = arr.splice(from, numberOfDeletedElm)[0];
    numberOfDeletedElm = 0;
    arr.splice(from - 1, numberOfDeletedElm, elm);
  }
  return arr;
};
