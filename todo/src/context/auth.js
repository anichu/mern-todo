import { createContext, useState } from "react";
import Cookies from "js-cookie";
export const authContext = createContext();
export const TodoContext = (props) => {
	const [auth, setAuth] = useState(Cookies.get("token"));
	const [token, setToken] = useState("");
	return (
		<authContext.Provider value={[auth, setAuth, token, setToken]}>
			{props.children}
		</authContext.Provider>
	);
};
