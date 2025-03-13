import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { fetchUserById, userUpdated } from "./usersSlice";

export function EditUser() {

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return
    }
    const promise = dispatch(fetchUserById({id}));
    promise.then(u => {
      const user = u.payload;
      setName(user?.name)
      setEmail(user?.email)
    })
    
    return () => {
      promise.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleClick = () => {
    if (name && email) {
      dispatch(
        userUpdated({
          id: id,
          name,
          email,
        })
      );

      setError(null);
      navigate("/");
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setEmail("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit user</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="test@mailbox.com"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label htmlFor="emailInput">Email</label>
          <input
            className="u-full-width"
            type="email"
            placeholder="test@mailbox.com"
            id="emailInput"
            onChange={handleEmail}
            value={email}
          />
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Save user
          </button>
        </div>
      </div>
    </div>
  );
}
