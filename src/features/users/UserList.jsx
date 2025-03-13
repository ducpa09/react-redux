import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers, userDeleted } from "./usersSlice";

export function UserList() {
  const users = useSelector((state) => state.users.entities);
  const isLoading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row">
        <h1>Redux CRUD User app</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            className="button-primary"
            onClick={() => dispatch(fetchUsers())}
          >
            Load users
          </button>
        </div>
        <div className="two columns">
          <Link to={`/add-user`}>
            <button className="button-primary">Add users</button>
          </Link>
        </div>
      </div>
      <div className="row">
        <table className="u-full-width">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          {isLoading && (
            <tbody>
              <tr><td>Loading</td></tr>
            </tbody>
          )}

          <tbody>
            {users.map(({ id, name, email }, i) => (
              <tr key={i}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <button onClick={() => dispatch(userDeleted({ id }))}>
                    Delete
                  </button>
                  <Link to={`/edit-user/${id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
