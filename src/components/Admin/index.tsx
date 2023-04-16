import axios from "axios";
import { useEffect, useState } from "react";

interface IUser {
  id?: string;
  avatar?: string;
  email: string;
  phoneNo: string;
  status: string;
  username: string;
}
export default function AdminChart() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://06ufwajgc6.execute-api.ap-southeast-1.amazonaws.com/user`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      {users.map((user: IUser) => {
        return <div key={user.username}>{user.email}</div>;
      })}
    </div>
  );
}
