import { Header } from './Header';
import { TestData,DoTask } from './testData';
export const Login = () => {
    
   

    //var spisol = testData();
    //testDataUser();

       // Consumer
       /*
    api<{ title: string; message: string }>('https://localhost:7277/api/Post/GetAllPosts?skip=0&take=10')
    .then(({ title, message }) => {
      console.log(title, message)
    })
    .catch(error => {
      console.log(error);
      /* show error message 
    })
    */
   
    return (
    <main >
    <Header/>

    <TestData/>
   


    <form className="form-signin w-100 m-auto">
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <div className="form-floating">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
        <label htmlFor="floatingInput">Email address</label>
        
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
        <label htmlFor="floatingPassword">Password</label>
      </div>
  
   
      <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
    </form>
  </main>);
    
}