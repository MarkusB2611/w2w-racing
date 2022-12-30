const PageLayout = ({ tableElement, formElement }: PageLayoutProps) => {
  return (
    <div className=" flex flex-col justify-between gap-8 p-4 sm:px-24 md:flex-row">
      <div className="md:order-2">{formElement}</div>
      <div className=" md:order-1 md:w-3/4 md:border-r-2 md:border-red-600 md:pr-8">
        {tableElement}
      </div>
    </div>
  );
};

type PageLayoutProps = {
  tableElement: JSX.Element;
  formElement: JSX.Element;
};

export default PageLayout;
