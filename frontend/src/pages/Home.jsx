import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "../components/Form";
import { DataTable } from "../components/tableStructure/data-table";
import { fetchTasksApi } from "../helpers/api";
import { columns } from "../components/tableStructure/columns";
import Context from "../context";

function Home() {
  // const [data, setData] = useState([]);
  const { isOpenForm, setIsOpenForm, closeForm, getData, data } =
    useContext(Context);

  useEffect(() => {
    getData();
  }, []);

  // const closeModalOnBackgroundClick = () => {
  //   closeForm();
  // };

  return (
    <div className="p-4 container mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl">All Task</h1>
        <div>
          <Button
            onClick={() => setIsOpenForm(true)}
            className="cursor-pointer"
          >
            Add New
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Home;
