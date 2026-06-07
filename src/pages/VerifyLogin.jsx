import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLeadContext from "../context/LeadContext";

const VerifyLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { setIsLogin } = useLeadContext();

  useEffect(() => {
    const handleVerifyLogin = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        // console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.userId);
        setIsLogin(data.token);
        return navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

    handleVerifyLogin();
  }, [token, navigate, setIsLogin]);

  return (
    <main className="bg-light w-100 vh-100" style={{ display: "flex" }}>
      <div className="text-center text-light" style={{ margin: "auto" }}>
        <p className="spinner-border "></p>
        <h3>Verifying with Google</h3>
        <p className="">Completing OAuth 2.0 authentication...</p>
      </div>
    </main>
  );
};

export default VerifyLogin;
