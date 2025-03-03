import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div>
      <input
        className=" p-2 rounded-2xl min-w-[600px] mt-5 pl-4 "
        type="search"
        name="pastes"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5 ">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div className=" border " key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="felx flex-row gap-4 place-content-evenly ">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                      Edit
                    </a>
                  </button>
                  <button>

                    <a href={`/pastes/${paste?._id}`}>
                       View
                    </a>

                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard");
                    }}
                  >
                    Copy
                  </button>

                  {/* we have to write the logic of share button its in homework! */}
                  <button>Share</button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
