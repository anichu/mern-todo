import { createContext, useState } from "react";

export const authContext = createContext();
export const TodoContext = (props) => {
	const [auth, setAuth] = useState(false);
	const [token, setToken] = useState("");
	return (
		<authContext.Provider value={[auth, setAuth, token, setToken]}>
			{props.children}
		</authContext.Provider>
	);
};
