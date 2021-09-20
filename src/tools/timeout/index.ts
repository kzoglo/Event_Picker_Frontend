const timeout = (handler: Function, time: number) => {
  const id = setTimeout(handler, time);
  return id;
};

export default timeout;
