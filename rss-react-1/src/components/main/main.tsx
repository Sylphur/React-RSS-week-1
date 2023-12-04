import { Link } from 'react-router-dom';
import { useAppSelector } from '../../state/redux-hooks';
import MainCard from './MainCard/mainCard';

const Main = () => {
  const componentsForm = useAppSelector((state) => state.componentsForm);
  const hooksForm = useAppSelector((state) => state.hooksForm);

  return (
    <div>
      <h1 className="mb-8">React forms</h1>
      <div className="flex gap-5 justify-center">
        <Link to={'/components'}>
          <button>Components form</button>
        </Link>
        <Link to={'/hooks'}>
          <button>Hooks form</button>
        </Link>
      </div>
      <div className="mt-10 flex gap-10">
        {componentsForm.touched && (
          <div className="shadow-md rounded px-12">
            <h3 className="text-lg mb-4 font-bold">Components form:</h3>
            <MainCard card={componentsForm.form}></MainCard>
          </div>
        )}
        {hooksForm.touched && (
          <div className="shadow-md rounded px-6">
            <h3 className="text-lg mb-4 font-bold">Hooks form:</h3>
            <MainCard card={hooksForm.form}></MainCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
