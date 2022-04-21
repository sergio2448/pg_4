import React from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { getHomeDetail } from "../../redux/actions/index";

const Comment = ({ propertyId }) => {

  const [coment, setComent] = React.useState(null)
  const userDB = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [renderInput, setRenderInput] = React.useState(true)

  const submitComent = async (e) => {
    try {
      if (coment) {
        const newComent = await axios.post("http://localhost:3001/review", {
          comment: coment,
          rating: 2,
          buyerId: userDB.user.buyers[0].id,
          propertyId: propertyId
        })
        dispatch(getHomeDetail(propertyId))
        setRenderInput(false)
      } else {
        document.querySelector("#errorComent").innerText = "Debe ingresar un comentario"
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div class="w-full max-w-sm mx-auto ">
      {
        renderInput ? <textarea
          class="h-24 text-base w-full border border-stone-400/75 rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300"
          placeholder="Christ bless you! . . ."
          onChange={(e) => {
            document.querySelector("#errorComent").innerText = ""
            setComent(e.target.value)
          }}
          value={coment}
        ></textarea> :
          ""
      }
      {
        renderInput ?
          <div class="flex justify-center flex-col items-center mb-6">
            <button class='my-6 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded' onClick={submitComent}>
              Comment
            </button>
            <p className="font-semibold text-red-600 text-sm" id="errorComent"></p>
          </div> : ""
      }
    </div>
  );
};

export default Comment;
