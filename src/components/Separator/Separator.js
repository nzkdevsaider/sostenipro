const Separator = ({ my }) => {
  return (
    <>
      <hr className={`my-${my ?? "3"} border-blue-gray-100`} />
    </>
  );
};

export default Separator;
