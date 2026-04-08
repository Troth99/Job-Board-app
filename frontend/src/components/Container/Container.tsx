import "./Container.css";


export function Container({ children }: { children: React.ReactNode }) {

    //To do contain the content of the page and add some padding to the content
    //Make it responsive and add some media queries to make it look good on different screen sizes
    //Wrap every component with this container to make it look good and consistent on the whole website
  return (
    <div className="container">
      {children}
    </div>
  );
}