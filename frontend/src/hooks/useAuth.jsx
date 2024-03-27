import { useEffect, useState } from "react";
import { useSelector} from "react-redux";

export const useAuth = () => {
    const {user} = useSelector((state) => state.auth);

    const [auth, setAuth] = useState(false);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        if(user) {
            setAuth(true)
        } else {
            setAuth(false)
        }

        setloading(false);

    }, [user]);

    return {auth, loading};
};