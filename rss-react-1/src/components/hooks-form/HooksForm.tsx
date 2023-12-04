import { useForm } from 'react-hook-form';
import '../FormInput.scss';
import { useActions, useAppSelector } from '../../state/redux-hooks';
import { Gender } from '../../shared/enums';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../services/FormValidation';
import { useNavigate } from 'react-router-dom';
import { FormState } from '../../shared/interfaces';
import { imageToBase64 } from '../../services/imageReader';

const HooksForm = () => {
  const { setHookForm } = useActions();
  const countries = useAppSelector((state) => state.countries.countries);
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(userSchema),
  });
  const onSubmit = async (data: FormState) => {
    const image = data.picture
      ? await imageToBase64(data.picture[0] as File)
      : '';
    setHookForm({ ...getValues(), picture: image });
    navigate('/');
  };

  return (
    <div className="mt-6">
      <h2 className="font-bold text-2xl mb-5">Hooks form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Name"
            className="shadow appearance-none bg-input border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">
            {formState.errors.name && formState.errors.name.message}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-bold mb-2">
            Age:
          </label>
          <input
            type="number"
            id="age"
            {...register('age')}
            placeholder="Age"
            className="shadow appearance-none bg-input border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">
            {formState.errors.age && formState.errors.age.message}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="E-mail"
            className="shadow appearance-none bg-input border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">
            {formState.errors.email && formState.errors.email.message}
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="country" className="block text-sm font-bold mb-2">
            Country:
          </label>
          <select
            id="country"
            {...register('country')}
            placeholder="Country"
            className="shadow appearance-none bg-input border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            {countries.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-s italic">
            {formState.errors.country && formState.errors.country.message}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            placeholder="Password"
            className="shadow appearance-none bg-input border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">
            {formState.errors.password && formState.errors.password.message}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="confirm" className="block text-sm font-bold mb-2">
            Confirm:
          </label>
          <input
            type="password"
            id="confirm"
            {...register('confirm')}
            placeholder="Confirm password"
            className="shadow appearance-none bg-input border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">
            {formState.errors.confirm && formState.errors.confirm.message}
          </p>
        </div>

        <div className="mb-4">
          <span className="block text-sm font-bold mb-2">Gender:</span>
          <input
            type="radio"
            {...register('gender')}
            value={Gender.Male}
            id="genderMale"
            className="mr-1 scale"
            defaultChecked
          />
          <label htmlFor="genderMale" className="mr-4">
            {Gender.Male}
          </label>
          <input
            type="radio"
            {...register('gender')}
            value={Gender.Female}
            id="genderFemale"
            className="mr-1 scale"
          />
          <label htmlFor="genderFemale">{Gender.Female}</label>
          <p className="text-red-500 text-s italic">
            {formState.errors.gender && formState.errors.gender.message}
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="picture"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Picture:
          </label>
          <input
            type="file"
            id="picture"
            {...register('picture')}
            className="block w-full text-sm bg-input text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
          <p className="text-red-500 text-s italic">
            {formState.errors.picture && formState.errors.picture.message}
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="accept">Accept terms & Conditions</label>
          <input
            type="checkbox"
            id="accept"
            {...register('acceptTerm')}
            className="ml-3 scale"
            defaultChecked
          />
          <p className="text-red-500 text-s italic">
            {formState.errors.acceptTerm && formState.errors.acceptTerm.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={!formState.isValid}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HooksForm;
