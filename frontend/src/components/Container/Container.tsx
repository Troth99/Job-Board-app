import "./Container.css";

export function Container({ children }: { children: React.ReactNode }) {
  //To do - add more props to container component like max-width, padding, margin etc. and use them in css file to make it more reusable and customizable
  //Wrapt every component in the app with container component to make it more responsive and consistent in design and layout across the app.
  //Add responsive design to container component to make it look good on all screen sizes and devices and delete rest.

  return <div className="container">{children}</div>;
}
