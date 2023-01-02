const Row = ({ key, children, onClick }: RowProps) => {
  return (
    <tr
      onClick={onClick}
      key={key}
      className="odd: h-12 border-spacing-4 bg-gray-900 even:bg-gray-800 hover:cursor-pointer hover:bg-red-600"
    >
      {children}
    </tr>
  );
};

type RowProps = {
  key: string;
  children: JSX.Element[] | JSX.Element;
  onClick?: () => Promise<Boolean>;
};

export default Row;
