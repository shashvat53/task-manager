import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/theme-provider";
import Context from "./context";
import { useEffect, useState } from "react";
import { fetchTasksApi } from "./helpers/api";
import { Form } from "./components/Form";

function App() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [data, setData] = useState([]);

  const openForm = (data = null) => {
    setInitialData(data);
    setIsOpenForm(true);
    console.log("open: ");
  };

  const closeForm = () => {
    setInitialData(null);
    setIsOpenForm(false);
  };

  async function getData() {
    // Fetch data from your API here.
    try {
      const response = await fetchTasksApi();
      // console.log("Fetching Data: ");
      response?.data;
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   getData();
  // }, []);

  // const closeModalOnBackgroundClick = () => {
  //   closeForm();
  // };
  return (
    <>
      <Context.Provider
        value={{
          isOpenForm,
          setIsOpenForm,
          openForm,
          closeForm,
          initialData,
          getData,
          data,
          setData,
        }}
      >
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Header />
          <main className="min-h-[calc(100vh-125px)] ">
            <Outlet />
          </main>
          <Footer />

          {isOpenForm && (
            <div>
              <div
                className="fixed inset-0 bg-black/45 z-40 w-full h-full"
                onClick={() => closeForm()}
              ></div>
              <div className="fixed inset-0 flex items-center justify-center z-50 w-fit h-fit my-auto md:w-[40%] mx-auto">
                <Form />{" "}
              </div>
            </div>
          )}
        </ThemeProvider>
      </Context.Provider>
    </>
  );
}

export default App;
