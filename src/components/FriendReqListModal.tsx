import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { createFriendAction } from "../../serverAction/createFriendAction";
import toast from "react-hot-toast";
import FrndButton from "./HomePage/FrndButton";
interface Props {
  open: boolean;
  userId: string;
  setOpen: any;
}

const FriendReqListModal = ({ open, userId, setOpen }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>("");
  const [alreadyFrien, setAlreadyFriend] = useState<any>("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user/${userId}`);
      const sentData = {
        id: data?.id,
        userName: data?.userName,
        image: data?.image,
      };
      setUser(sentData);

      setAlreadyFriend(data.alreadyExist);
    } catch (err) {
      throw new Error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && open) {
      fetchData();
    }
  }, [userId, open]);

  const clientAction = async (formData: FormData) => {
    const result = await createFriendAction(formData);
    if (result?.message) {
      toast.error(result.message);
    } else {
      toast.success("Friend Added Successful");
      setOpen(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="sm:w-[450px] w-[350px] mt-20  relative h-72 p-4 rounded-md mx-auto bg-blue-950">
        {alreadyFrien ? (
          <div className="flex justify-center">
            <p className="text-white mt-4 font-semibold">
              You Dont Have any Friend Reques
            </p>
          </div>
        ) : (
          <div className=" flex items-center justify-between gap-2 cursor-pointer bg-slate-400 py-2 px-4 rounded-md">
            <div className="flex items-center gap-1">
              <Avatar>
                <AvatarImage src={user?.image} alt="@shadcn" />
                <AvatarFallback>{user?.userName}</AvatarFallback>
              </Avatar>
              <p className="font-bold">{user?.userName}</p>
            </div>
            <form action={clientAction}>
              <input type="hidden" name="userId" id="" value={user?.id} />

              <FrndButton />
            </form>
          </div>
        )}
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-1 rounded-md bg-rose-800 text-white absolute bottom-3 right-3"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default FriendReqListModal;
