import { ChangeEvent, useRef, useState } from 'react';
import '../FormInput.scss';
import { Gender } from '../../shared/enums';
import { FormState, ValidationErrors } from '../../shared/interfaces';
import { useActions, useAppSelector } from '../../state/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../../services/FormValidation';
import * as yup from 'yup';

const ComponentsForm = () => {
  const { setComponentForm } = useActions();
  const navigate = useNavigate();
  const [validateErrors, setValidateErrors] = useState<ValidationErrors>({});
  const countries = useAppSelector((state) => state.countries.countries);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState(Gender.Male);
  const pictureRef = useRef<HTMLInputElement>(null);
  const [picture, setPicture] = useState('');
  const acceptRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: FormState = {
      name: nameRef.current?.value as string,
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
      gender: gender,
      picture: picture,
      country: countryRef.current?.value as string,
      acceptTerm: acceptRef.current?.checked as boolean,
    };
    try {
      await userSchema.validate(
        {
          name: res.name,
          age: res.age,
          country: res.country,
          email: res.email,
          password: res.password,
          confirm: confirmRef.current?.value,
          acceptTerm: res.acceptTerm,
          gender: res.gender,
          picture: pictureRef.current?.files,
        },
        { abortEarly: false }
      );
      setValidateErrors({});
      setComponentForm(res);
      navigate('/');
    } catch (error) {
      const errors: ValidationErrors = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          errors[err.path as string] = err.message;
        });
      }
      setValidateErrors(errors);
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 2000);
    }
  };
  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value as Gender);
  };
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="font-bold text-2xl mb-5">Uncontrolled component form</h2>
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            ref={nameRef}
            placeholder="Name"
            className="shadow bg-input appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">{validateErrors['name']}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-bold mb-2">
            Age:
          </label>
          <input
            type="number"
            name="age"
            id="age"
            ref={ageRef}
            placeholder="Age"
            className="shadow bg-input appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">{validateErrors['age']}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            E-mail:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            placeholder="E-mail"
            className="shadow bg-input appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">
            {validateErrors['email']}
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="country" className="block text-sm font-bold mb-2">
            Country:
          </label>
          <select
            name="country"
            id="country"
            ref={countryRef}
            placeholder="Country"
            className="shadow bg-input appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            {countries.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-s italic">
            {validateErrors['country']}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
            className="shadow bg-input appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">
            {validateErrors['password']}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="confirm" className="block text-sm font-bold mb-2">
            Confirm:
          </label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            ref={confirmRef}
            placeholder="Confirm password"
            className="shadow bg-input appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-s italic">
            {validateErrors['confirm']}
          </p>
        </div>

        <div className="mb-4">
          <span className="block text-sm font-bold mb-2">Gender:</span>
          <input
            type="radio"
            name="gender"
            value={Gender.Male}
            onChange={handleRadio}
            id="genderMale"
            checked={gender === Gender.Male}
            className="mr-1 scale"
          />
          <label htmlFor="genderMale" className="mr-4">
            {Gender.Male}
          </label>
          <input
            type="radio"
            name="gender"
            value={Gender.Female}
            onChange={handleRadio}
            id="genderFemale"
            checked={gender === Gender.Female}
            className="mr-1 scale"
          />
          <label htmlFor="genderFemale">{Gender.Female}</label>
          <p className="text-red-500 text-s italic">
            {validateErrors['gender']}
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
            name="picture"
            id="picture"
            ref={pictureRef}
            onChange={handleImage}
            className="block bg-input w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
          <p className="text-red-500 text-s italic">
            {validateErrors['picture']}
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="accept">Accept terms & Conditions</label>
          <input
            type="checkbox"
            name="accept"
            id="accept"
            ref={acceptRef}
            className="ml-3 scale"
            defaultChecked
          />
          <p className="text-red-500 text-s italic">
            {validateErrors['acceptTerm']}
          </p>
        </div>

        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={disabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ComponentsForm;
