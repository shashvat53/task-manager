// import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Context from "../../context";
import { useContext } from "react";
import { toast } from "sonner";
import { DeleteTaskApi } from "../../helpers/api";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const status = row.getValue("description");
      return (
        <p className="line-clamp-[calc(var(--characters)/100)]">{status}</p>
      );
    },
  },

  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <button
          variant="ghost"
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Priority</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      return (
        <span
          className={`px-2 py-1 rounded-full  text-[10px] font-semibold ${
            priority === "High"
              ? "bg-red-500"
              : priority === "Medium"
              ? "bg-yellow-500 "
              : "bg-green-500"
          }`}
        >
          {priority}
        </span>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "DueDate",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate");
      return <p className="">{format(new Date(dueDate), "dd MMM yyyy")}</p>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",

    cell: ({ row }) => {
      const location = row.getValue("location");
      return <span>{location?.name}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="">
          {status ? (
            <span className="text-[10px] py-1 px-2 font-semibold rounded-full bg-green-500 ">
              Complited
            </span>
          ) : (
            <span className="text-[10px] py-1 px-2 font-semibold rounded-full bg-yellow-500 ">
              Pendding
            </span>
          )}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { openForm, getData } = useContext(Context);
      const task = row.original;

      const deleteHandler = async (id) => {
        try {
          // console.log(id);
          const response = await DeleteTaskApi(id);
          // console.log(response);
          if (response.success) {
            getData();
            toast.success(response.message);
          }
          if (response.error) {
            toast.error(response.message);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const navigate = useNavigate();
      const handleView = (id) => {
        navigate(`/task-detail/${id}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleView(task._id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openForm(task)}>
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => deleteHandler(task._id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
