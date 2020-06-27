type IsAuthenticatedProps = {
  currentUser: { userId: number; username: string } | null;
  //   isLoggedinRender: () => JSX.Element;
  //   isLoggedoutRender: () => JSX.Element;
  isLoggedinRender: JSX.Element;
  isLoggedoutRender: JSX.Element;
};

// Goal of this component so that if we have components that need to render depending on user state
// that component does not need to know the logic for what to render based on user authentication state
// this component would also be re-usable for conditionally rendering components based on user auth state
// So that other components would not have the code logic for conditionally rendering components based on auth state
const IsAuthenticated: React.FC<IsAuthenticatedProps> = (
  props: IsAuthenticatedProps
) => {
  //   return props.currentUser ? props.userLoggedin() : props.userLoggedout();
  return props.currentUser ? props.isLoggedinRender : props.isLoggedoutRender;
};

export default IsAuthenticated;

//usage

/* 
   < <Auth
        currentUser={{ userId: 100, username: 'gem' }}
        isLoggedinRender={<Navigation />}
        isLoggedoutRender={<div>logged out</div>}
      />
*/
