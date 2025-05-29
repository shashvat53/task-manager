import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns-tz";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Plus, X } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { CreateTaskApi, UpdateTaskApi } from "../helpers/api";
import { toast } from "sonner";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../lib/validations/taskSchema";
import Context from "../context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Form() {
  const [loading, setLoading] = useState(false);
  const {
    isOpenForm,
    setIsOpenForm,
    openForm,
    closeForm,
    initialData,
    getData,
  } = useContext(Context);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      dueDate: "",
      location: {
        lat: "",
        lng: "",
      },
      status: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const localDate = format(data.dueDate, "yyyy-MM-dd", {
      timeZone: "Asia/Kolkata",
    });

    const formattedData = {
      ...data,
      dueDate: localDate,
    };

    console.log("formattedData: ", formattedData);
    try {
      let response;
      if (initialData) {
        console.log("initialData: ", initialData);
        response = await UpdateTaskApi({
          _id: initialData?._id,
          ...formattedData,
        });
      } else {
        response = await CreateTaskApi(formattedData);
      }

      if (response.success) {
        toast.success(response.message);
        reset(); // Clear form
        getData();
        setIsOpenForm(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        // blank reset if new
        title: "",
        description: "",
        category: "",
        dueDate: "",
        location: {
          lat: "",
          lng: "",
        },
        status: false,
      });
    }
  }, [initialData, reset, isOpenForm]);

  return (
    <>
      <div className="">
        <Card className="sm:max-w-[425px] lg:max-w-[600px] ">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="text-lg">
                {initialData ? "Update Task" : "Create Task"}
              </span>
              <X
                className="cursor-pointer"
                onClick={() => setIsOpenForm(false)}
              />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-3">
                {/* Title */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Task title..."
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Task description..."
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select
                        onValueChange={(val) => field.onChange(val)}
                        value={field.value}
                        // defaultValue={field.value}
                      >
                        <SelectTrigger id="category" className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Personal">Personal</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.category && (
                    <p className="text-red-500 text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-4">
                    <Input
                      id="location"
                      type="number"
                      placeholder="Latitude"
                      step="any"
                      {...register("location.lat", { valueAsNumber: true })}
                    />
                    <Input
                      id="location"
                      type="number"
                      placeholder="Longitude"
                      step="any"
                      {...register("location.lng", { valueAsNumber: true })}
                    />
                  </div>
                  {(errors.location?.lat || errors.location?.lng) && (
                    <p className="text-red-500 text-sm">
                      {errors.location?.lat?.message ||
                        errors.location?.lng?.message}
                    </p>
                  )}
                </div>

                {/* Due Date */}
                <div className="flex flex-col space-y-1.5 ">
                  <Label htmlFor="duedate">Due Date</Label>
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                      <DatePicker date={field.value} setDate={field.onChange} />
                    )}
                  />
                  {errors.dueDate && (
                    <p className="text-red-500 text-sm">
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-row items-start  gap-2  space-y-1.5">
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        id="status"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="status" className="text-[11px] text-gray-600">
                    Mark as Completed
                  </Label>
                  {errors.status && (
                    <p className="text-red-500 text-sm">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-4 w-full  "
              >
                {loading ? (
                  <span className="flex justify-center items-center gap-2">
                    <LoaderCircle className="animate-spin " />

                    <span>{initialData ? "Updating..." : "Creating..."}</span>
                  </span>
                ) : (
                  <span>{initialData ? "Update Task" : "Create Task"}</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
