import './NotFoundPage.scss';
import { useRouteError } from "react-router-dom";

const NotFoundPage = () => {
  const error = useRouteError();
  console.log(error);
  
  return (
    <div>
      <h2>404: Not Found</h2>
      <p>The page you want to accept is not exist :(</p>
    </div>
  );
};

export default NotFoundPage;