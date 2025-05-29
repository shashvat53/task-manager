import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DeleteTaskApi, getTaskByIdApi } from "../helpers/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Context from "../context";
import { toast } from "sonner";
import ConfirmDialog from "../components/ConfirmDialog";
import TaskCardSkeleton from "../components/SkeletonCard";

const TaskDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    isOpenForm,
    setIsOpenForm,
    openForm,
    closeForm,
    initialData,
    getData,
  } = useContext(Context);

  useEffect(() => {
    // Example fetch — replace with your actual API
    const fetchData = async () => {
      try {
        const response = await getTaskByIdApi(id);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, closeForm]);

  const editHnadler = (data) => {
    // console.log("first");
    openForm(data);
  };

  const deleteHnadler = async () => {
    try {
      const response = await DeleteTaskApi(data._id);
      if (response.success) {
        navigate("/");
        toast.success(response.message);
      }
      if (response.error) {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!data)
    return (
      <div className="p-4 container mx-auto flex justify-center">
        <TaskCardSkeleton />
      </div>
    );
  return (
    <div className="w-full">
      <div className="p-4 container mx-auto">
        <Card className="w-full max-w-md md:max-w-xl mx-auto rounded-2xl shadow-md p-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex justify-between items-center">
              {data?.title}
              <Badge
                variant={data?.status ? "default" : "secondary"}
                className={data?.status ? "bg-green-500" : "bg-yellow-500"}
              >
                {data?.status ? "Completed" : "Pending"}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Created on {format(new Date(data?.createdAt), "dd MMM yyyy")}
            </p>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Category:</span> {data?.category}
            </div>

            <div>
              <span className="font-medium">Description:</span>{" "}
              {data?.description}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Priority:</span> {data?.priority}
              </div>
              <div>
                <span className="font-medium">Due:</span>{" "}
                {format(new Date(data?.dueDate), "dd MMM yyyy")}
              </div>
            </div>

            <div>
              <span className="font-medium">Location:</span>{" "}
              {data?.location?.name}
            </div>
          </CardContent>
          <div className="flex justify-end gap-2 mt-4 px-4 pb-4">
            <Button variant="default" onClick={() => editHnadler(data)}>
              Edit
            </Button>

            <ConfirmDialog
              open={open}
              onOpenChange={setOpen}
              onConfirm={deleteHnadler}
              title="Delete Task?"
              description="This will permanently delete the task and cannot be undone."
            >
              <Button variant="destructive">Delete</Button>
            </ConfirmDialog>
            {/* <Button
              onClick={() => deleteHnadler(data?._id)}
              variant="destructive"
            >
              Delete
            </Button> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TaskDetail;
