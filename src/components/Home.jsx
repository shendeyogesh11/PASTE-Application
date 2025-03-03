import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, UpdateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchparams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
      
    if(pasteId){
      const paste = allpastes.find((p) => p._id === pasteId);
      if(paste){
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  function createPaste(){
     const paste = {
        title: title,
        content: value,
        _id : pasteId || 
          Date.now().toString(36),
        createdAt:new Date().toISOString (),    
     }

     if(pasteId){
        // Update
        dispatch(UpdateToPastes(paste));
     }
     else{
        // Create
        dispatch(addToPastes(paste));
     }

     setTitle('');
     setValue('');
     setSearchparams({});

  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between ">
        <input
          className=" p-2 rounded-md mt-2 w-[66%] pl-4  "
          type="text"
          name="title"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className=" p-2 rounded-md mt-2">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className=" mt-8 ">
        <textarea
          className="rounded-2xl mt-4 p-4 min-w-[500px] "
          value={value}
          name="content"
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
