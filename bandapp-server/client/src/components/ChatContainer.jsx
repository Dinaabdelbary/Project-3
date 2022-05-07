import React from 'react';
import { ChatContainer } from './components/chat/ChatContainer';

// import { auth } from './api/service';

function App() {

  const [loggedInUser, setLoggedInUser] = React.useState(null);

  React.useEffect(() => {
    // auth.checkLoggedIn()
    //   .then(response => setLoggedInUser(response.data))
    //   .catch(err => console.log(err.response.data))
  }, []);

  return (
    <div className="App">
      

          <div>
            <ChatContainer loggedInUser={loggedInUser} />
          </div>
          
   
      
    </div>
  );
}

export default App;