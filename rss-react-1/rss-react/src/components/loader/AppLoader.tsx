interface LoaderState {
  isLoading: boolean;
}

const AppLoader = ({ isLoading }: LoaderState) => {
  if (isLoading)
    return (
      <div className="app-loader">
        <p className="app-loader-msg">Loading ...</p>
      </div>
    );
  return <></>;
};

export default AppLoader;
